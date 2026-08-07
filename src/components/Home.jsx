import { Globe, AlertTriangle, LayoutDashboard, Activity, CalendarDays, MapPin, Receipt, Search } from 'lucide-react';
import { t } from '../data/translations';
import AudioHint from './shared/AudioHint';
import PretextLabel from './shared/PretextLabel';
import PretextMenuCard from './shared/PretextMenuCard';

const ZONES = [
  { id: 'head', labelKey: 'zoneHead', color: '#06B6D4' },
  { id: 'chest', labelKey: 'zoneChest', color: '#F43F5E' },
  { id: 'stomach', labelKey: 'zoneStomach', color: '#F59E0B' },
  { id: 'limbs', labelKey: 'zoneLimbs', color: '#10B981' },
];

export default function Home({
  lang,
  onChangeLang,
  onCategory,
  onTrack,
  onStaff,
  onZoneSelect,
  selectedZone,
}) {
  const langLabels = { en: 'English', hi: 'हिन्दी', te: 'తెలుగు' };

  return (
    <main className="absolute inset-0 z-10 flex flex-col justify-between w-full h-full pointer-events-none p-6 md:p-10 overflow-hidden">
      {/* ── Top Header ─────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between w-full">
        {/* Brand */}
        <div className="pointer-events-auto flex items-center gap-3 bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl px-4 py-2.5 shadow-lg">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Activity size={20} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white tracking-tight">Arogya Desk</h1>
              <span className="text-[10px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-1.5 py-0.2 rounded">
                3D Kiosk
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Visual Hospital Triage & Navigation</p>
          </div>
        </div>

        {/* Top-Right Language & Audio */}
        <div className="pointer-events-auto flex items-center gap-2.5">
          <AudioHint lang={lang} />
          <button
            id="open-lang-btn"
            onClick={onChangeLang}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 backdrop-blur-xl border border-slate-800 hover:border-slate-700 text-white text-xs font-semibold shadow-md transition-all active:scale-95"
            aria-label="Change Language"
          >
            <Globe size={15} className="text-cyan-400" />
            <span>{langLabels[lang] || 'English'}</span>
          </button>
        </div>
      </header>

      {/* ── Center Area: Right-Side Menu ──────────────────────────────── */}
      <div className="w-full flex items-center justify-end my-auto pointer-events-none">
        <div className="flex flex-col gap-3.5 w-full max-w-sm ml-auto pointer-events-none">
          
          {/* Welcome & Prompt Card */}
          <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-5 shadow-xl flex flex-col gap-1.5">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg px-2.5 py-1 w-fit">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <PretextLabel
                text={t(lang, 'tapBodyZonePrompt')}
                lang={lang}
                fontSize={11}
                fontWeight={600}
                color="#67E8F9"
                maxWidth={300}
                lineHeight={16}
                align="left"
              />
            </div>

            <h2 className="text-2xl font-bold text-white leading-tight mt-1">
              {t(lang, 'welcome')}
            </h2>
            <div className="text-xs text-slate-400 font-normal leading-relaxed">
              {t(lang, 'welcomeSub')}
            </div>
          </div>

          {/* Menu Cards */}
          <div className="flex flex-col gap-2.5">
            <PretextMenuCard
              id="card-appointment"
              icon={CalendarDays}
              iconBg="bg-blue-500/15 text-blue-400 border-blue-500/30"
              title={t(lang, 'bookAppointment')}
              subtitle={t(lang, 'actionBookApptSub')}
              lang={lang}
              badge="1-Tap OPD"
              onClick={() => onCategory('appointment')}
              maxWidth={380}
            />

            <PretextMenuCard
              id="card-department"
              icon={MapPin}
              iconBg="bg-violet-500/15 text-violet-400 border-violet-500/30"
              title={t(lang, 'findDepartment')}
              subtitle={t(lang, 'actionFindFloorSub')}
              lang={lang}
              onClick={() => onCategory('department')}
              maxWidth={380}
            />

            <PretextMenuCard
              id="card-billing"
              icon={Receipt}
              iconBg="bg-teal-500/15 text-teal-400 border-teal-500/30"
              title={t(lang, 'billingHelp')}
              subtitle="Ayushman Bharat PM-JAY & Cash Desk"
              lang={lang}
              badge="Cashless"
              onClick={() => onCategory('billing')}
              maxWidth={380}
            />

            <PretextMenuCard
              id="card-track"
              icon={Search}
              iconBg="bg-cyan-500/15 text-cyan-400 border-cyan-500/30"
              title={t(lang, 'trackTitle')}
              subtitle="Check real-time OPD token status"
              lang={lang}
              onClick={onTrack}
              maxWidth={380}
            />

            {/* Staff Dashboard Trigger */}
            <button
              id="staff-dashboard-btn"
              onClick={onStaff}
              className="pointer-events-auto w-full py-2.5 px-4 rounded-2xl bg-slate-900/70 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-cyan-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
            >
              <LayoutDashboard size={14} />
              <span>Staff OPD Queue Dashboard</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar: Clean Minimalist Anatomical Tabs ──────────────── */}
      <footer className="w-full flex items-end justify-between gap-4 mt-auto">
        <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-1.5 flex items-center gap-1.5 shadow-lg overflow-x-auto max-w-[70vw]">
          {ZONES.map((z) => {
            const isSelected = selectedZone === z.id;
            return (
              <button
                key={z.id}
                id={`zone-pill-${z.id}`}
                onClick={() => onZoneSelect(z.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap active:scale-95 ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/50'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: z.color }}
                />
                <span>{t(lang, z.labelKey)}</span>
              </button>
            );
          })}
        </div>

        {/* Emergency SOS Button */}
        <div className="pointer-events-auto flex-shrink-0">
          <button
            id="emergency-btn"
            onClick={() => onCategory('emergency')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md border border-red-500 active:scale-95 transition-all"
            aria-label="Emergency SOS Fast-Track"
          >
            <AlertTriangle size={16} />
            <span className="hidden sm:inline uppercase tracking-wider">
              {t(lang, 'emergencyHelp')}
            </span>
          </button>
        </div>
      </footer>
    </main>
  );
}
