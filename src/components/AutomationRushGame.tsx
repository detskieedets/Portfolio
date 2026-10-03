import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Zap,
  CreditCard,
  Radio,
  Bot,
  Bug,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface AutomationRushGameProps {
  onUnlockResume: () => void;
}

type TokenType = 'zapier' | 'stripe' | 'webhook' | 'ai' | 'bug';

interface FallingToken {
  id: number;
  lane: number; // 0, 1, or 2
  y: number; // 0 to 100 percentage
  type: TokenType;
  points: number;
  speed: number;
}

interface FloatingScore {
  id: number;
  lane: number;
  text: string;
  isPositive: boolean;
}

const TOKEN_CONFIGS: Record<
  TokenType,
  { name: string; points: number; color: string; icon: React.ComponentType<{ className?: string }> }
> = {
  zapier: { name: 'Zapier', points: 15, color: '#f59e0b', icon: Zap },
  stripe: { name: 'Stripe', points: 15, color: '#6366f1', icon: CreditCard },
  webhook: { name: 'Webhook', points: 20, color: '#10b981', icon: Radio },
  ai: { name: 'AI', points: 25, color: '#ec4899', icon: Bot },
  bug: { name: 'Bug', points: -20, color: '#ef4444', icon: Bug },
};

export const AutomationRushGame: React.FC<AutomationRushGameProps> = ({ onUnlockResume }) => {
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'won' | 'over'>('ready');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(1);
  const [playerLane, setPlayerLane] = useState(1); // 0 = Left, 1 = Mid, 2 = Right
  const [floatingScores, setFloatingScores] = useState<FloatingScore[]>([]);

  const tokensRef = useRef<FallingToken[]>([]);
  const [renderTokens, setRenderTokens] = useState<FallingToken[]>([]);
  const nextTokenId = useRef(1);
  const spawnTimer = useRef(0);
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Trigger confetti burst on victory
  const fireVictoryConfetti = () => {
    sounds.playVictory();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#8b5cf6', '#10b981', '#f59e0b'],
      });
    } catch {
      // safe fallback
    }
  };

  const startGame = () => {
    sounds.playPowerUp();
    tokensRef.current = [];
    setRenderTokens([]);
    setScore(0);
    setStreak(1);
    setPlayerLane(1);
    setFloatingScores([]);
    setGameState('playing');
    lastTimeRef.current = performance.now();
  };

  const addFloatingScore = (lane: number, points: number) => {
    const id = Date.now() + Math.random();
    const text = points > 0 ? `+${points}` : `${points}`;
    setFloatingScores((prev) => [...prev, { id, lane, text, isPositive: points > 0 }]);
    setTimeout(() => {
      setFloatingScores((prev) => prev.filter((item) => item.id !== id));
    }, 900);
  };

  const moveLane = useCallback((targetLane: number) => {
    sounds.playClick();
    setPlayerLane(Math.max(0, Math.min(2, targetLane)));
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          startGame();
        }
        return;
      }

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        setPlayerLane((prev) => Math.max(0, prev - 1));
        sounds.playClick();
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        setPlayerLane((prev) => Math.min(2, prev + 1));
        sounds.playClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Main Game Loop
  const updateGame = useCallback(
    (now: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = now;
      const delta = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      if (gameState !== 'playing') return;

      // Spawn tokens periodically
      spawnTimer.current += delta;
      if (spawnTimer.current >= 0.85) {
        spawnTimer.current = 0;
        const types: TokenType[] = ['zapier', 'stripe', 'webhook', 'ai', 'bug'];
        // 25% chance for a bug, 75% for beneficial tokens
        const isBug = Math.random() < 0.28;
        const type: TokenType = isBug
          ? 'bug'
          : types[Math.floor(Math.random() * (types.length - 1))];
        
        const randomLane = Math.floor(Math.random() * 3);
        const config = TOKEN_CONFIGS[type];

        tokensRef.current.push({
          id: nextTokenId.current++,
          lane: randomLane,
          y: 0,
          type,
          points: config.points,
          speed: 42 + Math.random() * 12, // percentage per second
        });
      }

      // Update positions and handle collisions
      const currentTokens = tokensRef.current;
      const remainingTokens: FallingToken[] = [];

      for (let i = 0; i < currentTokens.length; i++) {
        const token = currentTokens[i];
        token.y += token.speed * delta;

        // Collision zone at bottom (between y: 78% and y: 92%)
        if (token.y >= 78 && token.y <= 92 && token.lane === playerLane) {
          // Collected!
          if (token.type === 'bug') {
            sounds.playHitBug();
            setStreak(1);
            setScore((prev) => Math.max(0, prev - 20));
            addFloatingScore(token.lane, -20);
          } else {
            sounds.playCoin();
            const earned = token.points;
            addFloatingScore(token.lane, earned);
            setStreak((prev) => prev + 1);
            setScore((prev) => {
              const newScore = prev + earned;
              if (newScore >= 100) {
                setGameState('won');
                fireVictoryConfetti();
              }
              return newScore;
            });
          }
          // Do not keep in remaining
          continue;
        }

        // Keep if still on screen
        if (token.y < 105) {
          remainingTokens.push(token);
        }
      }

      tokensRef.current = remainingTokens;
      setRenderTokens([...remainingTokens]);

      if (gameState === 'playing') {
        requestRef.current = requestAnimationFrame(updateGame);
      }
    },
    [gameState, playerLane]
  );

  useEffect(() => {
    if (gameState === 'playing') {
      requestRef.current = requestAnimationFrame(updateGame);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gameState, updateGame]);

  return (
    <section id="game" className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Dark Container */}
        <div className="rounded-3xl bg-[#0b0a17] border border-purple-900/60 shadow-[0_10px_40px_rgba(109,40,217,0.18)] p-5 sm:p-8 text-white relative overflow-hidden">
          
          {/* Subtle Arcade Background Lines */}
          <div className="absolute inset-0 bg-arcade-grid opacity-30 pointer-events-none"></div>

          {/* Header Row */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between pb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-500/40 bg-purple-950/50 text-[11px] font-mono text-purple-300 font-semibold mb-2">
                <span>🎮</span>
                <span className="uppercase tracking-wider">INSTANT MINI-GAME</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
                <span>Automation Rush: Packet Catcher</span>
                <Zap className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                Catch glowing Zapier, Stripe, Webhook &amp; AI tokens! Dodge red bugs. Score 100 points to unlock Mary's resume.
              </p>
            </div>

            {/* Skip Game & Get Resume Button */}
            <div className="shrink-0">
              <button
                onClick={() => {
                  sounds.playCoin();
                  onUnlockResume();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 active:scale-95 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold tracking-wide transition-all cursor-pointer shadow-xs"
              >
                <Zap className="w-3.5 h-3.5 fill-amber-300" />
                <span>Skip Game &amp; Get Resume</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Arcade Screen Frame */}
          <div className="relative z-10 rounded-2xl bg-[#0f0e21] border border-purple-800/50 p-4 sm:p-5 shadow-inner">
            
            {/* Top HUD Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-purple-900/50 font-mono text-xs">
              <div className="flex items-center gap-4 sm:gap-6">
                
                {/* Score */}
                <div className="flex items-center gap-2 px-3 py-1 rounded bg-black/40 border border-purple-800/60">
                  <span className="text-slate-400 font-semibold">SCORE:</span>
                  <span className="text-amber-400 font-bold text-sm tracking-wider">
                    {score} <span className="text-xs text-slate-500">/ 100</span>
                  </span>
                </div>

                {/* Streak */}
                <div className="flex items-center gap-2 px-3 py-1 rounded bg-black/40 border border-purple-800/60">
                  <span className="text-slate-400 font-semibold">STREAK:</span>
                  <span className="text-emerald-400 font-bold">x{streak}</span>
                </div>

                {/* Status */}
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-slate-400 font-semibold">STATUS:</span>
                  <span
                    className={`font-bold ${
                      gameState === 'playing'
                        ? 'text-emerald-400 animate-pulse'
                        : gameState === 'won'
                        ? 'text-amber-400'
                        : 'text-purple-300'
                    }`}
                  >
                    {gameState.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Controls guide */}
              <div className="text-[11px] text-slate-400">
                Move: <span className="text-purple-300 font-semibold">← / →</span> or{' '}
                <span className="text-purple-300 font-semibold">A / D</span> or click 3 Lanes
              </div>
            </div>

            {/* Game Canvas / Arena Area */}
            <div className="relative h-72 sm:h-80 w-full rounded-xl bg-[#080712] border border-purple-900/40 overflow-hidden select-none">
              
              {/* 3 Pipeline Lanes Background */}
              <div className="absolute inset-0 grid grid-cols-3 divide-x divide-purple-900/30">
                
                {/* Lane 0: Pipeline 01 */}
                <div className="relative h-full flex flex-col justify-between py-2 text-center">
                  <div className="font-mono text-[10px] font-bold text-purple-400/40 tracking-wider">
                    PIPELINE 01
                  </div>
                  <div className="w-full border-b border-dashed border-purple-900/20"></div>
                </div>

                {/* Lane 1: Pipeline 02 */}
                <div className="relative h-full flex flex-col justify-between py-2 text-center">
                  <div className="font-mono text-[10px] font-bold text-purple-400/40 tracking-wider">
                    PIPELINE 02
                  </div>
                  <div className="w-full border-b border-dashed border-purple-900/20"></div>
                </div>

                {/* Lane 2: Pipeline 03 */}
                <div className="relative h-full flex flex-col justify-between py-2 text-center">
                  <div className="font-mono text-[10px] font-bold text-purple-400/40 tracking-wider">
                    PIPELINE 03
                  </div>
                  <div className="w-full border-b border-dashed border-purple-900/20"></div>
                </div>
              </div>

              {/* Falling Tokens */}
              {renderTokens.map((token) => {
                const config = TOKEN_CONFIGS[token.type];
                const IconComponent = config.icon;
                return (
                  <div
                    key={token.id}
                    className="absolute transition-transform duration-75 flex flex-col items-center pointer-events-none"
                    style={{
                      left: `${token.lane * 33.333 + 16.666}%`,
                      top: `${token.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-lg transition-transform ${
                        token.type === 'bug'
                          ? 'bg-rose-950/80 border border-rose-500 text-rose-400 animate-bounce'
                          : 'bg-slate-900/90 border border-current shadow-purple-500/20'
                      }`}
                      style={{ color: config.color, borderColor: config.color }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span
                      className="text-[9px] font-mono font-bold mt-0.5 tracking-tight px-1 rounded bg-black/60"
                      style={{ color: config.color }}
                    >
                      {config.name}
                    </span>
                  </div>
                );
              })}

              {/* Floating score notices (+15, -20) */}
              {floatingScores.map((item) => (
                <div
                  key={item.id}
                  className={`absolute font-mono font-extrabold text-sm pointer-events-none transition-all duration-700 animate-float-up ${
                    item.isPositive ? 'text-amber-400' : 'text-rose-500'
                  }`}
                  style={{
                    left: `${item.lane * 33.333 + 16.666}%`,
                    top: '72%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {item.text}
                </div>
              ))}

              {/* Player Receiver (Packet Catcher) at bottom */}
              <div
                className="absolute bottom-3 transition-all duration-150 ease-out flex flex-col items-center pointer-events-none"
                style={{
                  left: `${playerLane * 33.333 + 16.666}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                {/* Glow ring */}
                <div className="w-16 sm:w-20 h-10 rounded-xl bg-gradient-to-r from-purple-600 via-rose-500 to-amber-500 p-[1.5px] shadow-[0_0_20px_rgba(236,72,153,0.4)]">
                  <div className="w-full h-full bg-[#130f2c] rounded-[10px] flex items-center justify-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="font-mono text-[10px] font-bold text-white uppercase tracking-wider">
                      FLOW
                    </span>
                  </div>
                </div>
                <div className="w-10 h-1 bg-amber-400/80 rounded-full mt-1 shadow-[0_0_8px_#f59e0b]"></div>
              </div>

              {/* Overlay: Ready / Start Screen */}
              {gameState === 'ready' && (
                <div className="absolute inset-0 bg-[#080712]/92 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-20">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center text-white mb-3 shadow-lg shadow-rose-500/30">
                    <Zap className="w-7 h-7 fill-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    Automation Rush: Packet Catcher
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md leading-relaxed">
                    Switch across 3 pipelines to catch data tokens:{' '}
                    <span className="text-amber-400">⚡ Zapier (+15)</span>,{' '}
                    <span className="text-indigo-400">💳 Stripe (+15)</span>,{' '}
                    <span className="text-emerald-400">🟢 Webhook (+20)</span>,{' '}
                    <span className="text-pink-400">🤖 AI (+25)</span>. Dodge corrupted{' '}
                    <span className="text-rose-400">🔴 red bugs!</span>
                  </p>
                  
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={startGame}
                      className="bg-[#eb3e35] hover:bg-[#d83229] active:scale-95 text-white font-mono text-xs font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-rose-500/30 flex items-center gap-2 cursor-pointer transition-all uppercase"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>START RUSH (CLICK TO PLAY)</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        sounds.playCoin();
                        onUnlockResume();
                      }}
                      className="bg-purple-950/80 hover:bg-purple-900 border border-purple-700/60 text-purple-200 font-mono text-xs font-medium px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>Skip to Resume</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Overlay: Won Screen */}
              {gameState === 'won' && (
                <div className="absolute inset-0 bg-[#080712]/92 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-20">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-emerald-500 flex items-center justify-center text-slate-900 mb-3 shadow-lg shadow-emerald-500/30">
                    <Sparkles className="w-8 h-8 fill-slate-900" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-amber-300 tracking-tight">
                    100 Points! Automation Pipeline Stable!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md">
                    You caught all the enterprise payload packets. Mary's complete verified resume is now unlocked!
                  </p>
                  
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        sounds.playCoin();
                        onUnlockResume();
                      }}
                      className="bg-[#eb3e35] hover:bg-[#d83229] active:scale-95 text-white font-semibold text-xs px-6 py-2.5 rounded-xl shadow-lg shadow-rose-500/30 flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <span>Open Mary's Resume PDF ↗</span>
                    </button>
                    
                    <button
                      onClick={startGame}
                      className="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-mono text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Play Again</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* 3 Clickable Lane Buttons below Arena */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-3">
              <button
                onClick={() => moveLane(0)}
                className={`py-2 px-2 rounded-xl font-mono text-xs font-semibold transition-all border cursor-pointer flex items-center justify-center gap-1.5 ${
                  playerLane === 0
                    ? 'bg-purple-900/60 border-purple-400 text-white shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                    : 'bg-black/30 border-purple-900/40 text-slate-400 hover:text-white hover:bg-purple-950/40'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${playerLane === 0 ? 'bg-purple-400' : 'bg-slate-600'}`}></span>
                <span>LANE 1 (Left)</span>
              </button>

              <button
                onClick={() => moveLane(1)}
                className={`py-2 px-2 rounded-xl font-mono text-xs font-semibold transition-all border cursor-pointer flex items-center justify-center gap-1.5 ${
                  playerLane === 1
                    ? 'bg-purple-900/60 border-purple-400 text-white shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                    : 'bg-black/30 border-purple-900/40 text-slate-400 hover:text-white hover:bg-purple-950/40'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${playerLane === 1 ? 'bg-purple-400' : 'bg-slate-600'}`}></span>
                <span>LANE 2 (Mid)</span>
              </button>

              <button
                onClick={() => moveLane(2)}
                className={`py-2 px-2 rounded-xl font-mono text-xs font-semibold transition-all border cursor-pointer flex items-center justify-center gap-1.5 ${
                  playerLane === 2
                    ? 'bg-purple-900/60 border-purple-400 text-white shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                    : 'bg-black/30 border-purple-900/40 text-slate-400 hover:text-white hover:bg-purple-950/40'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${playerLane === 2 ? 'bg-purple-400' : 'bg-slate-600'}`}></span>
                <span>LANE 3 (Right)</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
