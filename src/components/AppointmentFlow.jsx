import { useState } from 'react';
import {
  ChevronLeft,
  CalendarDays,
  User,
  Phone,
  CheckCircle,
  Building2,
  Calendar,
  FileText,
} from 'lucide-react';
import {
  Stethoscope, Heart, Bone, Baby, Receipt, Pill, Activity,
} from 'lucide-react';
import { t } from '../data/translations';
import { departments, getDeptName } from '../data/departments';
import { saveEnquiry } from '../utils/storage';
import { generateToken } from '../utils/tokenGenerator';
import AudioHint from './shared/AudioHint';

const deptIconMap = {
  Stethoscope, Heart, Bone, Baby, Receipt, Pill, Activity,
};

const getDateOptions = (lang) => {
  const tObj = {
    en: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    hi: ['रवि','सोम','मंगल','बुध','गुरु','शुक्र','शनि'],
    te: ['ఆది','సోమ','మంగళ','బుధ','గురు','శుక్ర','శని'],
  };
  const mObj = {
    en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    hi: ['जन','फर','मार','अप्र','मई','जून','जुल','अग','सित','अक्त','नव','दिस'],
    te: ['జన','ఫిబ','మార్చి','ఏప్రిల్','మే','జూన్','జూలై','ఆగ','సెప్ట','అక్టో','నవ','డిస'],
  };
  const days = tObj[lang] || tObj.en;
  const months = mObj[lang] || mObj.en;
  const today = new Date();
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      date: d,
      dayLabel: days[d.getDay()],
      dayNum: d.getDate(),
      monthLabel: months[d.getMonth()],
      isToday: i === 0,
      isTomorrow: i === 1,
    };
  });
};

const STEPS = [
  { id: 'department', icon: Building2, label: 'Department' },
  { id: 'date', icon: Calendar, label: 'Date & Slot' },
  { id: 'details', icon: User, label: 'Patient Info' },
  { id: 'confirm', icon: FileText, label: 'Confirm' },
];

export default function AppointmentFlow({ lang, onDone, onBack, initialDept = null }) {
  const [step, setStep] = useState(initialDept ? 1 : 0);
  const [selectedDept, setSelectedDept] = useState(initialDept?.id || null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const dateOptions = getDateOptions(lang);
  const currentStep = STEPS[step].id;

  const goBack = () => {
    if (step === 0) onBack();
    else setStep((s) => s - 1);
  };

  const handleSubmit = () => {
    setSubmitting(true);
    const { id, tokenNumber } = generateToken();
    const dept = departments.find((d) => d.id === selectedDept);
    const enquiry = {
      id,
      tokenNumber,
      patientName: name || 'Walk-in Patient',
      phoneNumber: phone || '9999999999',
      preferredLanguage: lang,
      category: 'appointment',
      department: selectedDept,
      description: `Appointment at ${dept?.nameEn} on ${selectedDate?.date?.toDateString()}`,
      status: 'received',
      createdAt: Date.now(),
    };
    saveEnquiry(enquiry);
    setTimeout(() => onDone(enquiry), 200);
  };

  const selectedDeptObj = departments.find((d) => d.id === selectedDept);

  return (
    <div className="flex flex-col gap-5 text-white">
      {/* Modern Breadcrumb Progress Stepper */}
      <div className="flex items-center justify-between gap-2 p-2 bg-slate-950/70 border border-cyan-500/20 rounded-2xl">
        {STEPS.map((s, i) => {
          const StepIcon = s.icon;
          const isActive = i === step;
          const isDone = i < step;
          return (
            <div
              key={s.id}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                  : isDone
                  ? 'text-cyan-300 bg-cyan-950/40 border border-cyan-500/30'
                  : 'text-slate-500'
              }`}
            >
              <StepIcon size={14} />
              <span className="hidden sm:inline">{s.label}</span>
            </div>
          );
        })}
      </div>

      {step > 0 && (
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-cyan-200 w-fit -mt-2"
        >
          <ChevronLeft size={16} /> {t(lang, 'back') || 'Back'}
        </button>
      )}

      {/* STEP 1: Department picker */}
      {currentStep === 'department' && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white tracking-wide">{t(lang, 'selectDepartment')}</h3>
            <AudioHint lang={lang} small />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {departments.filter((d) => d.id !== 'billing' && d.id !== 'pharmacy').map((dept) => {
              const Icon = deptIconMap[dept.icon] || Stethoscope;
              const isSelected = selectedDept === dept.id;
              return (
                <button
                  key={dept.id}
                  id={`dept-btn-${dept.id}`}
                  onClick={() => {
                    setSelectedDept(dept.id);
                    setStep(1);
                  }}
                  className={`flex items-center gap-3.5 p-3.5 rounded-2xl border transition-all text-left ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-950/90 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                      : 'border-cyan-500/25 bg-slate-800/70 hover:bg-slate-750 hover:border-cyan-400/60'
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner"
                    style={{ backgroundColor: dept.color + '30', border: `1px solid ${dept.color}60` }}
                  >
                    <Icon size={24} style={{ color: dept.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-bold text-white block leading-tight truncate">
                      {getDeptName(dept, lang)}
                    </span>
                    <span className="text-xs text-cyan-300/80 font-mono mt-0.5 block">
                      {t(lang, 'floor')} {dept.floor} • {t(lang, 'room')} {dept.room}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 2: Date picker */}
      {currentStep === 'date' && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white tracking-wide">{t(lang, 'selectDate')}</h3>
              <p className="text-xs text-cyan-300/80 mt-0.5">
                {selectedDeptObj ? getDeptName(selectedDeptObj, lang) : ''}
              </p>
            </div>
            <AudioHint lang={lang} small />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {dateOptions.map((d, i) => {
              const isSelected = selectedDate?.dayNum === d.dayNum;
              let badge = null;
              if (d.isToday) badge = t(lang, 'today');
              else if (d.isTomorrow) badge = t(lang, 'tomorrow');
              return (
                <button
                  key={i}
                  id={`date-btn-${i}`}
                  onClick={() => {
                    setSelectedDate(d);
                    setStep(2);
                  }}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all text-center relative ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-950/90 shadow-[0_0_20px_rgba(6,182,212,0.5)] scale-[1.02]'
                      : 'border-cyan-500/25 bg-slate-800/70 hover:bg-slate-750 hover:border-cyan-400/60'
                  }`}
                >
                  {badge && (
                    <span className="absolute top-2 right-2 text-[10px] font-bold bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 px-2 py-0.5 rounded-full font-mono">
                      {badge}
                    </span>
                  )}
                  <div className="text-2xl font-black text-white">{d.dayNum}</div>
                  <div className="text-xs font-bold text-cyan-300 mt-0.5">{d.dayLabel}</div>
                  <div className="text-[11px] text-slate-400 font-mono">{d.monthLabel}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 3: Details */}
      {currentStep === 'details' && (
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-bold text-white tracking-wide">{t(lang, 'yourDetails')}</h3>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono font-bold text-cyan-300 uppercase">
              {t(lang, 'patientName')}
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 text-cyan-400" size={18} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter patient name (e.g. Ramesh Kumar)"
                className="w-full bg-slate-950/90 border border-cyan-500/30 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 shadow-inner"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono font-bold text-cyan-300 uppercase">
              {t(lang, 'phoneNumber')}
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3.5 text-cyan-400" size={18} />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile number for SMS token"
                className="w-full bg-slate-950/90 border border-cyan-500/30 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 shadow-inner"
              />
            </div>
          </div>

          <button
            onClick={() => setStep(3)}
            disabled={!name.trim()}
            className="w-full mt-2 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-base shadow-[0_0_20px_rgba(6,182,212,0.4)] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Review & Continue →
          </button>
        </div>
      )}

      {/* STEP 4: Confirm */}
      {currentStep === 'confirm' && (
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-bold text-white tracking-wide">Review & Confirm Appointment</h3>

          <div className="p-5 rounded-2xl bg-slate-950/85 border border-cyan-500/35 flex flex-col gap-3 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
              <span className="text-xs text-slate-400">Department</span>
              <span className="text-sm font-bold text-white">
                {selectedDeptObj ? getDeptName(selectedDeptObj, lang) : '—'}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
              <span className="text-xs text-slate-400">Date & Slot</span>
              <span className="text-sm font-bold text-cyan-300">
                {selectedDate ? `${selectedDate.dayLabel}, ${selectedDate.dayNum} ${selectedDate.monthLabel}` : '—'}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
              <span className="text-xs text-slate-400">Patient Name</span>
              <span className="text-sm font-bold text-white">{name || 'Walk-in'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Mobile Number</span>
              <span className="text-sm font-mono text-cyan-300">{phone || 'Walk-in Kiosk'}</span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-base shadow-[0_0_25px_rgba(16,185,129,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle size={22} />
            Generate OPD Queue Token
          </button>
        </div>
      )}
    </div>
  );
}
