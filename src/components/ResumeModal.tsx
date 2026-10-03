import React from 'react';
import { X, Printer, Download, MapPin, Phone, Mail, CheckCircle2, Sparkles, Briefcase, GraduationCap, Award } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { useAvatar } from '../context/AvatarContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { avatarUrl } = useAvatar();
  if (!isOpen) return null;

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 my-8 overflow-hidden text-slate-800">
        
        {/* Top Action Bar (hidden on print) */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900 text-white print:hidden">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-amber-400">
              MARY_BERNADETTE_ELUSORIO_RESUME_2026.pdf
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-rose-600 active:scale-95 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document */}
        <div className="p-6 sm:p-10 space-y-8 bg-[#fffefc] max-h-[80vh] overflow-y-auto print:max-h-none print:overflow-visible">
          
          {/* Header */}
          <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-purple-200 bg-slate-100 shadow-sm shrink-0">
                <img
                  src={avatarUrl}
                  alt="Mary Bernadette Elusorio"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.triedFallback) {
                      target.dataset.triedFallback = 'true';
                      target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80';
                    }
                  }}
                />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  <span>Mary Bernadette Elusorio</span>
                  <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" />
                </h1>
                <p className="text-sm font-semibold text-purple-700 font-mono mt-1">
                  Automation &amp; Workflow Engineer
                </p>
                <p className="text-xs text-slate-500 mt-1 max-w-lg">
                  Specialized in translating operations into bulletproof pipelines, Microsoft Power Platform automations, and enterprise network architecture.
                </p>
              </div>
            </div>

            <div className="space-y-1 text-xs font-mono text-slate-600 sm:text-right shrink-0">
              <div className="flex items-center sm:justify-end gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>Cebu City, Philippines</span>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>+63 9293559721</span>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5">
                <Mail className="w-3.5 h-3.5 text-purple-600" />
                <span>elusoriomary@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ea580c] uppercase tracking-wider">
              <Briefcase className="w-4 h-4" />
              <span>Work Experience</span>
            </div>

            <div className="space-y-6">
              <div className="border-l-2 border-[#ea580c] pl-4 space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">
                    Innodata Knowledge Services Inc. — <span className="text-[#ea580c]">Automation / Workflow Engineer</span>
                  </h3>
                  <span className="font-mono text-xs text-slate-500">May 2024 – Present (2026)</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
                  <li>• Led enterprise workflow digitalization, re-engineering repetitive task flows into automated pipelines.</li>
                  <li>• Built end-to-end Microsoft Power Platform solutions (Power Automate, SharePoint Lists) for daily admin &amp; ops.</li>
                  <li>• Implemented automated tracking and fail-safe error handling to ensure data integrity across company records.</li>
                </ul>
              </div>

              <div className="border-l-2 border-purple-500 pl-4 space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">
                    Multimedia Solutions &amp; Digitalization Office (CIT-U) — <span className="text-purple-700">Technical Assistant Intern</span>
                  </h3>
                  <span className="font-mono text-xs text-slate-500">April 2023 – August 2023</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
                  <li>• Supported lead engineers in managing campus IT operations and hardware-software integrations.</li>
                  <li>• Diagnosed and resolved routine network and multimedia support tickets with rapid turnaround.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Core Technical Projects */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-600 uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Key Technical Projects</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-xs text-slate-900">Adaptive Traffic Signal Control System</div>
                <div className="text-[11px] text-emerald-600 font-mono mt-0.5">Python · OpenCV · ML Logic</div>
                <p className="text-xs text-slate-600 mt-2">
                  Engineered camera-based computer vision traffic timing algorithm; verified congestion drop against manual operator logs.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-xs text-slate-900">Network Infrastructure Simulation</div>
                <div className="text-[11px] text-sky-600 font-mono mt-0.5">Cisco Packet Tracer · Inter-VLAN · Security</div>
                <p className="text-xs text-slate-600 mt-2">
                  Architected full-campus multi-VLAN topology with dynamic routing protocols and hardened access control lists.
                </p>
              </div>
            </div>
          </div>

          {/* Education & Skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-800 uppercase tracking-wider mb-2">
                <GraduationCap className="w-4 h-4 text-purple-600" />
                <span>Education</span>
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900">Cebu Institute of Technology - University (CIT-U)</div>
                <div className="text-slate-600">Bachelor of Science in Information Technology</div>
                <div className="text-slate-400 font-mono mt-0.5">Graduated with High Academic Standing</div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-800 uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Technical Arsenal</span>
              </div>
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                <span className="px-2 py-0.5 rounded bg-orange-50 border border-orange-200 text-orange-800">Power Automate</span>
                <span className="px-2 py-0.5 rounded bg-orange-50 border border-orange-200 text-orange-800">SharePoint</span>
                <span className="px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800">Cisco Networks</span>
                <span className="px-2 py-0.5 rounded bg-purple-50 border border-purple-200 text-purple-800">Zapier / Webhooks</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-300 text-slate-800">REST APIs</span>
                <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800">Python</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
