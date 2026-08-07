import { useState } from 'react';
import { ChevronLeft, MapPin, ArrowUp, ArrowDown, Navigation, Compass, PhoneCall } from 'lucide-react';
import {
  Stethoscope, Heart, Bone, Baby, Receipt, Pill, Activity,
} from 'lucide-react';
import { t } from '../data/translations';
import { departments, getDeptName } from '../data/departments';
import AudioHint from './shared/AudioHint';

const deptIconMap = { Stethoscope, Heart, Bone, Baby, Receipt, Pill, Activity };

export default function DepartmentFlow({ lang, onBack }) {
  const [selectedDept, setSelectedDept] = useState(null);

  const dept = departments.find((d) => d.id === selectedDept);
  const Icon = dept ? (deptIconMap[dept.icon] || Stethoscope) : null;

  return (
    <div className="flex flex-col gap-4 text-white">
      {!selectedDept ? (
        <>
          <div className="flex items-center justify-between">
            <p className="text-cyan-200/80 text-xs sm:text-sm font-medium">
              {lang === 'hi' ? 'अस्पताल के कमरे और मंज़िल का रास्ता देखने के लिए विभाग चुनें' : lang === 'te' ? 'దిశలను చూడటానికి విభాగాన్ని ఎంచుకోండి' : 'Select a department to view floor navigation & directions'}
            </p>
            <AudioHint lang={lang} small />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {departments.map((d) => {
              const DeptIcon = deptIconMap[d.icon] || Stethoscope;
              return (
                <button
                  key={d.id}
                  id={`find-dept-btn-${d.id}`}
                  onClick={() => setSelectedDept(d.id)}
                  className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-cyan-500/25 bg-slate-800/70 hover:bg-slate-750 hover:border-cyan-400/60 transition-all duration-150 group text-center shadow-md active:scale-95"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-inner"
                    style={{ backgroundColor: d.color + '25', border: `1px solid ${d.color}60` }}
                  >
                    <DeptIcon size={26} style={{ color: d.color }} />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block leading-tight">
                      {getDeptName(d, lang)}
                    </span>
                    <span className="text-xs text-cyan-300/80 font-mono mt-1 block">
                      {t(lang, 'floor')} {d.floor} • {t(lang, 'room')} {d.room}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-4 animate-slideUp">
          <button
            onClick={() => setSelectedDept(null)}
            className="flex items-center gap-2 text-xs font-bold text-cyan-300 hover:text-cyan-200 w-fit"
          >
            <ChevronLeft size={16} /> {lang === 'hi' ? 'सभी विभाग' : lang === 'te' ? 'అన్ని విభాగాలు' : 'All Departments'}
          </button>

          {/* Department Main Highlight Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-cyan-500/40 flex items-center justify-between shadow-[0_0_30px_rgba(6,182,212,0.2)]">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg border border-white/20"
                style={{ backgroundColor: dept.color + '30' }}
              >
                {Icon && <Icon size={34} style={{ color: dept.color }} />}
              </div>
              <div>
                <div className="text-lg sm:text-xl font-black text-white">{getDeptName(dept, lang)}</div>
                <div className="text-xs sm:text-sm font-mono text-cyan-300 mt-0.5">
                  {t(lang, 'floor')} {dept.floor} • {t(lang, 'room')} {dept.room}
                </div>
              </div>
            </div>
            <div className="hidden sm:flex px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-mono text-xs font-bold items-center gap-1.5">
              <Compass size={16} />
              <span>Wing {dept.floor === 0 ? 'Lobby' : dept.floor === 1 ? 'A' : 'B'}</span>
            </div>
          </div>

          {/* Visual Step-by-Step Wayfinding Guidance */}
          <div className="p-5 rounded-2xl bg-slate-950/85 border border-cyan-500/30 flex items-start gap-4 shadow-inner">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 flex-shrink-0">
              {dept.floor === 0 ? (
                <span className="text-lg font-black font-mono">GF</span>
              ) : dept.floor > 1 ? (
                <ArrowUp size={24} />
              ) : (
                <Navigation size={24} />
              )}
            </div>
            <div className="flex-1">
              <div className="text-xs font-mono font-bold text-cyan-400 uppercase">
                {lang === 'hi' ? 'रास्ता और दिशा निर्देश' : lang === 'te' ? 'మార్గదర్శకత్వం' : 'Step-by-Step Directions'}
              </div>
              <div className="text-sm sm:text-base font-bold text-white mt-1">
                {dept.direction?.[lang] || dept.direction?.en || 'Take Main Elevator to your department floor.'}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'hi' ? 'फर्श पर रंगीन गाइड लाइनों का पालन करें या किसी भी स्वयंसेवक से पूछें।' : 'Follow the floor color lines or ask hospital guide volunteers.'}
              </p>
            </div>
          </div>

          {/* Doctor On Duty Card */}
          {dept.doctorOnDuty && (
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5 text-slate-200">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold">{dept.doctorOnDuty[lang] || dept.doctorOnDuty.en}</span>
              </div>
              <span className="text-cyan-300 font-mono font-bold">~{dept.estimatedWaitMins || 10}m avg wait</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
