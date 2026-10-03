import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface FooterProps {
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const scrollTo = (id: string) => {
    sounds.playClick();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#090812] text-white py-6 border-t border-purple-950/60 font-mono text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Brand & Copyright */}
        <div className="flex items-center gap-2 text-slate-400">
          <div className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-xs font-bold text-white flex items-center">
            <span className="text-rose-500">&lt;</span>
            <span className="text-purple-400">M</span>
            <span className="text-rose-500">/&gt;</span>
          </div>
          <span>&copy; 2026 Mary. Zero busywork.</span>
        </div>

        {/* Right: Quick Links */}
        <div className="flex flex-wrap items-center gap-5 text-slate-400">
          <button
            onClick={() => {
              sounds.playCoin();
              onOpenResume();
            }}
            className="text-slate-200 hover:text-white flex items-center gap-1 font-semibold transition-colors cursor-pointer"
          >
            <span>Resume PDF</span>
            <ArrowUpRight className="w-3 h-3 text-rose-400" />
          </button>
          <button
            onClick={() => scrollTo('work')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Work
          </button>
          <button
            onClick={() => scrollTo('workflows')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Workflows
          </button>
          <button
            onClick={() => scrollTo('game')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Game
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </button>
        </div>

      </div>
    </footer>
  );
};
