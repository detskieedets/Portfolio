Here is your complete, updated `HeroSection.tsx` code.

### Key updates applied:

1. **Dynamic Animated Header**: The terminal/typewriter now loops through your exact phrases (`I build [ real-time edge AI ]`, `I train [ adaptive reinforcement models ]`, `I optimize [ vision pipelines for real hardware ]`).
2. **Fixed Static Photo**: Points directly to `/profile.png` (with clean fallback handling) instead of depending on dynamic Context or external Unsplash placeholders.
3. **Aligned Copy & Metadata**: Added your executive leadership callout ("Second-in-Command: Bridging engineering with cross-functional ops"), updated location to Cebu City, and locked in your Cisco/Power Automate stack tags.

```tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Zap,
  Gamepad2,
  FileText,
  Radio,
  Globe,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  CheckCircle2,
  Camera,
  Layers,
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface HeroSectionProps {
  onOpenResume: () => void;
  onScrollTo: (id: string) => void;
  onOpenChangePhoto?: () => void;
}

const rotatingRoles = [
  'I build [ real-time edge AI ]',
  'I train [ adaptive reinforcement models ]',
  'I optimize [ vision pipelines for real hardware ]',
  'I engineer [ self-healing automation workflows ]',
];

const liveStacks = [
  { icon: Globe, name: 'Cisco Routing & Architecture', tag: 'Core Network' },
  { icon: Zap, name: 'Power Automate & SharePoint', tag: 'Automation' },
  { icon: Radio, name: 'Zapier, REST APIs & Webhooks', tag: 'Integrations' },
  { icon: Sparkles, name: 'Python Computer Vision & ML', tag: 'AI/ML' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenResume,
  onScrollTo,
  onOpenChangePhoto,
}) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [stackIndex, setStackIndex] = useState(0);

  // Typewriter effect for Dynamic Header
  useEffect(() => {
    const fullText = rotatingRoles[roleIndex];
    const typingSpeed = isDeleting ? 30 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < fullText.length) {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(fullText.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % rotatingRoles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const handleNextStack = () => {
    sounds.playClick();
    setStackIndex((prev) => (prev + 1) % liveStacks.length);
  };

  const handlePrevStack = () => {
    sounds.playClick();
    setStackIndex((prev) => (prev - 1 + liveStacks.length) % liveStacks.length);
  };

  const currentStack = liveStacks[stackIndex];
  const CurrentStackIcon = currentStack.icon;

  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Dynamic Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Pill & Second-in-Command Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f4ece0]/80 border border-[#e5d5be] text-xs font-mono font-medium text-emerald-800 shadow-2xs">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <div className="leading-tight">
                  <span className="font-bold tracking-wider text-[11px] text-slate-800">OPEN FOR 2026</span>
                  <span className="text-slate-500 font-normal"> · AUTOMATION &amp; EDGE AI</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-medium text-blue-700">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>Second-in-Command Operations</span>
              </div>
            </div>

            {/* Main Dynamic Greeting Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-[#fb5607] via-[#ea580c] to-[#007fff] bg-clip-text text-transparent">
                  Mary
                </span>
                <span className="text-[#007fff]">.</span>
              </h1>
              
              {/* Dynamic Animated Subtitle / Typewriter */}
              <div className="mt-3 flex items-center min-h-[38px] text-xl sm:text-2xl lg:text-3xl font-mono font-bold text-slate-800 tracking-tight">
                <span className="text-[#fb5607]">{displayText}</span>
                <span className="inline-block w-2.5 h-6 ml-1 bg-[#fb5607] animate-pulse"></span>
              </div>
            </div>

            {/* Leadership & Translation Statement */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              Electronics Engineer bridging the gap between deep technical systems (Edge AI, computer vision, network hardening) and seamless cross-functional team operations.
            </p>

            {/* Live Stack Interactive Pill */}
            <div className="inline-flex items-center gap-2 p-1.5 pr-2.5 rounded-full bg-slate-950 text-white shadow-md text-xs font-mono">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 text-amber-300 font-semibold text-[11px]">
                <Radio className="w-3 h-3 text-red-400 animate-pulse" />
                <span>Live Stack</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-200 font-medium px-1">
                <CurrentStackIcon className="w-3.5 h-3.5 text-sky-400" />
                <span>{currentStack.name}</span>
              </div>
              <div className="flex items-center gap-1 ml-1 text-slate-400">
                <button
                  onClick={handlePrevStack}
                  className="hover:text-white p-0.5 rounded hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Previous stack item"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleNextStack}
                  className="hover:text-white p-0.5 rounded hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Next stack item"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Call To Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  sounds.playPowerUp();
                  onScrollTo('workflows');
                }}
                className="bg-[#fb5607] hover:bg-[#ea580c] active:scale-95 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Inspect Workflows</span>
                <Zap className="w-4 h-4 fill-white" />
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onScrollTo('game');
                }}
                className="bg-white hover:bg-blue-50 active:scale-95 border-2 border-[#007fff] text-[#007fff] font-semibold text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Play Signal Router</span>
                <Gamepad2 className="w-4 h-4 text-[#007fff]" />
              </button>

              <button
                onClick={() => {
                  sounds.playCoin();
                  onOpenResume();
                }}
                className="bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-slate-300" />
                <span>Resume PDF</span>
              </button>
            </div>

          </div>

          {/* Right Column: Mary's Profile Window Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-2xl bg-[#fffefc] border-2 border-[#f3d9a2] shadow-[0_12px_36px_rgba(251,86,7,0.12)] p-4 sm:p-5 transition-transform hover:-translate-y-1 duration-300">
              
              {/* Window Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#ebd7be]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-700 tracking-tight ml-1">
                    &lt;M/&gt; mary.sys
                  </span>
                </div>
                
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-mono font-medium text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>2026 Verified</span>
                  <Zap className="w-3 h-3 text-emerald-600" />
                </div>
              </div>

              {/* Portrait Frame */}
              <div className="relative rounded-xl overflow-hidden border border-[#edd7be] bg-gradient-to-b from-amber-50/50 to-orange-50/30 p-2">
                
                {/* 100% Reliable Ribbon */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#fb5607] text-white text-[10px] font-bold tracking-wide shadow-sm">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                    <span>100% Reliable</span>
                  </div>
                </div>

                {/* Photo Container */}
                <div
                  onClick={() => onOpenChangePhoto && onOpenChangePhoto()}
                  className="relative rounded-lg overflow-hidden bg-slate-100 aspect-square flex items-center justify-center group"
                >
                  <img
                    src="/profile.png"
                    alt="Mary Bernadette Elusorio - Automation and Workflow Engineer"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedFallback) {
                        target.dataset.triedFallback = 'true';
                        target.src = '/profile.png';
                      }
                    }}
                  />

                  {/* Fallback Initial badge in case no image is found */}
                  <div className="absolute inset-0 -z-10 flex items-center justify-center bg-slate-200 font-mono text-4xl font-extrabold text-slate-500">
                    MB
                  </div>

                  {/* Zero Busywork badge at bottom */}
                  <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-sm border border-amber-200 text-[10px] font-mono font-semibold text-slate-800 shadow-sm">
                      <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>Zero Revenue Leakage</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio & Details Footer */}
              <div className="pt-4 text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 justify-center">
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    Mary Bernadette Elusorio
                  </h2>
                  <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500 animate-spin" style={{ animationDuration: '8s' }} />
                </div>
                <p className="text-xs font-semibold text-[#007fff]">
                  Automation / Workflow Engineer · BS ECE
                </p>
                <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500">
                  <MapPin className="w-3 h-3 text-rose-500" />
                  <span>San Antonio, Cebu City, Philippines</span>
                </div>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-1.5 font-mono text-[10px] font-semibold text-amber-800">
                  <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200">#PowerAutomate</span>
                  <span className="px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800">#CiscoRouting</span>
                  <span className="px-2 py-0.5 rounded bg-orange-50 border border-orange-200 text-orange-800">#ISC2-CC</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

```
