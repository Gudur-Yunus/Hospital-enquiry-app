import { AlertTriangle } from 'lucide-react';

export default function FloatingEmergencyButton({ onClick }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 pointer-events-auto">
      {/* Subtle pulse outer glow ring */}
      <div className="relative">
        <span className="absolute -inset-1.5 rounded-full bg-red-500/40 animate-ping pointer-events-none opacity-75" />
        <button
          id="floating-emergency-btn"
          onClick={onClick}
          className="relative w-15 h-15 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white flex items-center justify-center shadow-[0_0_25px_rgba(239,68,68,0.5)] border-2 border-red-300/40 active:scale-95 transition-all hover:scale-105"
          aria-label="Emergency Help"
          title="Emergency Help"
        >
          <AlertTriangle size={28} strokeWidth={2.4} className="text-white drop-shadow" />
        </button>
      </div>
    </div>
  );
}
