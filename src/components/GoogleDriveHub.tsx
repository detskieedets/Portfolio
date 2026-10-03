import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  HardDrive,
  FolderPlus,
  FileText,
  Upload,
  Search,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  FileCode,
  Folder,
  LogOut,
  Sparkles,
  Zap,
} from 'lucide-react';
import { User } from 'firebase/auth';
import {
  initAuth,
  googleSignIn,
  logout,
  getAccessToken,
} from '../services/firebaseAuth';
import {
  listDriveFiles,
  createDriveFolder,
  saveDocumentToDrive,
  uploadFileToDrive,
  DriveFile,
} from '../services/googleDriveService';
import { sounds } from '../utils/soundEffects';

export const GoogleDriveHub: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [isActionRunning, setIsActionRunning] = useState(false);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const loadFiles = useCallback(
    async (accessToken: string, query: string = '') => {
      setIsLoadingFiles(true);
      try {
        const driveFiles = await listDriveFiles(accessToken, query);
        setFiles(driveFiles);
      } catch (err: unknown) {
        console.error('Failed to load drive files:', err);
        const errorMsg =
          err instanceof Error ? err.message : 'Error fetching Drive files';
        if (
          errorMsg.includes('401') ||
          errorMsg.includes('Invalid Credentials')
        ) {
          setNeedsAuth(true);
          setToken(null);
        } else {
          showNotification('error', errorMsg);
        }
      } finally {
        setIsLoadingFiles(false);
      }
    },
    []
  );

  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        setNeedsAuth(false);
        loadFiles(accessToken);
      },
      () => {
        setUser(null);
        setToken(null);
        setNeedsAuth(true);
        setFiles([]);
      }
    );
    return () => unsubscribe();
  }, [loadFiles]);

  const handleSignIn = async () => {
    sounds.playCoin();
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        setNeedsAuth(false);
        showNotification('success', `Signed in as ${result.user.displayName || result.user.email}`);
        loadFiles(result.accessToken);
      }
    } catch (err: unknown) {
      console.error('Sign-in failed:', err);
      const msg = err instanceof Error ? err.message : 'Sign-in failed. Please try again.';
      showNotification('error', msg);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSignOut = async () => {
    sounds.playClick();
    await logout();
    setUser(null);
    setToken(null);
    setNeedsAuth(true);
    setFiles([]);
    showNotification('success', 'Signed out from Google Drive');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    sounds.playClick();
    loadFiles(token, searchQuery);
  };

  // Quick Action: Save Mary's Verified Resume to User's Google Drive
  const handleSaveResumeToDrive = async () => {
    if (!token) return;
    sounds.playPowerUp();
    setIsActionRunning(true);
    try {
      const resumeContent = `MARY BERNADETTE ELUSORIO
Automation & Workflow Engineer
Cebu City, Philippines | +63 9293559721 | elusoriomary@gmail.com

SUMMARY
Automation & Workflow Engineer specialized in eliminating operational friction, re-engineering repetitive task flows into automated pipelines, Microsoft Power Platform (Power Automate, SharePoint Lists), and Cisco enterprise network infrastructure.

CORE CAPABILITIES
1. Tech & Founder Translator: Explains APIs & flows in business terms with zero jargon.
2. Zero-Friction Operations: Streamlines SOPs, eliminates daily bottlenecks, high adoption.
3. Fail-Safe Architecture: Robust error handling, fallbacks, clean audit logging.

WORK EXPERIENCE
• Innodata Knowledge Services Inc. — Automation / Workflow Engineer (May 2024 – Present 2026)
  - Led enterprise workflow digitalization, re-engineering repetitive tasks into automated pipelines.
  - Built end-to-end Microsoft Power Platform solutions (Power Automate, SharePoint Lists) for daily admin & ops.
  - Implemented automated tracking and fail-safe error handling to ensure data integrity across records.

• Multimedia Solutions & Digitalization Office (CIT-U) — Technical Assistant Intern (Apr 2023 – Aug 2023)
  - Supported lead engineers in managing campus IT operations and hardware-software integrations.
  - Diagnosed and resolved routine network and multimedia support tickets with rapid turnaround.

KEY TECHNICAL PROJECTS
• Adaptive Traffic Signal Control System: Computer vision-based traffic queue estimation with real-time green signal adjustments (Python, YOLO/OpenCV).
• Network Infrastructure Simulation: Multi-tier enterprise topology simulation with Cisco Packet Tracer, inter-VLAN routing, and ACLs.

EDUCATION
• Cebu Institute of Technology - University (CIT-U)
  Bachelor of Science in Information Technology (BSIT)`;

      const newFile = await saveDocumentToDrive(
        token,
        'Mary_Bernadette_Elusorio_Resume_2026.txt',
        resumeContent,
        'text/plain'
      );
      showNotification(
        'success',
        `Saved "${newFile.name}" directly to your Google Drive!`
      );
      loadFiles(token);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save resume';
      showNotification('error', msg);
    } finally {
      setIsActionRunning(false);
    }
  };

  // Quick Action: Create Automation Ops Folder
  const handleCreateOpsFolder = async () => {
    if (!token) return;
    sounds.playCoin();
    setIsActionRunning(true);
    try {
      const folder = await createDriveFolder(token, '⚡ Mary_Automation_Ops_Vault');
      showNotification('success', `Created folder "${folder.name}" in your Google Drive!`);
      loadFiles(token);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create folder';
      showNotification('error', msg);
    } finally {
      setIsActionRunning(false);
    }
  };

  // Quick Action: Upload a local file
  const handleFileUploadInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!token || !e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    sounds.playCoin();
    setIsActionRunning(true);
    try {
      const uploaded = await uploadFileToDrive(token, file);
      showNotification('success', `Uploaded "${uploaded.name}" to your Google Drive!`);
      loadFiles(token);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload failed';
      showNotification('error', msg);
    } finally {
      setIsActionRunning(false);
      if (uploadInputRef.current) uploadInputRef.current.value = '';
    }
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('folder')) return <Folder className="w-5 h-5 text-amber-500" />;
    if (mimeType.includes('spreadsheet') || mimeType.includes('csv'))
      return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />;
    if (mimeType.includes('pdf')) return <FileText className="w-5 h-5 text-rose-500" />;
    if (mimeType.includes('json') || mimeType.includes('javascript') || mimeType.includes('python'))
      return <FileCode className="w-5 h-5 text-purple-600" />;
    return <FileText className="w-5 h-5 text-sky-600" />;
  };

  return (
    <section id="drive" className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-sky-600 tracking-wider uppercase mb-1">
              <HardDrive className="w-3.5 h-3.5 text-sky-600" />
              <span>CLOUD WORKSPACE INTEGRATION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Google Drive Automation Vault</span>
              <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" />
            </h2>
          </div>
          <div className="text-xs sm:text-sm font-mono text-slate-500">
            Real-Time Drive Sync • File Backup • Pipeline Hub
          </div>
        </div>

        {/* Notifications */}
        {notification && (
          <div
            className={`mb-6 p-4 rounded-2xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold transition-all ${
              notification.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border border-rose-200 text-rose-800'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
        )}

        {/* Main Vault Card */}
        <div className="bg-white rounded-3xl border-2 border-[#edd8ba] shadow-sm p-6 sm:p-8">
          
          {needsAuth ? (
            /* Unauthenticated State: Sign in with Google */
            <div className="py-10 text-center max-w-lg mx-auto space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-100 via-amber-50 to-emerald-100 border border-sky-200 flex items-center justify-center mx-auto text-sky-600 shadow-xs">
                <HardDrive className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Connect Your Google Drive
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Authenticate to inspect your Drive storage, trigger file automations, and instantly sync Mary's verified 2026 resume &amp; workflow blueprints into your cloud workspace.
                </p>
              </div>

              {/* Official Google Sign-In Material Button */}
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={handleSignIn}
                  disabled={isLoggingIn}
                  className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 active:scale-95 border border-slate-300 shadow-sm transition-all flex items-center gap-3 cursor-pointer text-slate-700 font-medium text-sm group disabled:opacity-60"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 48 48">
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>
                  <span>{isLoggingIn ? 'Connecting to Google...' : 'Sign in with Google'}</span>
                </button>
              </div>

              <div className="text-[11px] font-mono text-slate-400">
                🔒 Secure OAuth 2.0 connection. Access token is cached in-memory only.
              </div>
            </div>
          ) : (
            /* Authenticated State: Google Drive Explorer & Automations */
            <div className="space-y-6">
              
              {/* User Account & Status Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
                <div className="flex items-center gap-3">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'Google User'}
                      className="w-10 h-10 rounded-full border border-sky-300"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                      {user?.displayName?.[0] || 'U'}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <span>{user?.displayName || 'Google Drive User'}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    </div>
                    <div className="text-xs text-slate-500 font-mono">
                      {user?.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => token && loadFiles(token, searchQuery)}
                    disabled={isLoadingFiles}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                    title="Refresh Drive files"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoadingFiles ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-rose-50 hover:border-rose-300 text-xs font-mono text-slate-600 hover:text-rose-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Disconnect</span>
                  </button>
                </div>
              </div>

              {/* Automation Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* Action 1: Save Resume */}
                <button
                  onClick={handleSaveResumeToDrive}
                  disabled={isActionRunning}
                  className="p-4 rounded-2xl bg-amber-50/70 hover:bg-amber-100/70 border border-amber-200 text-left transition-all active:scale-[0.98] cursor-pointer group disabled:opacity-50"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-xs text-slate-900">
                    Save Mary's Resume
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Syncs Mary's 2026 CV into your Drive
                  </div>
                </button>

                {/* Action 2: Create Ops Folder */}
                <button
                  onClick={handleCreateOpsFolder}
                  disabled={isActionRunning}
                  className="p-4 rounded-2xl bg-purple-50/70 hover:bg-purple-100/70 border border-purple-200 text-left transition-all active:scale-[0.98] cursor-pointer group disabled:opacity-50"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <FolderPlus className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-xs text-slate-900">
                    Create Ops Vault
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Creates ⚡ Mary_Automation_Ops_Vault
                  </div>
                </button>

                {/* Action 3: Upload Local File */}
                <button
                  onClick={() => uploadInputRef.current?.click()}
                  disabled={isActionRunning}
                  className="p-4 rounded-2xl bg-sky-50/70 hover:bg-sky-100/70 border border-sky-200 text-left transition-all active:scale-[0.98] cursor-pointer group disabled:opacity-50"
                >
                  <input
                    ref={uploadInputRef}
                    type="file"
                    onChange={handleFileUploadInput}
                    className="hidden"
                  />
                  <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Upload className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-xs text-slate-900">
                    Upload to Drive
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Upload any local document or spreadsheet
                  </div>
                </button>

              </div>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search your Google Drive files & folders..."
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#fdfcfb] text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer transition-colors"
                >
                  Search
                </button>
              </form>

              {/* File List Explorer */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 px-1">
                  <span>Recent Google Drive Files</span>
                  <span>{files.length} items</span>
                </div>

                {isLoadingFiles ? (
                  <div className="py-12 text-center text-xs font-mono text-slate-400 flex flex-col items-center justify-center gap-2">
                    <RefreshCw className="w-5 h-5 animate-spin text-sky-500" />
                    <span>Syncing files from Google Drive...</span>
                  </div>
                ) : files.length === 0 ? (
                  <div className="py-10 text-center text-xs text-slate-500 border-2 border-dashed border-slate-200 rounded-2xl">
                    No files found in your Drive matching query.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto rounded-xl border border-slate-200">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="p-3 bg-white hover:bg-slate-50 flex items-center justify-between gap-3 transition-colors text-xs"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="shrink-0">{getFileIcon(file.mimeType)}</div>
                          <div className="min-w-0">
                            <div className="font-semibold text-slate-800 truncate">
                              {file.name}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono">
                              {file.modifiedTime
                                ? new Date(file.modifiedTime).toLocaleDateString()
                                : 'Recent'}{' '}
                              • {file.mimeType.split('.').pop()?.replace('vnd.google-apps.', '')}
                            </div>
                          </div>
                        </div>

                        {file.webViewLink && (
                          <a
                            href={file.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors shrink-0"
                            title="Open in Google Drive"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
