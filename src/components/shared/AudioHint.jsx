import { Volume2 } from 'lucide-react';
import { t } from '../../data/translations';

// Audio hint speaker button — Accessibility trigger with crisp styling
export default function AudioHint({ lang, small = false }) {
  return (
    <button
      type="button"
      title={t(lang, 'readAloud') || 'Read Aloud'}
      className={`inline-flex items-center justify-center rounded-xl bg-slate-800/80 hover:bg-slate-700 text-cyan-400 border border-slate-700/80 hover:border-cyan-400/50 transition-all flex-shrink-0 active:scale-95 shadow-sm ${
        small ? 'w-8 h-8' : 'px-2.5 py-1.5 gap-1.5 text-xs font-semibold'
      }`}
      onClick={(e) => {
        e.stopPropagation();
      }}
      aria-label="Read aloud"
    >
      <Volume2 size={small ? 15 : 17} className="text-cyan-400" />
      {!small && <span className="font-medium text-slate-300">{t(lang, 'readAloud')}</span>}
    </button>
  );
}
