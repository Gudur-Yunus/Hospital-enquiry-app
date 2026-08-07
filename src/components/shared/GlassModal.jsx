import { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Unified Glassmorphic Modal Component
 * - z-index: 50
 * - Centered on screen
 * - bg-black/60 backdrop-blur-md full-screen overlay
 * - Accessible "Close (X)" button
 * - Keyboard Escape listener
 */
export default function GlassModal({
  isOpen = true,
  onClose,
  title,
  icon: Icon,
  maxWidth = 'max-w-2xl',
  children,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) {
          onClose();
        }
      }}
    >
      <div
        className={`relative w-full ${maxWidth} bg-slate-900/95 backdrop-blur-2xl border border-cyan-500/40 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.25)] flex flex-col max-h-[90vh] overflow-hidden animate-slideUp text-white`}
      >
        {/* Header with Title and Close (X) Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-slate-950/60">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                <Icon size={22} />
              </div>
            )}
            {title && (
              <h3 className="text-lg font-bold text-white tracking-wide">
                {title}
              </h3>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white bg-slate-800/80 hover:bg-cyan-950 border border-slate-700 hover:border-cyan-400 active:scale-95 transition-all shadow-sm"
            aria-label="Close Modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
