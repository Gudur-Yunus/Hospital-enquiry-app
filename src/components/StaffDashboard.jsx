import { useState } from 'react';
import { LayoutDashboard, ArrowRight } from 'lucide-react';
import { getEnquiries, updateEnquiryStatus } from '../utils/storage';
import { getDeptById } from '../data/departments';

const STATUS_ORDER = ['received', 'in_progress', 'resolved'];
const NEXT_STATUS = { received: 'in_progress', in_progress: 'resolved' };
const STATUS_LABELS = {
  received: 'Received',
  in_progress: 'In Progress',
  resolved: 'Resolved',
};
const STATUS_COLORS = {
  received: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
  in_progress: 'bg-blue-500/20 text-blue-300 border-blue-400/40',
  resolved: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
};
const CAT_COLORS = {
  appointment: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
  department: 'bg-violet-500/20 text-violet-300 border-violet-400/30',
  billing: 'bg-teal-500/20 text-teal-300 border-teal-400/30',
  emergency: 'bg-red-500/20 text-red-300 border-red-400/30',
};

export default function StaffDashboard({ onBack }) {
  const [filter, setFilter] = useState('all');
  const [enquiries, setEnquiries] = useState(() => getEnquiries());

  const filtered = enquiries
    .filter((e) => filter === 'all' || e.status === filter)
    .sort((a, b) => b.createdAt - a.createdAt);

  const advance = (id) => {
    const enquiry = enquiries.find((e) => e.id === id);
    if (!enquiry) return;
    const next = NEXT_STATUS[enquiry.status];
    if (!next) return;
    const updated = updateEnquiryStatus(id, next);
    setEnquiries(updated);
  };

  const fmtTime = (ts) => {
    const d = new Date(ts);
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <div className="flex flex-col gap-4 text-white">
      {/* Filter tabs */}
      <div className="flex bg-slate-950/80 p-1.5 rounded-2xl border border-cyan-500/20 gap-2">
        {['all', 'received', 'in_progress', 'resolved'].map((f) => (
          <button
            key={f}
            id={`filter-tab-${f}`}
            onClick={() => setFilter(f)}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold capitalize rounded-xl transition-all ${
              filter === f
                ? 'bg-cyan-500/30 text-white border border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {f === 'all' ? 'All' : STATUS_LABELS[f]}
            <span className="ml-1.5 text-[11px] bg-slate-800 text-cyan-300 rounded-full px-1.5 py-0.2">
              {enquiries.filter((e) => f === 'all' || e.status === f).length}
            </span>
          </button>
        ))}
      </div>

      {/* Enquiry list */}
      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-500">
            <LayoutDashboard size={40} strokeWidth={1.5} />
            <p className="mt-2 text-sm font-semibold">No enquiries found.</p>
          </div>
        ) : (
          filtered.map((enquiry) => {
            const dept = getDeptById(enquiry.department);
            const canAdvance = !!NEXT_STATUS[enquiry.status];
            return (
              <div
                key={enquiry.id}
                id={`enquiry-card-${enquiry.id}`}
                className="bg-slate-950/70 rounded-2xl border border-cyan-500/20 p-4 shadow-sm"
              >
                <div className="flex items-start justify-between mb-2.5 gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-mono font-black text-cyan-300">{enquiry.id}</span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${STATUS_COLORS[enquiry.status]}`}>
                        {STATUS_LABELS[enquiry.status]}
                      </span>
                    </div>
                    {enquiry.patientName && enquiry.patientName !== '—' && (
                      <p className="text-xs font-semibold text-slate-200 mt-0.5">{enquiry.patientName}</p>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 whitespace-nowrap">{fmtTime(enquiry.createdAt)}</span>
                </div>

                <div className="flex items-center gap-2 flex-wrap mb-2.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${CAT_COLORS[enquiry.category] || 'bg-slate-800 text-slate-400'}`}>
                    {enquiry.category}
                  </span>
                  {dept && (
                    <span className="text-xs text-slate-400">{dept.nameEn}</span>
                  )}
                  {enquiry.phoneNumber && enquiry.phoneNumber !== '—' && (
                    <span className="text-xs font-mono text-cyan-400/80">📞 {enquiry.phoneNumber}</span>
                  )}
                </div>

                {enquiry.description && (
                  <p className="text-xs text-slate-400 italic mb-3">{enquiry.description}</p>
                )}

                {canAdvance && (
                  <button
                    id={`advance-btn-${enquiry.id}`}
                    onClick={() => advance(enquiry.id)}
                    className="w-full py-2.5 rounded-xl bg-cyan-600/80 hover:bg-cyan-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all"
                  >
                    <ArrowRight size={14} />
                    Advance → {STATUS_LABELS[NEXT_STATUS[enquiry.status]]}
                  </button>
                )}
                {!canAdvance && (
                  <div className="w-full py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold text-center">
                    ✓ Resolved
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
