export type VideoPlatform = "tiktok" | "instagram" | "youtube" | "unknown";

export interface ParsedVideoEmbed {
  platform: VideoPlatform;
  platformLabel: string;
  videoId: string | null;
  embedUrl: string | null;
  autoplayEmbedUrl: string | null;
  defaultThumbnail: string | null;
}

/**
 * Parse a TikTok, Instagram Reels, or YouTube Shorts URL into embed metadata.
 */
export function parseVideoEmbed(url: string): ParsedVideoEmbed {
  const trimmed = url.trim();

  const tiktokMatch = trimmed.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/i);
  if (tiktokMatch) {
    const id = tiktokMatch[1];
    return {
      platform: "tiktok",
      platformLabel: "TikTok",
      videoId: id,
      embedUrl: `https://www.tiktok.com/player/v1/${id}?controls=1&description=0&music_info=0&rel=0`,
      autoplayEmbedUrl: `https://www.tiktok.com/player/v1/${id}?controls=1&description=0&music_info=0&rel=0&autoplay=1`,
      defaultThumbnail: null,
    };
  }

  const instagramMatch = trimmed.match(
    /instagram\.com\/(?:reel|reels|p)\/([A-Za-z0-9_-]+)/i
  );
  if (instagramMatch) {
    const id = instagramMatch[1];
    return {
      platform: "instagram",
      platformLabel: "Instagram Reels",
      videoId: id,
      embedUrl: `https://www.instagram.com/reel/${id}/embed/`,
      autoplayEmbedUrl: `https://www.instagram.com/reel/${id}/embed/`,
      defaultThumbnail: null,
    };
  }

  const youtubeMatch = trimmed.match(
    /(?:youtube\.com\/(?:shorts\/|watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/i
  );
  if (youtubeMatch) {
    const id = youtubeMatch[1];
    return {
      platform: "youtube",
      platformLabel: "YouTube Shorts",
      videoId: id,
      embedUrl: `https://www.youtube-nocookie.com/embed/${id}?rel=0&playsinline=1&modestbranding=1&enablejsapi=1`,
      autoplayEmbedUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1&modestbranding=1&enablejsapi=1`,
      defaultThumbnail: `https://i.ytimg.com/vi/${id}/oar2.jpg`,
    };
  }

  return {
    platform: "unknown",
    platformLabel: "Video",
    videoId: null,
    embedUrl: null,
    autoplayEmbedUrl: null,
    defaultThumbnail: null,
  };
}
