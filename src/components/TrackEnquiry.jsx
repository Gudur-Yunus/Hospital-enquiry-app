import { useState } from 'react';
import { Delete, Search } from 'lucide-react';
import { t } from '../data/translations';
import { getEnquiryByToken } from '../utils/storage';
import ProgressBar from './shared/ProgressBar';
import { getDeptById, getDeptName } from '../data/departments';
import AudioHint from './shared/AudioHint';

const KEYPAD = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['C', '0', '⌫'],
];

export default function TrackEnquiry({ lang, onBack, prefillToken = '' }) {
  const [input, setInput] = useState(prefillToken ? String(prefillToken) : '');
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(!!prefillToken);
  const [notFound, setNotFound] = useState(false);

  const handleKey = (key) => {
    if (key === 'C') {
      setInput('');
      setResult(null);
      setSearched(false);
      setNotFound(false);
    } else if (key === '⌫') {
      setInput((v) => v.slice(0, -1));
    } else {
      if (input.length < 4) setInput((v) => v + key);
    }
  };

  const handleSearch = () => {
    const enquiry = getEnquiryByToken(input);
    setSearched(true);
    if (enquiry) {
      setResult(enquiry);
      setNotFound(false);
    } else {
      setResult(null);
      setNotFound(true);
    }
  };

  const dept = result ? getDeptById(result.department) : null;

  const statusColors = {
    received: 'bg-amber-500/20 text-amber-300 border border-amber-400/40',
    in_progress: 'bg-blue-500/20 text-blue-300 border border-blue-400/40',
    resolved: 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40',
  };
  const statusLabels = {
    received: t(lang, 'statusReceived'),
    in_progress: t(lang, 'statusInProgress'),
    resolved: t(lang, 'statusResolved'),
  };

  return (
    <div className="flex flex-col gap-4 text-white">
      <div className="flex items-center justify-between">
        <p className="text-cyan-200/80 text-sm">
          {t(lang, 'trackTitle') || 'Track live status of your OPD enquiry or token'}
        </p>
        <AudioHint lang={lang} small />
      </div>

      {/* Token display */}
      <div className="bg-slate-950/80 border border-cyan-500/30 rounded-2xl text-center py-4 shadow-inner">
        <p className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-1">
          {t(lang, 'enterToken')}
        </p>
        <div className="text-4xl sm:text-5xl font-mono font-black text-cyan-300 tracking-[0.15em] min-h-[56px] flex items-center justify-center">
          {input || '—'}
        </div>
      </div>

      {/* Numeric keypad */}
      <div className="flex flex-col items-center gap-2">
        {KEYPAD.map((row, ri) => (
          <div key={ri} className="flex gap-2.5">
            {row.map((key) => (
              <button
                key={key}
                id={`keypad-${key}`}
                onClick={() => handleKey(key)}
                className="w-14 h-12 rounded-xl bg-slate-800/80 hover:bg-cyan-950 border border-cyan-500/30 hover:border-cyan-400 text-white font-mono font-black text-lg flex items-center justify-center active:scale-95 transition-all shadow-md"
                aria-label={key}
              >
                {key === '⌫' ? <Delete size={20} className="text-rose-400" /> : key}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Search button */}
      <button
        id="track-search-btn"
        onClick={handleSearch}
        disabled={input.length === 0}
        className="w-full py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white text-base font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition-all"
      >
        <Search size={18} />
        {t(lang, 'search')}
      </button>

      {/* Result */}
      {searched && notFound && (
        <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-center animate-fadeIn">
          <p className="text-rose-300 font-semibold text-sm">{t(lang, 'notFound')}</p>
        </div>
      )}

      {result && (
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/30 flex flex-col gap-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-mono text-cyan-400">TOKEN NUMBER</div>
              <div className="text-xl font-mono font-black text-cyan-300">{result.id}</div>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColors[result.status] || 'bg-slate-800 text-slate-300'}`}>
              {statusLabels[result.status] || result.status}
            </span>
          </div>
          {result.patientName && result.patientName !== '—' && (
            <p className="text-sm font-semibold text-white">{result.patientName}</p>
          )}
          {dept && (
            <p className="text-xs text-cyan-200/80">{getDeptName(dept, lang)}</p>
          )}
          <ProgressBar status={result.status} lang={lang} />
        </div>
      )}
    </div>
  );
}
