import { AlertTriangle, Phone } from 'lucide-react';
import { t } from '../data/translations';
import AudioHint from './shared/AudioHint';

export default function EmergencyScreen({ lang, onBack }) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 py-2">
      {/* Giant pulsing alert icon */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-40 scale-110" />
        <div className="relative w-28 h-28 bg-red-600/30 border-2 border-red-500/60 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.5)]">
          <AlertTriangle size={56} className="text-red-400 drop-shadow" strokeWidth={2.4} />
        </div>
      </div>

      {/* Large, clear instruction */}
      <div className="flex flex-col gap-3 max-w-md">
        <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
          {t(lang, 'emergencyTitle')}
        </h2>
        <div className="inline-flex items-center justify-center gap-4 bg-red-950/80 border border-red-500/40 rounded-2xl px-6 py-3 mx-auto shadow-inner">
          <span className="text-5xl font-black text-red-400">0</span>
          <div className="text-left">
            <div className="text-white font-black text-lg leading-tight">{t(lang, 'emergencyFloor')}</div>
            <div className="text-red-300 text-xs font-mono">{t(lang, 'groundFloor')}</div>
          </div>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed mt-1">
          {t(lang, 'emergencyNote')}
        </p>
      </div>

      {/* Helpline */}
      <div className="flex flex-col items-center gap-3 w-full max-w-xs mt-2">
        <a
          href="tel:108"
          id="emergency-call-btn"
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xl py-3.5 rounded-2xl shadow-[0_0_25px_rgba(239,68,68,0.5)] active:scale-95 transition-all"
        >
          <Phone size={24} />
          {t(lang, 'emergencyCall')}
        </a>
        <div>
          <AudioHint lang={lang} />
        </div>
      </div>
    </div>
  );
}
