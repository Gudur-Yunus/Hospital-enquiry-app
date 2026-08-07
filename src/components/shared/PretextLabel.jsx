import { useEffect, useRef, useState, useMemo } from 'react';
import { prepare, layoutWithLines, measureNaturalWidth } from '@chenglou/pretext';

/**
 * PretextLabel — High-Performance Text Measurement & Layout Engine
 * Powered by Cheng Lou's `@chenglou/pretext`.
 *
 * Solves the critical WebGL / 3D layout performance issue:
 *  - Standard DOM text causes layout thrashing and reflows when language changes.
 *  - Pretext pre-measures glyphs and computes exact line breaks in Canvas memory.
 *  - Renders either directly to a crisp Retina/High-DPI 2D canvas OR a pre-sized
 *    zero-reflow container, keeping the 3D scene running at a rock-solid 60 FPS.
 */

// Helper to determine the optimal font stack based on current language
export function getFontFamilyForLang(lang) {
  if (lang === 'hi') {
    return "'Noto Sans Devanagari', 'Noto Sans', sans-serif";
  }
  if (lang === 'te') {
    return "'Noto Sans Telugu', 'Noto Sans', sans-serif";
  }
  return "'Noto Sans', sans-serif";
}

export default function PretextLabel({
  text = '',
  lang = 'en',
  fontSize = 16,
  fontWeight = 700,
  color = '#F8FAFC',
  maxWidth = 260,
  lineHeight = 22,
  align = 'center',
  renderCanvas = true,
  className = '',
  style = {},
}) {
  const canvasRef = useRef(null);
  const [layoutResult, setLayoutResult] = useState(null);

  const fontString = useMemo(() => {
    const family = getFontFamilyForLang(lang);
    return `${fontWeight} ${fontSize}px ${family}`;
  }, [lang, fontSize, fontWeight]);

  // Compute layout using Pretext
  useEffect(() => {
    if (!text) {
      setLayoutResult(null);
      return;
    }

    try {
      // 1. Prepare text run with pretext
      const prepared = prepare(text, fontString);
      
      // 2. Measure natural single-line width
      const naturalWidth = measureNaturalWidth ? measureNaturalWidth(prepared) : maxWidth;
      const targetWidth = Math.min(maxWidth, Math.max(naturalWidth + 8, 40));

      // 3. Compute exact multi-line line breaks
      const layoutData = layoutWithLines(prepared, targetWidth, lineHeight);
      
      // Extract lines safely whether returned as array, object, or text ranges
      let lines = [text];
      if (layoutData) {
        if (Array.isArray(layoutData.lines)) {
          lines = layoutData.lines.map(l => typeof l === 'string' ? l : (l.text || text));
        } else if (Array.isArray(layoutData)) {
          lines = layoutData.map(l => typeof l === 'string' ? l : (l.text || text));
        }
      }
      const computedHeight = Math.max(lines.length * lineHeight, lineHeight);
      const computedWidth = targetWidth;

      setLayoutResult({
        lines,
        width: Math.ceil(computedWidth),
        height: Math.ceil(computedHeight),
      });
    } catch (err) {
      // Safe graceful fallback
      setLayoutResult({
        lines: [text],
        width: maxWidth,
        height: lineHeight * 1.5,
      });
    }
  }, [text, fontString, maxWidth, lineHeight]);

  // Render to High-DPI 2D Canvas for zero-reflow drawing
  useEffect(() => {
    if (!renderCanvas || !layoutResult || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 2;
    const w = layoutResult.width;
    const h = layoutResult.height;

    // Set high-DPI canvas dimensions
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    // Scale context for crisp retina rendering
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    // Font settings
    ctx.font = fontString;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = 'middle';

    const x = align === 'center' ? w / 2 : align === 'right' ? w : 0;

    layoutResult.lines.forEach((lineText, idx) => {
      const y = (idx + 0.5) * lineHeight;
      ctx.fillText(lineText, x, y);
    });
  }, [layoutResult, fontString, color, align, lineHeight, renderCanvas]);

  if (!text) return null;

  if (renderCanvas) {
    return (
      <div
        className={`inline-flex items-center justify-center ${className}`}
        style={{
          width: layoutResult ? `${layoutResult.width}px` : 'auto',
          height: layoutResult ? `${layoutResult.height}px` : `${lineHeight}px`,
          transition: 'width 0.15s ease, height 0.15s ease',
          ...style,
        }}
      >
        <canvas ref={canvasRef} className="block pointer-events-none" />
      </div>
    );
  }

  // Fallback / Hybrid DOM mode with locked bounds calculated by Pretext
  return (
    <div
      className={`select-none ${className}`}
      style={{
        width: layoutResult ? `${layoutResult.width}px` : 'auto',
        minHeight: layoutResult ? `${layoutResult.height}px` : `${lineHeight}px`,
        font: fontString,
        color,
        textAlign: align,
        lineHeight: `${lineHeight}px`,
        ...style,
      }}
    >
      {layoutResult?.lines ? layoutResult.lines.map((l, i) => <div key={i}>{l}</div>) : text}
    </div>
  );
}
