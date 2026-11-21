import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const USER_DATA_DIR = "C:\\Users\\Wissenchaften\\AppData\\Local\\Temp\\chrome_audit_profile";
const SCREENSHOT_DIR = "C:\\Users\\Wissenchaften\\Desktop\\Web Bengkel Bunul\\docs\\ui-visual-validator\\screenshots";

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

// Helper to launch Chrome
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

// Helper to sleep
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper for CDP client
class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 0;
    this.callbacks = new Map();
    this.events = [];

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
  console.log("Starting Chrome...");
  const chromeProcess = launchChrome();

  try {
    // Wait for debug port
    let versionData = null;
    for (let i = 0; i < 20; i++) {
      try {
        const res = await fetch("http://127.0.0.1:9222/json/version");
        if (res.ok) {
          versionData = await res.json();
          break;
        }
      } catch (e) {}
      await sleep(500);
    }

    if (!versionData) {
      throw new Error("Could not connect to Chrome debugging port");
    }

    console.log("Connected to Chrome. Creating target...");
    const targetRes = await fetch("http://127.0.0.1:9222/json/new?about:blank", { method: "PUT" });
    const targetData = await targetRes.json();
    const wsUrl = targetData.webSocketDebuggerUrl;

    const cdp = new CDPClient(wsUrl);
    await cdp.ready();
    console.log("CDP session established.");

    await cdp.send("Page.enable");
    await cdp.send("DOM.enable");
    await cdp.send("Runtime.enable");
    await cdp.send("Log.enable");

    // Track console messages and errors
    const consoleLogs = [];
    const jsErrors = [];

    // Helper to evaluate script
    const evaluate = async (expression) => {
      const res = await cdp.send("Runtime.evaluate", {
        expression,
        returnByValue: true,
        awaitPromise: true,
      });
      return res.result?.value;
    };

    // Helper to take screenshot
    const captureScreenshot = async (filename, clip = null) => {
      const params = { format: "png" };
      if (clip) params.clip = clip;
      const res = await cdp.send("Page.captureScreenshot", params);
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

    console.log("Navigating to http://localhost:3000...");
    await cdp.send("Page.navigate", { url: "http://localhost:3000" });
    await sleep(2500); // Wait for hydration and motion animations

    // 1. Desktop Hero
    await captureScreenshot("desktop-01-hero.png");

    // Check broken images
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
    console.log("Broken images found:", brokenImages.length, brokenImages);

    // Section bounding rects and scroll captures
    const sections = ["tentang-kami", "layanan", "portofolio", "testimoni", "reservasi", "lokasi"];
    const desktopSectionScreenshots = {};

    for (const sectionId of sections) {
      await evaluate(`document.getElementById('${sectionId}')?.scrollIntoView({ behavior: 'instant', block: 'start' });`);
      await sleep(800);
      const filename = `desktop-${sectionId}.png`;
      await captureScreenshot(filename);
      desktopSectionScreenshots[sectionId] = filename;
    }

    // Scroll to footer
    await evaluate(`window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });`);
    await sleep(600);
    await captureScreenshot("desktop-footer.png");

    // Test interactive service selection flow
    console.log("Testing service card auto-fill interaction...");
    const serviceTestResult = await evaluate(`(() => {
      // Find button on service card
      const btn = document.querySelector('#layanan button');
      if (!btn) return { error: 'No service button found' };
      btn.click();
      return { success: true };
    })()`);
    await sleep(1000);
    const reservationServiceValue = await evaluate(`document.getElementById('layanan')?.value`);
    console.log("Auto-filled service dropdown value:", reservationServiceValue);

    // --- PHASE 2: MOBILE AUDIT (390x844 - iPhone 12/13/14) ---
    console.log("\n=== AUDITING MOBILE (390x844) ===");
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
      hasTouch: true,
    });
    await cdp.send("Emulation.setUserAgentOverride", {
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1",
    });

    await evaluate(`window.scrollTo({ top: 0, behavior: 'instant' });`);
    await sleep(1500);

    // 1. Mobile Hero Viewport
    await captureScreenshot("mobile-01-hero.png");

    // Check horizontal overflow (body width bug)
    const mobileOverflow = await evaluate(`(() => {
      const scrollWidth = document.documentElement.scrollWidth;
      const clientWidth = document.documentElement.clientWidth;
      const windowWidth = window.innerWidth;
      const elementsOverflowing = [];
      document.querySelectorAll('*').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.right > windowWidth + 2) {
          elementsOverflowing.push({
            tag: el.tagName,
            id: el.id,
            className: el.className?.toString?.() || '',
            right: rect.right,
            width: rect.width
          });
        }
      });
      return {
        scrollWidth,
        clientWidth,
        windowWidth,
        hasHorizontalScroll: scrollWidth > clientWidth,
        overflowingCount: elementsOverflowing.length,
        elementsOverflowing: elementsOverflowing.slice(0, 10)
      };
    })()`);
    console.log("Mobile overflow check:", mobileOverflow);

    // 2. Mobile Navigation Drawer Test
    console.log("Testing mobile drawer interaction...");
    const drawerOpen = await evaluate(`(() => {
      const hamburger = document.querySelector('header button[aria-label*="menu"]');
      if (hamburger) {
        hamburger.click();
        return { clicked: true };
      }
      return { error: 'Hamburger not found' };
    })()`);
    await sleep(600);
    await captureScreenshot("mobile-02-drawer-open.png");

    // Close drawer
    await evaluate(`(() => {
      const closeBtn = document.querySelector('button[aria-label="Tutup menu"]');
      if (closeBtn) closeBtn.click();
    })()`);
    await sleep(600);

    // Mobile Section screenshots
    for (const sectionId of sections) {
      await evaluate(`document.getElementById('${sectionId}')?.scrollIntoView({ behavior: 'instant', block: 'start' });`);
      await sleep(700);
      const filename = `mobile-${sectionId}.png`;
      await captureScreenshot(filename);
    }

    // Mobile Footer
    await evaluate(`window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });`);
    await sleep(600);
    await captureScreenshot("mobile-footer.png");

    // --- PHASE 3: ACCESSIBILITY & DESIGN SYSTEM AUDIT ---
    console.log("\n=== RUNNING ACCESSIBILITY & DESIGN TOKEN AUDIT ===");
    const a11yAudit = await evaluate(`(() => {
      const results = {
        forms: [],
        headings: [],
        touchTargets: [],
        contrastIssues: [],
        focusIndicators: []
      };

      // Form inputs without labels
      const inputs = document.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
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

      // Headings hierarchy
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach(h => {
        results.headings.push({
          tag: h.tagName,
          text: h.textContent.trim().substring(0, 40),
          fontSize: window.getComputedStyle(h).fontSize,
          fontWeight: window.getComputedStyle(h).fontWeight,
          fontFamily: window.getComputedStyle(h).fontFamily
        });
      });

      // Interactive touch targets (< 44x44px check)
      const buttons = document.querySelectorAll('button, a, input[type="submit"]');
      buttons.forEach(btn => {
        const rect = btn.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
          results.touchTargets.push({
            tag: btn.tagName,
            text: btn.textContent.trim().substring(0, 30),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            href: btn.getAttribute('href') || null
          });
        }
      });

      return results;
    })()`);

    console.log("Form inputs audited:", a11yAudit.forms.length);
    console.log("Small touch targets (< 44px):", a11yAudit.touchTargets.length);

    // Compile complete results
    const auditSummary = {
      timestamp: new Date().toISOString(),
      viewport: { desktop: "1440x900", mobile: "390x844" },
      brokenImages,
      mobileOverflow,
      serviceAutoFill: {
        success: reservationServiceValue === "Kelistrikan",
        value: reservationServiceValue
      },
      a11y: a11yAudit
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
    } catch (e) {}
  }
}

runAudit().catch(err => {
  console.error("Audit failed:", err);
  process.exit(1);
});
