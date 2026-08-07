import { prepare, layout, clearCache } from '@chenglou/pretext';

/**
 * Font strings matching the application CSS typography tokens
 */
export const PRETEXT_FONTS = {
  TITLE_LG: (lang) => `900 28px ${getFontFamily(lang)}`,
  TITLE_MD: (lang) => `800 20px ${getFontFamily(lang)}`,
  CARD_TITLE: (lang) => `700 16px ${getFontFamily(lang)}`,
  CARD_SUB: (lang) => `500 13px ${getFontFamily(lang)}`,
  BADGE: (lang) => `700 12px ${getFontFamily(lang)}`,
  BODY: (lang) => `500 14px ${getFontFamily(lang)}`,
};

function getFontFamily(lang) {
  if (lang === 'hi') return "'Noto Sans Devanagari', 'Noto Sans', sans-serif";
  if (lang === 'te') return "'Noto Sans Telugu', 'Noto Sans', sans-serif";
  return "'Noto Sans', sans-serif";
}

// In-memory cache for prepared pretext tokens
const preparedCache = new Map();

/**
 * Pre-measure and compute exact height & line count using Pretext arithmetic
 * Guaranteed zero DOM reflows.
 */
export function computePretextLayout(text, fontString, maxWidth, lineHeight) {
  if (!text) return { height: lineHeight, lineCount: 1, width: 0 };

  const cacheKey = `${text}:::${fontString}`;
  let prepared = preparedCache.get(cacheKey);

  try {
    if (!prepared) {
      prepared = prepare(text, fontString);
      preparedCache.set(cacheKey, prepared);
    }

    // Pure arithmetic layout calculation via Pretext
    const result = layout(prepared, maxWidth, lineHeight);
    
    // Height & line count calculated purely via arithmetic
    const height = typeof result?.height === 'number' ? Math.ceil(result.height) : lineHeight;
    const lineCount = typeof result?.lineCount === 'number' ? result.lineCount : Math.max(1, Math.ceil(height / lineHeight));

    return {
      height,
      lineCount,
      width: maxWidth,
    };
  } catch (err) {
    // Fallback safe measurement
    return {
      height: lineHeight,
      lineCount: 1,
      width: maxWidth,
    };
  }
}

export function flushPretextCache() {
  preparedCache.clear();
  try {
    clearCache();
  } catch (_) {}
}
