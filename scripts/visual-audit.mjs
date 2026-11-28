import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const USER_DATA_DIR = "C:\\Users\\Wissenchaften\\AppData\\Local\\Temp\\chrome_audit_profile";
const SCREENSHOT_DIR = "C:\\Users\\Wissenchaften\\Desktop\\Web Bengkel Bunul\\docs\\ui-visual-validator\\screenshots";
const AUDIT_URL = process.env.AUDIT_URL || "http://localhost:3005";

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

function launchChrome() {
  const args = [
    "--headless=new",
    "--remote-debugging-port=9222",
    `--user-data-dir=${USER_DATA_DIR}`,
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-background-networking",
    "--disable-features=Translate,OptimizationHints",
    "--window-size=1440,900",
    "about:blank",
  ];
  return spawn(CHROME_PATH, args, { stdio: "ignore" });
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 0;
    this.callbacks = new Map();

    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) {
          reject(new Error(msg.error.message || JSON.stringify(msg.error)));
        } else {
          resolve(msg.result);
        }
      }
    };
  }

  ready() {
    return new Promise((resolve, reject) => {
      if (this.ws.readyState === WebSocket.OPEN) return resolve();
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++this.id;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    this.ws.close();
  }
}

async function runAudit() {
  console.log(`Starting Chrome for ${AUDIT_URL}...`);
  const chromeProcess = launchChrome();

  try {
    let versionData = null;
    for (let i = 0; i < 20; i++) {
      try {
        const res = await fetch("http://127.0.0.1:9222/json/version");
        if (res.ok) {
          versionData = await res.json();
          break;
        }
      } catch {}
      await sleep(500);
    }

    if (!versionData) {
      throw new Error("Could not connect to Chrome debugging port");
    }

    const targetRes = await fetch("http://127.0.0.1:9222/json/new?about:blank", {
      method: "PUT",
    });
    const targetData = await targetRes.json();
    const cdp = new CDPClient(targetData.webSocketDebuggerUrl);
    await cdp.ready();

    await cdp.send("Page.enable");
    await cdp.send("DOM.enable");
    await cdp.send("Runtime.enable");

    const evaluate = async (expression) => {
      const res = await cdp.send("Runtime.evaluate", {
        expression,
        returnByValue: true,
        awaitPromise: true,
      });
      return res.result?.value;
    };

    const captureScreenshot = async (filename) => {
      const res = await cdp.send("Page.captureScreenshot", { format: "png" });
      const filePath = path.join(SCREENSHOT_DIR, filename);
      fs.writeFileSync(filePath, Buffer.from(res.data, "base64"));
      console.log(`Saved screenshot: ${filename}`);
      return filePath;
    };

    // --- PHASE 1: DESKTOP AUDIT (1440x900) ---
    console.log("\n=== AUDITING DESKTOP (1440x900) ===");
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await cdp.send("Page.navigate", { url: AUDIT_URL });
    await sleep(2500);

    await captureScreenshot("desktop-01-hero.png");

    const heroCheckDesktop = await evaluate(`(() => {
      const hero = document.getElementById('hero');
      const text = hero?.innerText || '';
      return {
        hasLiveStatus: text.includes('Buka Sekarang') || text.includes('Sedang Tutup') || text.includes('08:00 - 17:00 WIB'),
        hasGoogleReviewsStat: text.includes('500+ Ulasan Google'),
        hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
      };
    })()`);

    const sections = [
      "tentang-kami",
      "layanan",
      "portofolio",
      "testimoni",
      "reservasi",
      "lokasi",
    ];

    for (const sectionId of sections) {
      await evaluate(
        `document.getElementById('${sectionId}')?.scrollIntoView({ behavior: 'instant', block: 'start' });`
      );
      await sleep(850);
      await captureScreenshot(`desktop-${sectionId}.png`);
    }

    await evaluate(
      `window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });`
    );
    await sleep(600);
    await captureScreenshot("desktop-footer.png");

    // Check broken images after all sections scrolled into view (lazy images loaded)
    const brokenImages = await evaluate(`(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.map(img => ({
        src: img.src,
        alt: img.alt,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        complete: img.complete,
        isBroken: img.complete && (img.naturalWidth === 0 || img.naturalHeight === 0)
      })).filter(img => img.isBroken);
    })()`);
    console.log("Broken images found:", brokenImages.length);

    // Interactive Desktop Test 1: Service card auto-fill -> #reservasi
    await evaluate(
      `document.getElementById('layanan')?.scrollIntoView({ behavior: 'instant', block: 'start' });`
    );
    await sleep(400);
    await evaluate(`(() => {
      const buttons = Array.from(document.querySelectorAll('#layanan button'));
      const consultBtn = buttons.find(b => b.textContent?.includes('KONSULTASI LAYANAN'));
      if (consultBtn) consultBtn.click();
    })()`);
    await sleep(1000);
    const serviceAutoFillValue = await evaluate(
      `document.getElementById('layanan-select')?.value || document.querySelector('#reservasi select')?.value || null`
    );
    console.log("Auto-filled service dropdown value:", serviceAutoFillValue);

    // Interactive Desktop Test 2: Portfolio single-active-player switch
    await evaluate(
      `document.getElementById('portofolio')?.scrollIntoView({ behavior: 'instant', block: 'start' });`
    );
    await sleep(500);
    const portfolioCheck = await evaluate(`(async () => {
      const sleepMs = (ms) => new Promise(r => setTimeout(r, ms));
      const playBtns = Array.from(document.querySelectorAll('#portofolio button[aria-label^="Putar video"]'));
      const totalCards = document.querySelectorAll('#portofolio h3, #portofolio h4').length;
      if (playBtns.length < 2) return { totalCards, playButtonsCount: playBtns.length, singleActiveVerified: false };

      playBtns[0].click();
      await sleepMs(300);
      const iframesAfterFirst = document.querySelectorAll('#portofolio iframe').length;

      const nextPlayBtns = Array.from(document.querySelectorAll('#portofolio button[aria-label^="Putar video"]'));
      nextPlayBtns[0]?.click();
      await sleepMs(300);
      const iframesAfterSecond = document.querySelectorAll('#portofolio iframe').length;

      const closeBtn = document.querySelector('#portofolio button[aria-label^="Tutup pemutar"]');
      closeBtn?.click();
      await sleepMs(200);
      const iframesAfterClose = document.querySelectorAll('#portofolio iframe').length;

      return {
        totalCards,
        playButtonsCount: playBtns.length,
        iframesAfterFirst,
        iframesAfterSecond,
        iframesAfterClose,
        singleActiveVerified: iframesAfterFirst === 1 && iframesAfterSecond === 1 && iframesAfterClose === 0
      };
    })()`);
    console.log("Portfolio interaction check:", portfolioCheck);

    // --- PHASE 2: MOBILE AUDIT (390x844) ---
    console.log("\n=== AUDITING MOBILE (390x844) ===");
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
      hasTouch: true,
    });
    await cdp.send("Emulation.setUserAgentOverride", {
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1",
    });

    await evaluate(`window.scrollTo({ top: 0, behavior: 'instant' });`);
    await sleep(1500);
    await captureScreenshot("mobile-01-hero.png");

    // Check real mobile page overflow (ignoring elements inside intentional horizontal carousels)
    const mobileOverflow = await evaluate(`(() => {
      const scrollWidth = document.documentElement.scrollWidth;
      const clientWidth = document.documentElement.clientWidth;
      const windowWidth = window.innerWidth;
      const unexpectedOverflow = [];
      document.querySelectorAll('*').forEach(el => {
        const isInsideCarousel = !!el.closest('.snap-x, .overflow-x-auto');
        if (isInsideCarousel) return;
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.right > windowWidth + 2) {
          unexpectedOverflow.push({
            tag: el.tagName,
            id: el.id || null,
            className: (el.className?.toString?.() || '').slice(0, 80),
            right: Math.round(rect.right),
            width: Math.round(rect.width)
          });
        }
      });
      return {
        scrollWidth,
        clientWidth,
        windowWidth,
        hasHorizontalScroll: scrollWidth > clientWidth,
        unexpectedOverflowCount: unexpectedOverflow.length,
        unexpectedOverflow: unexpectedOverflow.slice(0, 10)
      };
    })()`);
    console.log("Mobile overflow check:", mobileOverflow);

    // Mobile Hero CTA check
    const mobileHeroCheck = await evaluate(`(() => {
      const hero = document.getElementById('hero');
      const btns = Array.from(hero?.querySelectorAll('a') || []);
      return btns.map(a => {
        const r = a.getBoundingClientRect();
        return {
          text: a.textContent?.trim().replace(/\\s+/g, ' '),
          width: Math.round(r.width),
          height: Math.round(r.height),
          right: Math.round(r.right)
        };
      });
    })()`);

    // Mobile Navigation Drawer Test
    await evaluate(`(() => {
      const hamburger = document.querySelector('header button[aria-label*="menu"]');
      if (hamburger) hamburger.click();
    })()`);
    await sleep(600);
    await captureScreenshot("mobile-02-drawer-open.png");

    await evaluate(`(() => {
      const closeBtn = document.querySelector('button[aria-label="Tutup menu"]');
      if (closeBtn) closeBtn.click();
    })()`);
    await sleep(600);

    for (const sectionId of sections) {
      await evaluate(
        `document.getElementById('${sectionId}')?.scrollIntoView({ behavior: 'instant', block: 'start' });`
      );
      await sleep(750);
      await captureScreenshot(`mobile-${sectionId}.png`);
    }

    await evaluate(
      `window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });`
    );
    await sleep(600);
    await captureScreenshot("mobile-footer.png");

    // Interactive Mobile Test 1: Testimonials pagination dots
    await evaluate(
      `document.getElementById('testimoni')?.scrollIntoView({ behavior: 'instant', block: 'start' });`
    );
    await sleep(400);
    const testimonialsCheck = await evaluate(`(async () => {
      const sleepMs = (ms) => new Promise(r => setTimeout(r, ms));
      const dots = Array.from(document.querySelectorAll('#testimoni nav button'));
      const cardsCount = document.querySelectorAll('#testimoni [aria-roledescription="slide"]').length;
      if (dots.length < 3) return { cardsCount, dotsCount: dots.length, dotSwitchWorked: false };
      dots[2].click();
      await sleepMs(450);
      const isThirdActive = dots[2].getAttribute('aria-current') === 'true';
      dots[0].click();
      await sleepMs(300);
      return { cardsCount, dotsCount: dots.length, dotSwitchWorked: isThirdActive };
    })()`);
    console.log("Testimonials mobile check:", testimonialsCheck);

    // Interactive Mobile Test 2: Map gesture guard toggle
    await evaluate(
      `document.getElementById('lokasi')?.scrollIntoView({ behavior: 'instant', block: 'start' });`
    );
    await sleep(400);
    const mapGuardCheck = await evaluate(`(async () => {
      const sleepMs = (ms) => new Promise(r => setTimeout(r, ms));
      const iframeBefore = document.querySelector('#lokasi iframe')?.className || '';
      const toggleBtn = Array.from(document.querySelectorAll('#lokasi button')).find(b =>
        b.textContent?.includes('Aktifkan Interaksi Peta')
      );
      if (!toggleBtn) return { found: false };
      toggleBtn.click();
      await sleepMs(200);
      const iframeAfter = document.querySelector('#lokasi iframe')?.className || '';
      const lockedLabelNow = Array.from(document.querySelectorAll('#lokasi button')).some(b =>
        b.textContent?.includes('Kunci Geser / Zoom')
      );
      return {
        found: true,
        initiallyPointerEventsNone: iframeBefore.includes('pointer-events-none'),
        activatedPointerEventsAuto: iframeAfter.includes('pointer-events-auto'),
        lockedLabelNow
      };
    })()`);
    console.log("Map gesture guard check:", mapGuardCheck);

    // --- PHASE 3: MOBILE ACCESSIBILITY & HEADING HIERARCHY AUDIT ---
    console.log("\n=== RUNNING MOBILE ACCESSIBILITY & HEADING AUDIT ===");
    const a11yAudit = await evaluate(`(() => {
      const results = {
        forms: [],
        headings: [],
        headingSkips: [],
        smallPrimaryTouchTargets: [],
        smallPaginationDots: []
      };

      document.querySelectorAll('input, select, textarea').forEach(input => {
        const id = input.id;
        const label = id ? document.querySelector('label[for="' + id + '"]') : null;
        const ariaLabel = input.getAttribute('aria-label');
        const ariaLabelledBy = input.getAttribute('aria-labelledby');
        results.forms.push({
          id: id || input.name || 'unnamed',
          type: input.type || input.tagName.toLowerCase(),
          hasLabel: !!(label || ariaLabel || ariaLabelledBy),
          labelContent: label ? label.textContent.trim() : ariaLabel
        });
      });

      let prevLevel = 0;
      document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
        const level = Number(h.tagName.slice(1));
        const text = h.textContent.trim().substring(0, 45);
        if (prevLevel > 0 && level > prevLevel + 1) {
          results.headingSkips.push({ from: 'H' + prevLevel, to: 'H' + level, text });
        }
        prevLevel = level;
        results.headings.push({
          tag: h.tagName,
          text,
          fontSize: window.getComputedStyle(h).fontSize,
          fontWeight: window.getComputedStyle(h).fontWeight
        });
      });

      document.querySelectorAll('button, a, input[type="submit"]').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const isPaginationDot = !!el.closest('#testimoni nav');
        if (isPaginationDot) {
          if (rect.width < 24 || rect.height < 24) {
            results.smallPaginationDots.push({
              text: el.getAttribute('aria-label') || '',
              width: Math.round(rect.width),
              height: Math.round(rect.height)
            });
          }
          return;
        }
        if (rect.width < 44 || rect.height < 44) {
          results.smallPrimaryTouchTargets.push({
            tag: el.tagName,
            text: (el.textContent.trim() || el.getAttribute('aria-label') || '').substring(0, 35),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            href: el.getAttribute('href') || null
          });
        }
      });

      return results;
    })()`);

    console.log("Heading skips:", a11yAudit.headingSkips.length, a11yAudit.headingSkips);
    console.log("Small primary touch targets (< 44px):", a11yAudit.smallPrimaryTouchTargets.length);
    console.log("Small pagination dots (< 24px):", a11yAudit.smallPaginationDots.length);

    const auditSummary = {
      timestamp: new Date().toISOString(),
      auditUrl: AUDIT_URL,
      viewport: { desktop: "1440x900", mobile: "390x844" },
      heroCheckDesktop,
      mobileHeroCheck,
      brokenImages,
      mobileOverflow,
      serviceAutoFill: {
        success: serviceAutoFillValue === "Perawatan Berkala",
        value: serviceAutoFillValue,
      },
      portfolioCheck,
      testimonialsCheck,
      mapGuardCheck,
      a11y: a11yAudit,
    };

    fs.writeFileSync(
      path.join(SCREENSHOT_DIR, "audit-results.json"),
      JSON.stringify(auditSummary, null, 2)
    );
    console.log("\nAudit completed! Results saved to audit-results.json");

    cdp.close();
  } finally {
    try {
      chromeProcess.kill();
    } catch {}
  }
}

runAudit().catch((err) => {
  console.error("Audit failed:", err);
  process.exit(1);
});
