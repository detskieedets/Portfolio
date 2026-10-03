import React, { useState } from 'react';
import { Network, Cpu, CheckCircle2, X, ExternalLink, Activity } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const TechnicalProjects: React.FC = () => {
  const [activeProjectModal, setActiveProjectModal] = useState<'traffic' | 'cisco' | null>(null);

  const openModal = (type: 'traffic' | 'cisco') => {
    sounds.playClick();
    setActiveProjectModal(type);
  };

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-sky-600 tracking-wider uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-sky-500"></span>
            <span>PORTFOLIO</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Core Technical Projects
          </h2>
        </div>

        {/* 2 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Project 1: Traffic Control System */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e8dac7] shadow-xs hover:border-emerald-400 hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between pb-3">
                <div className="font-mono text-xs font-bold text-emerald-600 tracking-wide">
                  ML &amp; Computer Vision
                </div>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                  <Cpu className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-4">
                Adaptive Traffic Signal Control System
              </h3>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-600 mb-6">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Engineered adaptive camera-based traffic control using computer vision for real-time signal timing.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Benchmarked against manual operator data to confirm proven congestion reduction.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#fffefb] border border-[#e8dac7] font-mono text-xs text-slate-700">
                  Python
                </span>
                <span className="px-2.5 py-1 rounded bg-[#fffefb] border border-[#e8dac7] font-mono text-xs text-slate-700">
                  Computer Vision
                </span>
                <span className="px-2.5 py-1 rounded bg-[#fffefb] border border-[#e8dac7] font-mono text-xs text-slate-700">
                  ML Logic
                </span>
              </div>
              <button
                onClick={() => openModal('traffic')}
                className="text-xs font-mono font-medium text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Inspect Spec</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Project 2: Network Infrastructure Simulation */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e8dac7] shadow-xs hover:border-sky-400 hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between pb-3">
                <div className="font-mono text-xs font-bold text-sky-600 tracking-wide">
                  Cisco Network Architecture
                </div>
                <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 group-hover:scale-110 transition-transform">
                  <Network className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-4">
                Network Infrastructure Simulation
              </h3>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-600 mb-6">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <span>Architected and simulated robust enterprise network topologies on Cisco configurations.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <span>Configured inter-VLAN routing, subnetting, and hardened security protocols.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#fffefb] border border-[#e8dac7] font-mono text-xs text-slate-700">
                  Cisco Packet Tracer
                </span>
                <span className="px-2.5 py-1 rounded bg-[#fffefb] border border-[#e8dac7] font-mono text-xs text-slate-700">
                  Inter-VLAN
                </span>
                <span className="px-2.5 py-1 rounded bg-[#fffefb] border border-[#e8dac7] font-mono text-xs text-slate-700">
                  Network Hardening
                </span>
              </div>
              <button
                onClick={() => openModal('cisco')}
                className="text-xs font-mono font-medium text-sky-700 hover:text-sky-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Inspect Topology</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

        {/* Modal: Project Technical Inspection */}
        {activeProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto">
              
              <button
                onClick={() => setActiveProjectModal(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {activeProjectModal === 'traffic' ? (
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-semibold mb-3">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Computer Vision &amp; Real-Time Dispatch</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Adaptive Traffic Signal Control System
                  </h3>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                    Designed to replace static timed lights with edge-vision intelligence. Feed streams are segmented into vehicle bounding boxes, estimating queue length dynamically to adjust phase timings.
                  </p>

                  <div className="space-y-4 font-mono text-xs">
                    <div className="p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono space-y-2">
                      <div className="text-slate-400"># Real-Time Queue Evaluation Pipeline</div>
                      <div>1. RTSP Video Stream Ingestion (15 FPS)</div>
                      <div>2. YOLOv8 Nano Edge Detection &amp; Density Clustering</div>
                      <div>3. Weighted Green Light Timing Calculation (10s – 65s)</div>
                      <div>4. Microcontroller Relay Trigger via REST Webhook</div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                        <div className="text-slate-500 text-[11px]">CONGESTION REDUCTION</div>
                        <div className="text-lg font-bold text-emerald-700">-28.4% Wait Time</div>
                      </div>
                      <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                        <div className="text-slate-500 text-[11px]">DETECTION ACCURACY</div>
                        <div className="text-lg font-bold text-emerald-700">96.8% Precision</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-mono font-semibold mb-3">
                    <Network className="w-3.5 h-3.5" />
                    <span>Enterprise Network Engineering</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Cisco Enterprise Infrastructure Simulation
                  </h3>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                    Multi-tier hierarchical network deployment encompassing core, distribution, and access layers. Features robust fault tolerance with HSRP, 802.1Q trunking, and access control lists (ACLs).
                  </p>

                  <div className="space-y-4 font-mono text-xs">
                    <div className="p-4 rounded-xl bg-slate-900 text-sky-300 font-mono space-y-2">
                      <div className="text-slate-400"># Network Topography Architecture</div>
                      <div>• VLAN 10 (Admin), VLAN 20 (Engineering), VLAN 30 (Guest)</div>
                      <div>• Inter-VLAN Routing with Cisco Catalyst 3650 L3 Switches</div>
                      <div>• OSPF Area 0 Dynamic Routing Protocol configured</div>
                      <div>• DHCP Snooping &amp; Dynamic ARP Inspection enabled</div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3 rounded-lg bg-sky-50 border border-sky-200">
                        <div className="text-slate-500 text-[11px]">FAILOVER TIME</div>
                        <div className="text-lg font-bold text-sky-700">&lt; 3 Seconds (HSRP)</div>
                      </div>
                      <div className="p-3 rounded-lg bg-sky-50 border border-sky-200">
                        <div className="text-slate-500 text-[11px]">SECURITY POLICIES</div>
                        <div className="text-lg font-bold text-sky-700">Strict Zero-Trust ACLs</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  Close Inspection
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
