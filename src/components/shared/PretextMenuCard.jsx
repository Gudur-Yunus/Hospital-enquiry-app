import { useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { computePretextLayout, PRETEXT_FONTS } from '../../utils/pretextLayout';

/**
 * PretextMenuCard — High-Performance Zero-Lag UI Card
 * Uses `@chenglou/pretext` with exact maxWidth bounds matching container padding.
 * Strict text constraints: flex-1 min-w-0 overflow-hidden break-words.
 */
export default function PretextMenuCard({
  id,
  icon: Icon,
  iconBg = 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
  title = '',
  subtitle = '',
  lang = 'en',
  badge = null,
  onClick,
  maxWidth = 360,
}) {
  // 1. Font strings matching exact CSS typography
  const titleFont = useMemo(() => PRETEXT_FONTS.CARD_TITLE(lang), [lang]);
  const subFont = useMemo(() => PRETEXT_FONTS.CARD_SUB(lang), [lang]);

  // 2. Compute Pretext arithmetic layout with exact available text width
  // Container max-w-md (448px) - card padding (32px) - icon (48px) - chevron (32px) - gaps (24px) = ~312px
  const textAvailableWidth = Math.max(180, maxWidth - 110);

  const titleLayout = useMemo(() => {
    return computePretextLayout(title, titleFont, textAvailableWidth, 20);
  }, [title, titleFont, textAvailableWidth]);

  const subLayout = useMemo(() => {
    return computePretextLayout(subtitle, subFont, textAvailableWidth, 16);
  }, [subtitle, subFont, textAvailableWidth]);

  // Locked container height calculated purely via arithmetic
  const contentHeight = Math.max(44, titleLayout.height + subLayout.height + 4);

  return (
    <button
      id={id}
      onClick={onClick}
      className="w-full text-left p-3.5 sm:p-4 rounded-2xl bg-slate-900/85 hover:bg-slate-800/95 border border-cyan-500/30 hover:border-cyan-400/70 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] transition-all duration-150 flex items-center justify-between group active:scale-[0.98] pointer-events-auto"
      style={{
        minHeight: `${contentHeight + 28}px`,
      }}
    >
      <div className="flex items-center gap-3.5 flex-1 min-w-0 pr-2">
        {/* Universal Icon Box */}
        <div
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 border transition-transform duration-150 group-hover:scale-105 ${iconBg}`}
        >
          {Icon && <Icon size={22} />}
        </div>

        {/* Text Container with Strict Bounds: flex-1 min-w-0 overflow-hidden break-words */}
        <div
          className="flex-1 min-w-0 overflow-hidden break-words flex flex-col justify-center"
          style={{ minHeight: `${contentHeight}px` }}
        >
          <div
            className="text-white font-bold text-sm sm:text-base leading-tight truncate group-hover:text-cyan-200 transition-colors"
            style={{
              fontFamily: lang === 'hi' ? "'Noto Sans Devanagari', sans-serif" : lang === 'te' ? "'Noto Sans Telugu', sans-serif" : "'Noto Sans', sans-serif",
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              className="text-xs text-slate-400 font-medium leading-tight mt-0.5 truncate"
              style={{
                fontFamily: lang === 'hi' ? "'Noto Sans Devanagari', sans-serif" : lang === 'te' ? "'Noto Sans Telugu', sans-serif" : "'Noto Sans', sans-serif",
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      </div>

      {/* Badge & Chevron Indicator */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {badge && (
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
            {badge}
          </span>
        )}
        <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400 group-hover:text-cyan-300 group-hover:border-cyan-400/40 group-hover:translate-x-0.5 transition-all">
          <ChevronRight size={18} />
        </div>
      </div>
    </button>
  );
}
