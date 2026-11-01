"use client";

import React, { useState } from "react";
import { X, Play, Pause, Volume2, VolumeX } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTrial: () => void;
}

export default function VideoModal({ isOpen, onClose, onOpenTrial }: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full bg-zinc-950 border border-zinc-700/80 rounded-2xl overflow-hidden shadow-2xl max-h-[88vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          aria-label="Close video"
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/80 border border-zinc-700 flex items-center justify-center text-white hover:text-vault-lime hover:border-vault-lime transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Video Canvas / Mockup */}
        <div className="relative aspect-video w-full max-h-[56vh] bg-black flex items-center justify-center overflow-hidden shrink-0">
          {/* Simulated Cinematic Video Feed */}
          <div
            className="absolute inset-0 bg-cover bg-center filter brightness-90 animate-pulse-slow"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

          {/* Central Play/Pause Watermark */}
          <div className="relative z-10 text-center space-y-2 p-4 max-w-md">
            <div className="w-12 h-12 rounded-full bg-vault-lime/20 border-2 border-vault-lime flex items-center justify-center text-vault-lime mx-auto shadow-lime-glow animate-pulse">
              <Play className="w-5 h-5 fill-vault-lime translate-x-0.5" />
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-vault-lime font-bold">
                CINEMATIC TOUR · 4K UHD
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white font-heading mt-0.5">
                INSIDE THE IRONVAULT
              </h3>
              <p className="text-xs text-zinc-300">
                12,000 sq.ft. of Eleiko platforms, Arsenal Strength leverage units, and the Contrast Recovery Spa in Indiranagar.
              </p>
            </div>
          </div>

          {/* Bottom Video Controls Mockup */}
          <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-xs text-zinc-300 bg-black/70 backdrop-blur-md px-3.5 py-2 rounded-xl border border-zinc-800">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="hover:text-vault-lime"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="hover:text-vault-lime"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
              <span className="font-mono text-[10px] text-zinc-400">01:42 / 03:15</span>
            </div>

            {/* Simulated Progress Bar */}
            <div className="hidden sm:block flex-1 mx-4 h-1 bg-zinc-700 rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-vault-lime" />
            </div>

            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-zinc-800 text-zinc-300">
                1080p 60FPS
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer Call To Action */}
        <div className="p-4 sm:p-5 bg-zinc-950 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-zinc-400 text-center sm:text-left">
            Experience the atmosphere in person. Book your 3-day VIP trial pass today.
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenTrial();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-vault-lime text-black font-extrabold uppercase text-xs tracking-wider hover:bg-vault-limeHover transition-all shadow-lime-glow shrink-0"
          >
            Claim 3-Day Pass
          </button>
        </div>
      </div>
    </div>
  );
}
