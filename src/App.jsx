import { useReducer, useEffect, useState } from 'react';
import './index.css';

import {
  CalendarDays,
  MapPin,
  Receipt,
  AlertTriangle,
  Search,
  LayoutDashboard,
  Globe,
} from 'lucide-react';

import SymptomScene from './components/canvas/SymptomScene';
import Home from './components/Home';
import AppointmentFlow from './components/AppointmentFlow';
import DepartmentFlow from './components/DepartmentFlow';
import BillingFlow from './components/BillingFlow';
import EmergencyScreen from './components/EmergencyScreen';
import ConfirmationScreen from './components/ConfirmationScreen';
import TrackEnquiry from './components/TrackEnquiry';
import StaffDashboard from './components/StaffDashboard';
import LanguageSelector from './components/LanguageSelector';
import ZoneTriageModal from './components/triage/ZoneTriageModal';
import GlassModal from './components/shared/GlassModal';
import { seedDemoData } from './data/seedData';
import { saveEnquiry } from './utils/storage';
import { generateToken } from './utils/tokenGenerator';

// ── View state machine ──────────────────────────────────────────────────────
const VIEWS = {
  HOME: 'home',
  LANGUAGE: 'language',
  APPOINTMENT: 'appointment',
  DEPARTMENT: 'department',
  BILLING: 'billing',
  EMERGENCY: 'emergency',
  CONFIRMATION: 'confirmation',
  TRACK: 'track',
  STAFF: 'staff',
};

const initialState = {
  view: VIEWS.HOME,
  lang: 'en',
  currentEnquiry: null,
  trackPrefill: '',
  initialDept: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_LANG':
      return { ...state, lang: action.lang, view: VIEWS.HOME };
    case 'CHANGE_LANG':
      return { ...state, view: VIEWS.LANGUAGE };
    case 'GO_HOME':
      return { ...state, view: VIEWS.HOME, currentEnquiry: null, initialDept: null };
    case 'GO_CATEGORY':
      return { ...state, view: action.category, initialDept: action.dept || null };
    case 'GO_EMERGENCY':
      return { ...state, view: VIEWS.EMERGENCY };
    case 'ENQUIRY_DONE':
      return { ...state, view: VIEWS.CONFIRMATION, currentEnquiry: action.enquiry };
    case 'GO_TRACK':
      return { ...state, view: VIEWS.TRACK, trackPrefill: action.prefill ?? '' };
    case 'GO_STAFF':
      return { ...state, view: VIEWS.STAFF };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { view, lang, currentEnquiry, trackPrefill, initialDept } = state;
  const [selectedZone, setSelectedZone] = useState(null);
  const [hoveredZone, setHoveredZone] = useState(null);
  const [triageZone, setTriageZone] = useState(null);

  // Seed demo data once on first load
  useEffect(() => {
    seedDemoData();
  }, []);

  const handleZoneSelect = (zoneId) => {
    setSelectedZone(zoneId);
    setTriageZone(zoneId);
  };

  const handleCloseTriage = () => {
    setTriageZone(null);
    setSelectedZone(null);
  };

  const handleInstantToken = (dept) => {
    const { id, tokenNumber } = generateToken();
    const enquiry = {
      id,
      tokenNumber,
      patientName: 'Walk-in Patient',
      phoneNumber: '9999999999',
      preferredLanguage: lang,
      category: 'appointment',
      department: dept?.id || 'general',
      description: `Instant OPD Queue token for ${dept?.nameEn || 'General OPD'}`,
      status: 'received',
      createdAt: Date.now(),
    };
    saveEnquiry(enquiry);
    setTriageZone(null);
    setSelectedZone(null);
    dispatch({ type: 'ENQUIRY_DONE', enquiry });
  };

  return (
    <div lang={lang} className="min-h-screen w-full bg-[#020617] text-white flex flex-col relative overflow-hidden isolate">
      
      {/* ── 3D Full-Screen Hologram Canvas (Right-Biased) ─────────────── */}
      <SymptomScene
        selectedZone={selectedZone}
        hoveredZone={hoveredZone}
        onSelectZone={handleZoneSelect}
        onHoverZone={setHoveredZone}
      />

      {/* ── Floating Master UI Overlay (Left-Biased) ───────────────────── */}
      <Home
        lang={lang}
        selectedZone={selectedZone}
        onZoneSelect={handleZoneSelect}
        onCategory={(cat) => {
          if (cat === 'emergency') dispatch({ type: 'GO_EMERGENCY' });
          else dispatch({ type: 'GO_CATEGORY', category: cat });
        }}
        onTrack={() => dispatch({ type: 'GO_TRACK', prefill: '' })}
        onStaff={() => dispatch({ type: 'GO_STAFF' })}
        onChangeLang={() => dispatch({ type: 'CHANGE_LANG' })}
      />

      {/* ── Interactive Zone Triage Modal (Upon Clicking Mannequin/Pill) ─ */}
      {triageZone && (
        <ZoneTriageModal
          lang={lang}
          zoneId={triageZone}
          onClose={handleCloseTriage}
          onInstantToken={handleInstantToken}
          onBookAppointment={(dept) => {
            handleCloseTriage();
            dispatch({ type: 'GO_CATEGORY', category: 'appointment', dept });
          }}
          onFindDepartment={(dept) => {
            handleCloseTriage();
            dispatch({ type: 'GO_CATEGORY', category: 'department', dept });
          }}
          onEmergency={() => {
            handleCloseTriage();
            dispatch({ type: 'GO_EMERGENCY' });
          }}
        />
      )}

      {/* ── Unified Glassmorphic Modals for Application Sections ───────── */}
      
      {/* 1. Language Selector Modal */}
      {view === VIEWS.LANGUAGE && (
        <GlassModal
          isOpen={true}
          onClose={() => dispatch({ type: 'GO_HOME' })}
          title="Select Language / भाषा चुनें / భాష మార్చండి"
          icon={Globe}
          maxWidth="max-w-lg"
        >
          <LanguageSelector
            onSelect={(l) => dispatch({ type: 'SET_LANG', lang: l })}
            onBack={() => dispatch({ type: 'GO_HOME' })}
          />
        </GlassModal>
      )}

      {/* 2. Book Appointment Modal */}
      {view === VIEWS.APPOINTMENT && (
        <GlassModal
          isOpen={true}
          onClose={() => dispatch({ type: 'GO_HOME' })}
          title="Book Specialist Appointment"
          icon={CalendarDays}
          maxWidth="max-w-2xl"
        >
          <AppointmentFlow
            lang={lang}
            initialDept={initialDept}
            onDone={(enquiry) => dispatch({ type: 'ENQUIRY_DONE', enquiry })}
            onBack={() => dispatch({ type: 'GO_HOME' })}
          />
        </GlassModal>
      )}

      {/* 3. Find Department Modal */}
      {view === VIEWS.DEPARTMENT && (
        <GlassModal
          isOpen={true}
          onClose={() => dispatch({ type: 'GO_HOME' })}
          title="Hospital Floor Navigation & Rooms"
          icon={MapPin}
          maxWidth="max-w-2xl"
        >
          <DepartmentFlow
            lang={lang}
            onBack={() => dispatch({ type: 'GO_HOME' })}
          />
        </GlassModal>
      )}

      {/* 4. Billing Help Modal */}
      {view === VIEWS.BILLING && (
        <GlassModal
          isOpen={true}
          onClose={() => dispatch({ type: 'GO_HOME' })}
          title="Billing & Ayushman Bharat Help"
          icon={Receipt}
          maxWidth="max-w-2xl"
        >
          <BillingFlow
            lang={lang}
            onDone={(enquiry) => dispatch({ type: 'ENQUIRY_DONE', enquiry })}
            onBack={() => dispatch({ type: 'GO_HOME' })}
          />
        </GlassModal>
      )}

      {/* 5. Emergency Screen Modal */}
      {view === VIEWS.EMERGENCY && (
        <GlassModal
          isOpen={true}
          onClose={() => dispatch({ type: 'GO_HOME' })}
          title="EMERGENCY FAST-TRACK TRIAGE"
          icon={AlertTriangle}
          maxWidth="max-w-xl"
        >
          <EmergencyScreen
            lang={lang}
            onDone={(enquiry) => dispatch({ type: 'ENQUIRY_DONE', enquiry })}
            onBack={() => dispatch({ type: 'GO_HOME' })}
          />
        </GlassModal>
      )}

      {/* 6. Confirmation Slip Modal */}
      {view === VIEWS.CONFIRMATION && currentEnquiry && (
        <GlassModal
          isOpen={true}
          onClose={() => dispatch({ type: 'GO_HOME' })}
          title="OPD Queue Token Confirmation"
          icon={CalendarDays}
          maxWidth="max-w-md"
        >
          <ConfirmationScreen
            enquiry={currentEnquiry}
            lang={lang}
            onTrack={(enq) => dispatch({ type: 'GO_TRACK', prefill: enq.tokenNumber })}
            onHome={() => dispatch({ type: 'GO_HOME' })}
          />
        </GlassModal>
      )}

      {/* 7. Track Enquiry Modal */}
      {view === VIEWS.TRACK && (
        <GlassModal
          isOpen={true}
          onClose={() => dispatch({ type: 'GO_HOME' })}
          title="Track Live OPD Token"
          icon={Search}
          maxWidth="max-w-lg"
        >
          <TrackEnquiry
            lang={lang}
            prefillToken={trackPrefill}
            onBack={() => dispatch({ type: 'GO_HOME' })}
          />
        </GlassModal>
      )}

      {/* 8. Staff Dashboard Modal */}
      {view === VIEWS.STAFF && (
        <GlassModal
          isOpen={true}
          onClose={() => dispatch({ type: 'GO_HOME' })}
          title="Hospital Staff OPD Queue & Triage"
          icon={LayoutDashboard}
          maxWidth="max-w-4xl"
        >
          <StaffDashboard
            onBack={() => dispatch({ type: 'GO_HOME' })}
          />
        </GlassModal>
      )}
    </div>
  );
}
