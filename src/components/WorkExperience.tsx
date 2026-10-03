import React from 'react';
import { Briefcase, CheckCircle2 } from 'lucide-react';

export const WorkExperience: React.FC = () => {
  return (
    <section id="work" className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#ea580c] tracking-wider uppercase mb-1">
              <Briefcase className="w-3.5 h-3.5 text-[#ea580c]" />
              <span>TRACK RECORD</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Work Experience
            </h2>
          </div>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 font-mono text-xs font-semibold self-start sm:self-auto">
            May 2024 — Present (2026)
          </div>
        </div>

        {/* Experience Cards Stack */}
        <div className="space-y-6">
          
          {/* Experience Card 1 */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e8dac7] shadow-xs hover:border-amber-400 hover:shadow-md transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  Innodata Knowledge Services Inc.
                </h3>
                <span className="px-2 py-0.5 rounded-md bg-[#ea580c] text-white text-[11px] font-mono font-bold tracking-wide">
                  Core Role
                </span>
              </div>
              <div className="font-mono text-xs text-slate-500 font-medium">
                May 2024 — August 2026
              </div>
            </div>

            <div className="font-mono text-xs sm:text-sm font-semibold text-[#ea580c] mb-4">
              Role: Automation / Workflow Engineer
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 mb-6">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Led enterprise workflow digitalization, re-engineering repetitive task flows into automated pipelines.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Built end-to-end Microsoft Power Platform solutions (Power Automate, SharePoint Lists) for daily admin &amp; ops.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Implemented automated tracking and fail-safe error handling to ensure data integrity across records.</span>
              </li>
            </ul>

            {/* Wireframe Tag Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
              <div className="px-3 py-1 rounded bg-[#fffefb] border border-[#e8dac7] font-mono text-xs text-slate-700">
                Power Automate
              </div>
              <div className="px-3 py-1 rounded bg-[#fffefb] border border-[#e8dac7] font-mono text-xs text-slate-700">
                SharePoint Lists
              </div>
              <div className="px-3 py-1 rounded bg-[#fffefb] border border-[#e8dac7] font-mono text-xs text-slate-700">
                Process Optimization
              </div>
              <div className="px-3 py-1 rounded bg-[#fffefb] border border-[#e8dac7] font-mono text-xs text-slate-700">
                Error Handling
              </div>
            </div>
          </div>

          {/* Experience Card 2 */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e8dac7] shadow-xs hover:border-purple-400 hover:shadow-md transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-2">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Multimedia Solutions &amp; Digitalization Office (CIT-U)
              </h3>
              <div className="font-mono text-xs text-slate-500 font-medium">
                April 2023 — August 2023
              </div>
            </div>

            <div className="font-mono text-xs sm:text-sm font-semibold text-purple-700 mb-4">
              Role: Technical Assistant Intern
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 mb-6">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                <span>Supported lead engineers in managing campus IT operations and hardware-software integrations.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                <span>Diagnosed and resolved routine network and multimedia support tickets with rapid turnaround.</span>
              </li>
            </ul>

            {/* Wireframe Tag Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
              <div className="px-3 py-1 rounded bg-[#fffefb] border border-[#e8dac7] font-mono text-xs text-slate-700">
                Campus IT Ops
              </div>
              <div className="px-3 py-1 rounded bg-[#fffefb] border border-[#e8dac7] font-mono text-xs text-slate-700">
                Hardware Integration
              </div>
              <div className="px-3 py-1 rounded bg-[#fffefb] border border-[#e8dac7] font-mono text-xs text-slate-700">
                Network Troubleshooting
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
