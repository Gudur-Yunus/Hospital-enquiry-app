import { t } from '../data/translations';

export default function LanguageSelector({ onSelect, onBack }) {
  const languages = [
    {
      code: 'en',
      nativeName: 'English',
      scriptPreview: 'Aa',
      subtitle: 'English (US/UK)',
      bg: 'from-blue-950/80 to-slate-900/90',
      border: 'border-blue-500/40 hover:border-blue-400',
      accent: '#38BDF8',
    },
    {
      code: 'hi',
      nativeName: 'हिन्दी',
      scriptPreview: 'अ',
      subtitle: 'Hindi',
      bg: 'from-amber-950/80 to-slate-900/90',
      border: 'border-amber-500/40 hover:border-amber-400',
      accent: '#F59E0B',
    },
    {
      code: 'te',
      nativeName: 'తెలుగు',
      scriptPreview: 'అ',
      subtitle: 'Telugu',
      bg: 'from-emerald-950/80 to-slate-900/90',
      border: 'border-emerald-500/40 hover:border-emerald-400',
      accent: '#10B981',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-2">
      {/* Prompt */}
      <div className="text-center">
        <p className="text-xl font-bold text-white mb-1">Select Your Language</p>
        <p className="text-sm text-cyan-300/80 font-medium">
          अपनी भाषा चुनें &nbsp;|&nbsp; మీ భాషను ఎంచుకోండి
        </p>
      </div>

      {/* 3 large language buttons */}
      <div className="flex flex-col gap-3.5 w-full max-w-md">
        {languages.map((lang) => (
          <button
            key={lang.code}
            id={`lang-btn-${lang.code}`}
            onClick={() => onSelect(lang.code)}
            className={`flex items-center gap-4 p-4 rounded-2xl border-2 ${lang.border} bg-gradient-to-r ${lang.bg} hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md text-left w-full backdrop-blur-xl group`}
            aria-label={`Select language: ${lang.nativeName}`}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl font-black shadow-inner flex-shrink-0 border border-white/10"
              style={{ backgroundColor: lang.accent + '25', color: lang.accent }}
            >
              {lang.scriptPreview}
            </div>
            <div>
              <div className="text-2xl font-black text-white group-hover:text-cyan-200 transition-colors">
                {lang.nativeName}
              </div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">{lang.subtitle}</div>
            </div>
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-400 font-mono text-center mt-2">
        Arogya Desk — Zero-Reflow Multi-lingual Triage
      </p>
    </div>
  );
}
