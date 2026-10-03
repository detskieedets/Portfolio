import React, { useState, useEffect } from 'react';
import {
  Workflow,
  Zap,
  Calendar,
  CreditCard,
  FileSpreadsheet,
  Layers,
  Database,
  Mail,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
  Bot,
  MessageSquare,
  Filter,
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const WorkflowBlueprints: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reconciliation' | 'leadAi'>('reconciliation');
  const [simulationStep, setSimulationStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const startSimulation = () => {
    sounds.playPowerUp();
    setIsSimulating(true);
    setSimulationStep(1);
  };

  useEffect(() => {
    if (!isSimulating) return;

    if (simulationStep > 0 && simulationStep < 6) {
      const timer = setTimeout(() => {
        sounds.playCoin();
        setSimulationStep((prev) => prev + 1);
      }, 850);
      return () => clearTimeout(timer);
    } else if (simulationStep === 6) {
      const timer = setTimeout(() => {
        sounds.playVictory();
        setIsSimulating(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [simulationStep, isSimulating]);

  const resetSimulation = () => {
    sounds.playClick();
    setIsSimulating(false);
    setSimulationStep(0);
  };

  return (
    <section id="workflows" className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#ea580c] tracking-wider uppercase mb-1">
              <Workflow className="w-3.5 h-3.5 text-[#ea580c]" />
              <span>PRODUCTION FLOWS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Live Workflow Blueprints
            </h2>
          </div>

          {/* Tab Switcher */}
          <div className="inline-flex p-1 rounded-xl bg-white border border-[#e8dac7] shadow-2xs font-mono text-xs">
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('reconciliation');
                setSimulationStep(0);
                setIsSimulating(false);
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'reconciliation'
                  ? 'bg-[#ea580c] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>1. Invoice Reconciliation</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('leadAi');
                setSimulationStep(0);
                setIsSimulating(false);
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'leadAi'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>2. Multi-Path Lead AI</span>
            </button>
          </div>
        </div>

        {/* Blueprint Container */}
        <div className="bg-white rounded-3xl border border-[#e8dac7] shadow-sm p-6 sm:p-8">
          
          {activeTab === 'reconciliation' ? (
            <div>
              {/* Header inside Panel */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-3">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  HubSpot, Stripe &amp; Xero Auto-Reconciliation
                </h3>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 font-semibold">
                    Stripe
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-sky-50 border border-sky-200 text-sky-700 font-semibold">
                    Xero
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-orange-50 border border-orange-200 text-[#ea580c] font-semibold">
                    HubSpot
                  </span>
                </div>
              </div>

              {/* 2 Columns: Flowchart Canvas + Step Detail */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Visual Zapier Flow Simulator */}
                <div className="lg:col-span-6 bg-[#fcfbfa] rounded-2xl border border-[#ebdcca] p-4 sm:p-5 relative shadow-inner">
                  
                  {/* Flow Simulation Controls */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#ebdcca] text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-amber-500 text-white flex items-center justify-center font-bold text-[10px]">
                        ME
                      </div>
                      <span className="font-semibold text-slate-800 truncate max-w-[190px]">
                        HubSpot Invoice Engine
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-600 text-[10px]">
                        Active
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isSimulating ? (
                        <div className="flex items-center gap-1 text-emerald-600 font-semibold">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                          <span>Testing...</span>
                        </div>
                      ) : (
                        <button
                          onClick={simulationStep === 6 ? resetSimulation : startSimulation}
                          className="px-2.5 py-1 rounded bg-[#ea580c] hover:bg-[#d94806] text-white font-mono text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                        >
                          {simulationStep === 6 ? (
                            <>
                              <RotateCcw className="w-3 h-3" />
                              <span>Reset</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3 fill-white" />
                              <span>Run Flow</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Flowchart Nodes */}
                  <div className="space-y-3 py-2">
                    
                    {/* Node 1: Schedule */}
                    <div
                      className={`p-3 rounded-xl border transition-all ${
                        simulationStep === 1
                          ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-300'
                          : simulationStep > 1
                          ? 'bg-white border-emerald-300 shadow-2xs'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-[11px] font-mono text-slate-400">1. Trigger</div>
                            <div className="text-xs font-bold text-slate-800">
                              Schedule by Zapier - Every Day
                            </div>
                          </div>
                        </div>
                        {simulationStep >= 1 && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        )}
                      </div>
                    </div>

                    {/* Connecting line */}
                    <div className="w-0.5 h-3 bg-slate-300 mx-auto"></div>

                    {/* Node 2: Stripe */}
                    <div
                      className={`p-3 rounded-xl border transition-all ${
                        simulationStep === 2
                          ? 'bg-indigo-50 border-indigo-400 ring-2 ring-indigo-300'
                          : simulationStep > 2
                          ? 'bg-white border-emerald-300 shadow-2xs'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                            <CreditCard className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-[11px] font-mono text-slate-400">2. Action</div>
                            <div className="text-xs font-bold text-slate-800">
                              Stripe - Find Invoice
                            </div>
                          </div>
                        </div>
                        {simulationStep >= 2 && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        )}
                      </div>
                    </div>

                    {/* Connecting line */}
                    <div className="w-0.5 h-3 bg-slate-300 mx-auto"></div>

                    {/* Node 3: Xero */}
                    <div
                      className={`p-3 rounded-xl border transition-all ${
                        simulationStep === 3
                          ? 'bg-sky-50 border-sky-400 ring-2 ring-sky-300'
                          : simulationStep > 3
                          ? 'bg-white border-emerald-300 shadow-2xs'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                            <FileSpreadsheet className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-[11px] font-mono text-slate-400">3. Action</div>
                            <div className="text-xs font-bold text-slate-800">
                              Xero - Find Invoice by ID
                            </div>
                          </div>
                        </div>
                        {simulationStep >= 3 && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        )}
                      </div>
                    </div>

                    {/* Connecting line */}
                    <div className="w-0.5 h-3 bg-slate-300 mx-auto"></div>

                    {/* Node 4: HubSpot */}
                    <div
                      className={`p-3 rounded-xl border transition-all ${
                        simulationStep === 4
                          ? 'bg-orange-50 border-orange-400 ring-2 ring-orange-300'
                          : simulationStep > 4
                          ? 'bg-white border-emerald-300 shadow-2xs'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#ea580c] flex items-center justify-center shrink-0">
                            <Layers className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-[11px] font-mono text-slate-400">4. Action</div>
                            <div className="text-xs font-bold text-slate-800">
                              HubSpot - Find Deal
                            </div>
                          </div>
                        </div>
                        {simulationStep >= 4 && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        )}
                      </div>
                    </div>

                  </div>

                  {/* Flow Caption */}
                  <div className="pt-3 border-t border-slate-200 text-center font-mono text-[11px] text-slate-500">
                    💻 Actual production Zapier flowchart configured by Mary.
                  </div>
                </div>

                {/* Right Column: Numbered Breakdown */}
                <div className="lg:col-span-6 space-y-3">
                  
                  {/* Step 1 */}
                  <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                    <span className="w-6 h-6 rounded bg-[#ea580c] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <strong className="text-slate-900 font-semibold">Schedule:</strong> Runs daily at 12:00 AM UTC autonomously.
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                    <span className="w-6 h-6 rounded bg-indigo-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <strong className="text-slate-900 font-semibold">Stripe:</strong> Queries and verifies settled customer charges.
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                    <span className="w-6 h-6 rounded bg-sky-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <strong className="text-slate-900 font-semibold">Xero:</strong> Matches payments to ledger invoices.
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                    <span className="w-6 h-6 rounded bg-[#ea580c] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      4
                    </span>
                    <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <strong className="text-slate-900 font-semibold">HubSpot:</strong> Updates Deal stage to &quot;Paid&quot; &amp; logs customer timeline.
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                    <span className="w-6 h-6 rounded bg-purple-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      5
                    </span>
                    <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <strong className="text-slate-900 font-semibold">Notion:</strong> Creates immutable finance audit ledger item.
                    </div>
                  </div>

                  {/* Step 6 */}
                  <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                    <span className="w-6 h-6 rounded bg-pink-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      6
                    </span>
                    <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <strong className="text-slate-900 font-semibold">Email:</strong> Sends daily balance executive digest.
                    </div>
                  </div>

                  {/* Verified Result Banner */}
                  <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs sm:text-sm font-semibold text-emerald-800">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                      <span>Result: 3 days of monthly spreadsheets cut to 0 seconds.</span>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  </div>

                </div>

              </div>
            </div>
          ) : (
            <div>
              {/* Tab 2: Multi-Path Lead AI */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-3">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Multi-Path Enterprise Lead AI &amp; Webhook Routing
                </h3>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-purple-50 border border-purple-200 text-purple-700 font-semibold">
                    Typeform
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-pink-50 border border-pink-200 text-pink-700 font-semibold">
                    Gemini AI
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold">
                    Slack
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Visual AI Flow */}
                <div className="lg:col-span-6 bg-[#fcfbfa] rounded-2xl border border-[#ebdcca] p-5 shadow-inner space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Trigger</div>
                      <div className="font-bold text-slate-800">Inbound Webhook (New Lead Form)</div>
                    </div>
                  </div>

                  <div className="w-0.5 h-3 bg-slate-300 mx-auto"></div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-700 flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">AI Logic Layer</div>
                      <div className="font-bold text-slate-800">Gemini LLM Intent &amp; Budget Scorer</div>
                    </div>
                  </div>

                  <div className="w-0.5 h-3 bg-slate-300 mx-auto"></div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300">
                      <div className="text-[10px] font-bold text-emerald-700 uppercase">Path A: High Intent</div>
                      <div className="text-xs text-slate-700 mt-1">Instant VIP Slack Alert &amp; Calendar Invite</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-100 border border-slate-300">
                      <div className="text-[10px] font-bold text-slate-600 uppercase">Path B: Self-Serve</div>
                      <div className="text-xs text-slate-700 mt-1">Automated 5-Day Education Sequence</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 text-center text-[11px] text-slate-500">
                    Built with fail-safe error queuing and duplicate deduplication.
                  </div>
                </div>

                {/* Right Column: AI Flow Breakdown */}
                <div className="lg:col-span-6 space-y-3">
                  <div className="flex items-start gap-3 p-2 rounded-xl">
                    <span className="w-6 h-6 rounded bg-purple-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <strong className="text-slate-900 font-semibold">Instant Intake:</strong> Custom webhook endpoint collects prospect questionnaire responses in under 200ms.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2 rounded-xl">
                    <span className="w-6 h-6 rounded bg-pink-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <strong className="text-slate-900 font-semibold">AI Qualification:</strong> Evaluates business size, software stack, and urgency score (1-100).
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2 rounded-xl">
                    <span className="w-6 h-6 rounded bg-emerald-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <strong className="text-slate-900 font-semibold">Executive Slack Alert:</strong> Dispatches rich card directly to founder channel with suggested response angles.
                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-between text-xs sm:text-sm font-semibold text-purple-900">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-600 fill-purple-600" />
                      <span>Result: 4-hour lead response time reduced to 12 seconds.</span>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
