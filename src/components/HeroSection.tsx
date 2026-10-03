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
  Upload,
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { useAvatar } from '../context/AvatarContext';

interface HeroSectionProps {
  onOpenResume: () => void;
  onScrollTo: (id: string) => void;
  onOpenChangePhoto: () => void;
}

const currentActivities = [
  'connecting APIs & Webhooks',
  'orchestrating Power Automate flows',
  'eliminating manual spreadsheet chores',
  'hardening Cisco enterprise networks',
  'architecting fail-safe webhooks',
];

const liveStacks = [
  { icon: Globe, name: 'Cisco Routing & Networks', tag: 'Core Network' },
  { icon: Zap, name: 'Power Automate & SharePoint', tag: 'Automation' },
  { icon: Radio, name: 'HubSpot & Stripe Webhooks', tag: 'Integrations' },
  { icon: Sparkles, name: 'Python Computer Vision ML', tag: 'AI/ML' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenResume,
  onScrollTo,
  onOpenChangePhoto,
}) => {
  const { avatarUrl, handleFileUpload } = useAvatar();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activityIndex, setActivityIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [stackIndex, setStackIndex] = useState(0);

  // Typewriter effect for "Currently:" box
  useEffect(() => {
    const fullText = currentActivities[activityIndex];
    const typingSpeed = isDeleting ? 30 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < fullText.length) {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(fullText.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setActivityIndex((prev) => (prev + 1) % currentActivities.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, activityIndex]);

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
          
          {/* Left Column: Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f4ece0]/80 border border-[#e5d5be] text-xs font-mono font-medium text-emerald-800 shadow-2xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <div className="leading-tight">
                <span className="font-bold tracking-wider text-[11px] text-slate-800">OPEN FOR 2026</span>
                <span className="text-slate-500 font-normal"> · AUTOMATION</span>
              </div>
            </div>

            {/* Main Greeting Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-[#e11d48] via-[#db2777] to-[#7c3aed] bg-clip-text text-transparent">
                  Mary
                </span>
                <span className="text-[#7c3aed]">.</span>
              </h1>
              <p className="mt-2 text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
                I eliminate busywork &amp; connect systems.
              </p>
            </div>

            {/* Interactive Terminal Typing Box */}
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#f3d9b8] shadow-xs text-sm">
              <span className="font-mono text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Currently:
              </span>
              <div className="font-mono text-xs sm:text-sm font-semibold text-[#c2410c] flex items-center min-h-[22px]">
                <span>{displayText}</span>
                <span className="inline-block w-2 h-4 ml-1 bg-[#ea580c] animate-pulse"></span>
              </div>
            </div>

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
                  className="hover:text-white p-0.5 rounded hover:bg-slate-800 transition-colors"
                  aria-label="Previous stack item"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleNextStack}
                  className="hover:text-white p-0.5 rounded hover:bg-slate-800 transition-colors"
                  aria-label="Next stack item"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Mission Statement */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              Turning manual friction and complex operations into bulletproof, automated workflows teams actually love.
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => {
                  sounds.playPowerUp();
                  onScrollTo('workflows');
                }}
                className="bg-[#eb3e35] hover:bg-[#d83229] active:scale-95 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg shadow-rose-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Inspect Blueprints</span>
                <Zap className="w-4 h-4 fill-white" />
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onScrollTo('game');
                }}
                className="bg-white hover:bg-purple-50 active:scale-95 border-2 border-purple-500 text-purple-700 font-semibold text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Play Automation Rush</span>
                <Gamepad2 className="w-4 h-4 text-purple-600" />
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

          {/* Right Column: Mary's Retro Sys Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-2xl bg-[#fffefc] border-2 border-[#f3d9a2] shadow-[0_12px_36px_rgba(234,179,8,0.14)] p-4 sm:p-5 transition-transform hover:-translate-y-1 duration-300">
              
              {/* Window Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#ebd7be]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  </div>
                  <span className="font-mono text-xs font-bold text-purple-700 tracking-tight ml-1">
                    mary.sys
                  </span>
                </div>
                
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-mono font-medium text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>2026 Ready</span>
                  <Zap className="w-3 h-3 text-emerald-600" />
                </div>
              </div>

              {/* Portrait Frame */}
              <div className="relative rounded-xl overflow-hidden border border-[#edd7be] bg-gradient-to-b from-amber-50/50 to-orange-50/30 p-2">
                
                {/* 100% Reliable Ribbon */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f97316] text-white text-[10px] font-bold tracking-wide shadow-sm">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                    <span>100% Reliable</span>
                  </div>
                </div>

                {/* Photo Container */}
                <div
                  onClick={() => onOpenChangePhoto()}
                  className="relative rounded-lg overflow-hidden bg-slate-100 aspect-square flex items-center justify-center group cursor-pointer"
                  title="Click to change your profile picture"
                >
                  {/* Mary's profile portrait */}
                  <img
                    src={avatarUrl}
                    alt="Mary Bernadette Elusorio - Automation and Workflow Engineer"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedFallback) {
                        target.dataset.triedFallback = 'true';
                        target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80';
                      }
                    }}
                  />

                  {/* Hover Overlay: Change Photo Indicator */}
                  <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-2xs opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-semibold gap-1.5 p-4 text-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center">
                      <Camera className="w-5 h-5" />
                    </div>
                    <span>Change Face / Photo</span>
                    <span className="text-[10px] text-slate-300 font-normal">Click to upload your photo file</span>
                  </div>

                  {/* Zero Busywork badge at bottom */}
                  <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-sm border border-amber-200 text-[10px] font-mono font-semibold text-slate-800 shadow-sm">
                      <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>Zero Busywork</span>
                    </div>
                  </div>

                  {/* Quick Change Badge on top left */}
                  <div className="absolute top-4 left-4 z-10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenChangePhoto();
                      }}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-xs text-white text-[10px] font-mono font-medium shadow-sm transition-all"
                    >
                      <Camera className="w-2.5 h-2.5" />
                      <span>Change</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Bio & Details Footer */}
              <div className="pt-4 text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 justify-center">
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    Mary
                  </h2>
                  <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500 animate-spin" style={{ animationDuration: '8s' }} />
                </div>
                <p className="text-xs font-semibold text-purple-700">
                  Automation &amp; Workflow Engineer
                </p>
                <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500">
                  <MapPin className="w-3 h-3 text-rose-500" />
                  <span>Cebu City, Philippines</span>
                </div>
                <div className="pt-2 flex items-center justify-center gap-2 font-mono text-[11px] font-semibold text-amber-800">
                  <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200">#PowerAutomate</span>
                  <span className="px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800">#CiscoNetwork</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
