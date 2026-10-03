import React, { useState } from 'react';
import { Volume2, VolumeX, ArrowUpRight } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface NavbarProps {
  onOpenResume: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenResume,
  soundEnabled,
  onToggleSound,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    sounds.playClick();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#faf8f5]/90 border-b border-[#ebdcca]/60 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1.5 group cursor-pointer text-left"
          title="Return to top"
        >
          <div className="px-2.5 py-1 rounded-lg bg-white border border-[#e4d7c6] shadow-xs group-hover:border-rose-400 transition-colors flex items-center font-mono text-sm font-extrabold tracking-tight">
            <span className="text-[#f04e38]">&lt;</span>
            <span className="text-[#6d28d9]">M</span>
            <span className="text-[#f04e38]">/&gt;</span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs font-semibold tracking-wider text-slate-600">
          <button
            onClick={() => scrollTo('work')}
            className="hover:text-slate-900 transition-colors uppercase cursor-pointer"
          >
            WORK
          </button>
          <button
            onClick={() => scrollTo('workflows')}
            className="hover:text-slate-900 transition-colors uppercase cursor-pointer"
          >
            WORKFLOWS
          </button>
          <button
            onClick={() => scrollTo('game')}
            className="hover:text-slate-900 transition-colors uppercase flex items-center gap-1 cursor-pointer"
          >
            GAME <span>🎮</span>
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="hover:text-slate-900 transition-colors uppercase cursor-pointer"
          >
            CONTACT
          </button>
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sounds.playPowerUp();
              onOpenResume();
            }}
            className="bg-[#eb3e35] hover:bg-[#d83229] active:scale-95 text-white font-medium text-xs px-3.5 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <span>Resume PDF</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            title={soundEnabled ? 'Sound is ON' : 'Sound is OFF'}
            className="w-8 h-8 rounded-md bg-white border border-[#e4d7c6] hover:border-slate-400 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors cursor-pointer shadow-2xs"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded text-slate-600 hover:text-slate-900"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 border-b border-slate-200 px-4 py-4 space-y-3 font-mono text-sm">
          <button
            onClick={() => scrollTo('work')}
            className="block w-full text-left py-1 text-slate-700 hover:text-rose-600 font-medium"
          >
            WORK
          </button>
          <button
            onClick={() => scrollTo('workflows')}
            className="block w-full text-left py-1 text-slate-700 hover:text-rose-600 font-medium"
          >
            WORKFLOWS
          </button>
          <button
            onClick={() => scrollTo('game')}
            className="block w-full text-left py-1 text-slate-700 hover:text-rose-600 font-medium"
          >
            GAME 🎮
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="block w-full text-left py-1 text-slate-700 hover:text-rose-600 font-medium"
          >
            CONTACT
          </button>
        </div>
      )}
    </header>
  );
};
