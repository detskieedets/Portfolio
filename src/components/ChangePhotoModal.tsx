import React, { useState, useRef } from 'react';
import { X, Upload, Image as ImageIcon, Check, RotateCcw, Link2 } from 'lucide-react';
import { useAvatar } from '../context/AvatarContext';
import { sounds } from '../utils/soundEffects';

interface ChangePhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangePhotoModal: React.FC<ChangePhotoModalProps> = ({ isOpen, onClose }) => {
  const { avatarUrl, setCustomAvatar, handleFileUpload, resetToDefault } = useAvatar();
  const [urlInput, setUrlInput] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      sounds.playCoin();
      handleFileUpload(e.target.files[0]);
      setFeedback('Photo updated successfully!');
      setTimeout(() => {
        setFeedback(null);
        onClose();
      }, 1200);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      sounds.playCoin();
      handleFileUpload(e.dataTransfer.files[0]);
      setFeedback('Photo updated successfully!');
      setTimeout(() => {
        setFeedback(null);
        onClose();
      }, 1200);
    }
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    sounds.playCoin();
    setCustomAvatar(urlInput.trim());
    setFeedback('Photo URL applied!');
    setTimeout(() => {
      setFeedback(null);
      setUrlInput('');
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    sounds.playClick();
    resetToDefault();
    setFeedback('Reset to default');
    setTimeout(() => setFeedback(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-7 text-slate-800 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
          aria-label="Close photo changer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center">
            <ImageIcon className="w-4 h-4" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Change Profile Photo
          </h3>
        </div>
        <p className="text-xs text-slate-500 mb-5">
          Upload your exact photo from your computer or phone to show your face on the card, contact line, and resume.
        </p>

        {/* Current Preview */}
        <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-200 mb-5">
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
            <img
              src={avatarUrl}
              alt="Current face preview"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="text-xs">
            <div className="font-bold text-slate-900">Current Photo Preview</div>
            <div className="text-slate-500 text-[11px] mt-0.5">
              Saved in your browser session
            </div>
            <button
              onClick={handleReset}
              className="text-[11px] font-mono text-rose-600 hover:text-rose-700 flex items-center gap-1 mt-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset to placeholder</span>
            </button>
          </div>
        </div>

        {/* Feedback message */}
        {feedback && (
          <div className="mb-4 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{feedback}</span>
          </div>
        )}

        {/* File Upload Box */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
            dragActive
              ? 'border-purple-500 bg-purple-50/50'
              : 'border-slate-300 hover:border-purple-400 bg-[#fdfcfb] hover:bg-slate-50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 mx-auto flex items-center justify-center mb-2">
            <Upload className="w-5 h-5" />
          </div>
          <div className="text-sm font-bold text-slate-900">
            Click to upload your photo file
          </div>
          <p className="text-xs text-slate-500 mt-1">
            PNG, JPG, or WEBP from your phone or laptop
          </p>
        </div>

        {/* Or enter Image URL */}
        <div className="mt-5 pt-4 border-t border-slate-200">
          <form onSubmit={handleApplyUrl} className="space-y-2">
            <label className="block text-xs font-mono font-semibold text-slate-600">
              Or paste direct Image URL:
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://.../your-photo.jpg"
                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer shrink-0 transition-colors"
              >
                Apply
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
