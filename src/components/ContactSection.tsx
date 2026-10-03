import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { useAvatar } from '../context/AvatarContext';

export const ContactSection: React.FC = () => {
  const { avatarUrl } = useAvatar();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(
    "Hi Mary, I'd like to discuss: 2nd-in-Command Operations"
  );
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTagClick = (tag: string) => {
    sounds.playClick();
    if (!message.includes(tag)) {
      setMessage((prev) => `${prev.trim()} / ${tag}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playVictory();
    setSubmitted(true);
  };

  const copyEmail = () => {
    sounds.playClick();
    navigator.clipboard.writeText('elusoriomary@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#ea580c] tracking-wider uppercase mb-1">
                <span className="w-2 h-2 rounded-full bg-[#ea580c]"></span>
                <span>DIRECT LINE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Let's Eliminate the Busywork
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Have broken flows, manual spreadsheet chores, or need a 2nd-in-command to drive your technical ops? Reach out directly.
            </p>

            {/* Direct details box */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-[#ea580c] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Cebu City, Philippines</span>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <a
                  href="tel:+639293559721"
                  className="hover:text-emerald-700 font-mono transition-colors"
                >
                  +63 9293559721
                </a>
              </div>

              <div className="flex items-center justify-between gap-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <a
                    href="mailto:elusoriomary@gmail.com"
                    className="hover:text-purple-700 font-mono transition-colors truncate max-w-[210px] sm:max-w-none"
                  >
                    elusoriomary@gmail.com
                  </a>
                </div>
                <button
                  onClick={copyEmail}
                  title="Copy email address"
                  className="text-slate-400 hover:text-slate-700 p-1.5 rounded hover:bg-slate-100 transition-colors"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Mini Mary Profile Badge */}
            <div className="p-3 rounded-2xl bg-white border border-[#e8dac7] shadow-2xs flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl overflow-hidden bg-slate-100 border border-amber-200 shrink-0">
                <img
                  src={avatarUrl}
                  alt="Mary Bernadette Elusorio"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.triedFallback) {
                      target.dataset.triedFallback = 'true';
                      target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80';
                    }
                  }}
                />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-sm text-slate-900">Mary</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                </div>
                <div className="text-xs text-purple-700 font-medium">
                  Automation &amp; Workflow Engineer
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Diagnostic Inquiry */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border-2 border-[#edd8ba] shadow-sm p-6 sm:p-8">
              
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-4">
                Quick Diagnostic Inquiry
              </h3>

              {/* Tag Quick Selectors */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => handleTagClick('Power Automate Optimization')}
                  className="px-3 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 border border-orange-200 text-xs font-mono text-orange-800 font-semibold transition-colors cursor-pointer"
                >
                  + Power Automate
                </button>
                <button
                  type="button"
                  onClick={() => handleTagClick('Cisco Enterprise Topology')}
                  className="px-3 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200 text-xs font-mono text-sky-800 font-semibold transition-colors cursor-pointer"
                >
                  + Cisco Network
                </button>
                <button
                  type="button"
                  onClick={() => handleTagClick('Founder Ops Coffee Chat')}
                  className="px-3 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-xs font-mono text-amber-800 font-semibold transition-colors cursor-pointer"
                >
                  + Coffee Chat
                </button>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">
                    Message Dispatched to Mary's Pipeline!
                  </h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Thanks for reaching out! Mary typically reviews diagnostic inquiries within 24–48 hours. A copy was also prepared for your email client.
                  </p>
                  <div className="pt-2 flex justify-center gap-3">
                    <a
                      href={`mailto:elusoriomary@gmail.com?subject=Diagnostic Inquiry from ${encodeURIComponent(name || 'Founder')}&body=${encodeURIComponent(message)}`}
                      className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
                    >
                      Open Email Client
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
                    >
                      Send Another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-600 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sarah Connor"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#fdfcfb] text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-600 mb-1">
                        Work Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sarah@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#fdfcfb] text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-600 mb-1">
                      Project or Question
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#fdfcfb] text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all"
                    ></textarea>
                  </div>

                  {/* Form Footer */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <span className="font-mono text-xs text-slate-500">
                      Fast 24-48h reply
                    </span>

                    <button
                      type="submit"
                      className="bg-[#eb3e35] hover:bg-[#d83229] active:scale-95 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Send to Mary</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
