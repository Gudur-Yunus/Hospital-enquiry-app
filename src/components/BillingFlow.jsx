import { useState } from 'react';
import { ShieldCheck, Receipt, User, Phone, CheckCircle, ChevronLeft, CreditCard, Sparkles } from 'lucide-react';
import { t } from '../data/translations';
import { saveEnquiry } from '../utils/storage';
import { generateToken } from '../utils/tokenGenerator';
import AudioHint from './shared/AudioHint';

export default function BillingFlow({ lang, onDone, onBack }) {
  const [submitting, setSubmitting] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [hasAyushman, setHasAyushman] = useState(false);
  const [billingCategory, setBillingCategory] = useState('ayushman');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const { id, tokenNumber } = generateToken();
    const enquiry = {
      id,
      tokenNumber,
      category: 'billing',
      department: 'billing',
      patientName: patientName || 'Walk-in Patient',
      phoneNumber: phoneNumber || '9999999999',
      preferredLanguage: lang,
      description: hasAyushman
        ? 'Ayushman Bharat Cardholder / PM-JAY Cashless Claim'
        : `Billing Assistance: ${billingCategory}`,
      status: 'received',
      createdAt: Date.now(),
    };
    saveEnquiry(enquiry);
    setTimeout(() => onDone(enquiry), 200);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-white">
      <div className="flex items-center justify-between">
        <p className="text-cyan-200/80 text-xs sm:text-sm font-medium">
          {lang === 'hi' ? 'आयुष्मान भारत, बीमा और कैश बिलिंग काउंटर टोकन' : lang === 'te' ? 'ఆయుష్మాన్ భారత్ మరియు బిల్లింగ్ సహాయం' : 'Ayushman Bharat, Insurance Claims & Cash Billing Token'}
        </p>
        <AudioHint lang={lang} small />
      </div>

      {/* Ayushman Bharat Premium Glass Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-teal-950/80 to-emerald-950/80 border border-emerald-500/50 flex items-center justify-between shadow-[0_0_20px_rgba(16,185,129,0.2)]">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300 border border-emerald-400/40 flex-shrink-0">
            <ShieldCheck size={28} />
          </div>
          <div>
            <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>Ayushman Bharat / PM-JAY</span>
              <Sparkles size={14} className="text-yellow-400" />
            </div>
            <div className="text-xs text-emerald-300/90 font-mono">100% Cashless Treatment • Desk 4 (Ground Floor)</div>
          </div>
        </div>
        <label className="flex items-center gap-2 cursor-pointer bg-emerald-500/20 hover:bg-emerald-500/30 px-3 py-2 rounded-xl border border-emerald-400/40 text-xs font-bold text-emerald-200 transition-all active:scale-95">
          <input
            type="checkbox"
            checked={hasAyushman}
            onChange={(e) => setHasAyushman(e.target.checked)}
            className="w-4 h-4 rounded text-emerald-500 cursor-pointer"
          />
          <span>I have PM-JAY Card</span>
        </label>
      </div>

      {/* Input: Patient Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold font-mono text-cyan-300 uppercase">
          {t(lang, 'patientName')}
        </label>
        <div className="relative">
          <User className="absolute left-3.5 top-3.5 text-cyan-400" size={18} />
          <input
            type="text"
            required
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="Enter patient name (e.g. Suresh Patel)"
            className="w-full bg-slate-950/90 border border-cyan-500/30 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 shadow-inner"
          />
        </div>
      </div>

      {/* Input: Phone Number */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold font-mono text-cyan-300 uppercase">
          {t(lang, 'phoneNumber')}
        </label>
        <div className="relative">
          <Phone className="absolute left-3.5 top-3.5 text-cyan-400" size={18} />
          <input
            type="tel"
            required
            pattern="[0-9]{10}"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="10-digit mobile number for token SMS"
            className="w-full bg-slate-950/90 border border-cyan-500/30 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 shadow-inner"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full mt-2 py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold text-base shadow-[0_0_25px_rgba(20,184,166,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
      >
        <Receipt size={22} />
        Generate Billing Assistance Token
      </button>
    </form>
  );
}
