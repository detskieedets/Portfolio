import React from 'react';
import { Languages, Zap, ShieldCheck, Check } from 'lucide-react';

export const CoreCapabilities: React.FC = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-purple-700 tracking-wider uppercase mb-1">
              <Zap className="w-3.5 h-3.5 fill-purple-700" />
              <span>CORE SUPERPOWER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Engineering to Execution: Core Capabilities
            </h2>
          </div>
          <div className="text-xs sm:text-sm font-mono text-slate-500 tracking-wide">
            Bridging Founders • Tech Teams • Operations
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 01 */}
          <div className="bg-white rounded-2xl p-6 border border-[#e8dac7] shadow-xs hover:shadow-md hover:border-amber-400 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#ea580c] mb-4 group-hover:scale-105 transition-transform">
              <Languages className="w-5 h-5" />
            </div>
            <div className="font-mono text-[11px] font-bold text-[#ea580c] tracking-widest uppercase mb-1">
              PILLAR 01
            </div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-4">
              Tech &amp; Founder Translator
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 w-4 h-4 rounded-full bg-orange-100 text-[#ea580c] flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
                <span>Explains APIs &amp; flows in plain business terms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 w-4 h-4 rounded-full bg-orange-100 text-[#ea580c] flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
                <span>Zero jargon; total inter-department alignment</span>
              </li>
            </ul>
          </div>

          {/* Pillar 02 */}
          <div className="bg-white rounded-2xl p-6 border border-[#e8dac7] shadow-xs hover:shadow-md hover:border-purple-400 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 mb-4 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 fill-purple-100" />
            </div>
            <div className="font-mono text-[11px] font-bold text-purple-700 tracking-widest uppercase mb-1">
              PILLAR 02
            </div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-4">
              Zero-Friction Operations
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 w-4 h-4 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
                <span>Streamlines SOPs &amp; eliminates daily bottlenecks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 w-4 h-4 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
                <span>High staff adoption rates from day one</span>
              </li>
            </ul>
          </div>

          {/* Pillar 03 */}
          <div className="bg-white rounded-2xl p-6 border border-[#e8dac7] shadow-xs hover:shadow-md hover:border-sky-400 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 mb-4 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="font-mono text-[11px] font-bold text-sky-700 tracking-widest uppercase mb-1">
              PILLAR 03
            </div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-4">
              Fail-Safe Architecture
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 w-4 h-4 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
                <span>Robust error handling, fallbacks &amp; clean logs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 w-4 h-4 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
                <span>Never breaks on weekend platform updates</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
