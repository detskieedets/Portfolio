import React, { useState } from 'react';
import { Calculator, Clock, DollarSign, ShieldAlert, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const RoiEstimator: React.FC = () => {
  const [wastedHours, setWastedHours] = useState<number>(15);

  // Formulas matching the screenshot values:
  // 15 hrs -> 780 hrs/year (15 * 52 = 780)
  // Capital Reclaimed: 780 * $60/hr = $46,800
  // Errors Prevented: 15 * 15 = >225 Invoices
  const timeSavedYear = wastedHours * 52;
  const capitalReclaimed = timeSavedYear * 60;
  const errorsPrevented = wastedHours * 15;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWastedHours(Number(e.target.value));
    if (Number(e.target.value) % 5 === 0) {
      sounds.playClick();
    }
  };

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="rounded-3xl bg-[#fffefb] border-2 border-[#edd8ba] shadow-sm p-6 sm:p-10 text-center">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5 text-amber-600" />
            <span>ROI ESTIMATOR</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-8">
            How Much Busywork Can You Eliminate?
          </h2>

          {/* Slider Container */}
          <div className="max-w-xl mx-auto mb-10 space-y-4">
            <div className="flex items-center justify-between text-xs sm:text-sm font-mono font-semibold text-slate-700">
              <span>Wasted hours per week:</span>
              <div className="px-3 py-1 rounded-lg bg-white border border-[#e8dac7] text-[#ea580c] font-bold text-sm shadow-2xs">
                {wastedHours} <span className="text-xs text-slate-500 font-normal">hrs/week</span>
              </div>
            </div>

            {/* Range Slider */}
            <div className="relative pt-2">
              <input
                type="range"
                min="2"
                max="40"
                step="1"
                value={wastedHours}
                onChange={handleSliderChange}
                aria-label="Wasted hours per week"
                className="w-full h-3 bg-gradient-to-r from-amber-200 via-orange-300 to-rose-300 rounded-lg appearance-none cursor-pointer accent-[#ea580c]"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
                <span>2 hrs (Low)</span>
                <span>15 hrs (Typical Team)</span>
                <span>40 hrs (Heavy Ops)</span>
              </div>
            </div>
          </div>

          {/* 3 Metric Output Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            
            {/* Card 1: Time Saved */}
            <div className="bg-white rounded-2xl p-5 border border-[#ebdcca] shadow-xs">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
                TIME SAVED / YEAR
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#ea580c] tracking-tight">
                {timeSavedYear.toLocaleString()} hrs
              </div>
            </div>

            {/* Card 2: Capital Reclaimed */}
            <div className="bg-white rounded-2xl p-5 border border-[#ebdcca] shadow-xs">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
                CAPITAL RECLAIMED
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#7c3aed] tracking-tight">
                ${capitalReclaimed.toLocaleString()}
              </div>
            </div>

            {/* Card 3: Errors Prevented */}
            <div className="bg-white rounded-2xl p-5 border border-[#ebdcca] shadow-xs">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
                ERRORS PREVENTED
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#059669] tracking-tight">
                &gt;{errorsPrevented} Invoices
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
