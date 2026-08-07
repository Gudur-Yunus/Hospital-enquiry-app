import { useState } from 'react';
import {
  X,
  ArrowRight,
  Check,
  Zap,
  CalendarDays,
  MapPin,
  AlertTriangle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import AudioHint from '../shared/AudioHint';
import { t } from '../../data/translations';
import { getDeptByZone, getDeptName } from '../../data/departments';
import { ZONE_CONFIG } from '../canvas/HumanBodyModel';

/**
 * ZoneTriageModal — Simple, Clean, Minimal Medical Triage
 * No jargon, no heavy subsections — just clear choices.
 */
export default function ZoneTriageModal({
  lang = 'en',
  zoneId,
  onClose,
  onInstantToken,
  onBookAppointment,
  onFindDepartment,
  onEmergency,
}) {
  const [selectedSymptom, setSelectedSymptom] = useState(null);

  if (!zoneId) return null;

  const zoneCfg = ZONE_CONFIG[zoneId] || ZONE_CONFIG.head;
  const dept = getDeptByZone(zoneId);
  const deptName = getDeptName(dept, lang);
  const doctorName = dept?.doctorOnDuty?.[lang] || dept?.doctorOnDuty?.en || 'Specialist on Duty';

  const handleInstantTokenClick = () => {
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    const enrichedDept = {
      ...dept,
      selectedSymptom: selectedSymptom ? selectedSymptom[lang] || selectedSymptom.en : null,
    };
    onInstantToken(enrichedDept);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      onClick={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }}
    >
      <div className="w-full max-w-md bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[88vh] animate-slideUp text-white">

        {/* Header */}
        <div className="p-5 pb-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
              style={{ backgroundColor: zoneCfg.color + '25', color: zoneCfg.color, border: `1.5px solid ${zoneCfg.color}50` }}
            >
              {zoneCfg.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight flex items-center gap-2">
                {deptName}
                <AudioHint lang={lang} small />
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Floor {dept.floor} · Room {dept.room} · {doctorName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">

          {/* Symptoms */}
          {dept.symptoms && dept.symptoms.length > 0 && (
            <div>
              <p className="text-xs font-medium text-slate-400 mb-2">What are you feeling?</p>
              <div className="flex flex-wrap gap-2">
                {dept.symptoms.map((sym) => {
                  const isSelected = selectedSymptom?.id === sym.id;
                  return (
                    <button
                      key={sym.id}
                      onClick={() => setSelectedSymptom(isSelected ? null : sym)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${
                        isSelected
                          ? 'bg-white text-slate-900 font-bold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                      }`}
                    >
                      <span>{sym.icon}</span>
                      <span>{sym[lang] || sym.en}</span>
                      {isSelected && <Check size={12} className="stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-2.5">
            <p className="text-xs font-medium text-slate-400 mb-1">What would you like to do?</p>

            {/* Instant Token */}
            <button
              id="modal-btn-instant-token"
              onClick={handleInstantTokenClick}
              className="w-full p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Zap size={18} className="fill-white" />
                <div className="text-left">
                  <div className="font-semibold text-sm">{t(lang, 'actionDoctorNow')}</div>
                  <div className="text-[11px] text-emerald-200">Instant OPD token · ~{dept.estimatedWaitMins || 10}m wait</div>
                </div>
              </div>
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Book Appointment */}
            <button
              id="modal-btn-book-appt"
              onClick={() => onBookAppointment(dept)}
              className="w-full p-3.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-white flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-3">
                <CalendarDays size={18} className="text-blue-400" />
                <div className="text-left">
                  <div className="font-semibold text-sm">{t(lang, 'actionBookAppt')}</div>
                  <div className="text-[11px] text-slate-400">Schedule for another date</div>
                </div>
              </div>
              <ArrowRight size={16} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Two small utility buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                id="modal-btn-find-floor"
                onClick={() => onFindDepartment(dept)}
                className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 text-xs font-medium text-slate-300 flex items-center gap-2 transition-colors"
              >
                <MapPin size={14} className="text-violet-400" />
                Directions
              </button>
              <button
                id="modal-btn-emergency"
                onClick={onEmergency}
                className="p-3 rounded-xl bg-red-950/50 hover:bg-red-950/80 border border-red-900/50 text-xs font-medium text-red-300 flex items-center gap-2 transition-colors"
              >
                <AlertTriangle size={14} className="text-red-400" />
                Emergency
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 border-t border-slate-800 text-[10px] text-slate-500 text-center">
          National Health Mission · Free Public Service
        </div>
      </div>
    </div>
  );
}
