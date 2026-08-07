/**
 * LangTransition — Prevents layout jumps when switching between English,
 * Hindi (Devanagari), and Telugu scripts.
 *
 * Strategy (replacing pretext which isn't npm-published):
 *  1. On language change, capture the current container height via
 *     useLayoutEffect (runs synchronously before paint).
 *  2. Lock the container to that measured height for one frame.
 *  3. Fade out (opacity 0), let React re-render with new lang strings,
 *     measure the new natural height, release the height lock.
 *  4. Fade in — the container slides smoothly to its new height.
 *
 * This gives the same "measure before render" guarantee as pretext's
 * layout pass, without needing an external library.
 */
import { useRef, useLayoutEffect, useState, useEffect } from 'react';

export default function LangTransition({ lang, children, className = '' }) {
  const containerRef = useRef(null);
  const prevLangRef = useRef(lang);
  const [visible, setVisible] = useState(true);
  const [lockedHeight, setLockedHeight] = useState(null);

  useEffect(() => {
    if (lang === prevLangRef.current) return;

    const el = containerRef.current;
    if (!el) {
      prevLangRef.current = lang;
      return;
    }

    // 1. Measure and lock current height BEFORE the new lang renders
    const currentH = el.getBoundingClientRect().height;
    setLockedHeight(currentH);

    // 2. Fade out
    setVisible(false);

    // 3. After one frame (new content rendered), measure new height, fade in
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setLockedHeight(null);   // release lock — container expands to natural height
        setVisible(true);
        prevLangRef.current = lang;
      });
    });

    return () => cancelAnimationFrame(raf);
  }, [lang]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        height: lockedHeight != null ? `${lockedHeight}px` : undefined,
        overflow: lockedHeight != null ? 'hidden' : undefined,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.18s ease, height 0.22s ease',
        willChange: 'opacity, height',
      }}
    >
      {children}
    </div>
  );
}
