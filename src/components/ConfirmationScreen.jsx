import { CalendarDays, MapPin, Receipt, AlertTriangle, Home, Search, CheckCircle } from 'lucide-react';
import { t } from '../data/translations';
import ProgressBar from './shared/ProgressBar';
import AudioHint from './shared/AudioHint';
import LangTransition from './shared/LangTransition';
import { getDeptById, getDeptName } from '../data/departments';

const categoryIcons = {
  appointment: CalendarDays,
  department: MapPin,
  billing: Receipt,
  emergency: AlertTriangle,
};

export default function ConfirmationScreen({ enquiry, lang, onTrack, onHome }) {
  const dept = getDeptById(enquiry.department);
  const CatIcon = categoryIcons[enquiry.category] || Receipt;

  return (
    <div className="flex flex-col items-center justify-start gap-5 py-2 text-white">
      {/* Success badge */}
      <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.3)]">
        <CheckCircle size={36} className="text-emerald-400" />
      </div>

      <h2 className="text-2xl font-black text-white text-center">
        {t(lang, 'enquiryReceived')}
      </h2>

      {/* Token number */}
      <div className="w-full bg-slate-950/80 border border-cyan-500/30 rounded-2xl p-4 text-center shadow-inner">
        <p className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-1">
          {t(lang, 'yourToken')}
        </p>
        <div className="text-2xl font-mono font-black text-cyan-300">{enquiry.id}</div>
        <div className="text-5xl font-black text-white mt-1">#{enquiry.tokenNumber}</div>
      </div>

      {/* Call message with audio hint */}
      <div className="w-full bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4 flex items-start gap-3">
        <AudioHint lang={lang} />
        <LangTransition lang={lang} className="text-sm text-cyan-100/90 leading-relaxed font-medium">
          {t(lang, 'weWillCall')}
        </LangTransition>
      </div>

      {/* Category + dept summary */}
      <div className="w-full bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 text-cyan-300">
          <CatIcon size={24} />
        </div>
        <div>
          <div className="text-xs text-slate-400 font-medium">{t(lang, 'department')}</div>
          <div className="text-base font-bold text-white">
            {dept ? getDeptName(dept, lang) : enquiry.department}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4">
        <ProgressBar status={enquiry.status} lang={lang} />
      </div>

      {/* Action buttons */}
      <div className="w-full flex flex-col gap-2.5 mt-2">
        <button
          id="goto-track-btn"
          onClick={() => onTrack(enquiry)}
          className="w-full py-3.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white text-base font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] active:scale-[0.98] transition-all"
        >
          <Search size={18} />
          {t(lang, 'trackEnquiry')}
        </button>
        <button
          id="goto-home-btn"
          onClick={onHome}
          className="w-full py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700 border border-slate-600 text-slate-200 text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <Home size={18} />
          {t(lang, 'backHome')}
        </button>
      </div>
    </div>
  );
}
