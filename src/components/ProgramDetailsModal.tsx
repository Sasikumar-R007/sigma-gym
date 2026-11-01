"use client";

import React from "react";
import Image from "next/image";
import { X, Clock, Flame, Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import { Program } from "@/data/gymData";

interface ProgramDetailsModalProps {
  program: Program | null;
  onClose: () => void;
  onBook: (programTitle: string) => void;
}

export default function ProgramDetailsModal({ program, onClose, onBook }: ProgramDetailsModalProps) {
  if (!program) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-xl w-full bg-zinc-950 border border-zinc-700/80 rounded-2xl overflow-hidden shadow-2xl text-white max-h-[88vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/80 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-vault-lime hover:border-vault-lime transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Hero Image */}
        <div className="relative h-40 sm:h-48 w-full shrink-0">
          <Image
            src={program.image}
            alt={program.title}
            fill
            className="object-cover object-center filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

          <div className="absolute bottom-3 left-5 right-5">
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-vault-lime px-2 py-0.5 rounded bg-black/80 border border-vault-lime/30">
              {program.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white font-heading mt-0.5">
              {program.title}
            </h3>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {/* Key Metas */}
          <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
            <div>
              <div className="text-[9px] text-zinc-400 uppercase font-bold">Duration</div>
              <div className="text-xs sm:text-sm font-black text-white font-heading mt-0.5 flex items-center justify-center gap-1">
                <Clock className="w-3 h-3 text-vault-lime" />
                <span>{program.duration}</span>
              </div>
            </div>
            <div className="border-x border-zinc-800">
              <div className="text-[9px] text-zinc-400 uppercase font-bold">Burn</div>
              <div className="text-xs sm:text-sm font-black text-orange-400 font-heading mt-0.5 flex items-center justify-center gap-1">
                <Flame className="w-3 h-3" />
                <span>{program.caloriesBurned}</span>
              </div>
            </div>
            <div>
              <div className="text-[9px] text-zinc-400 uppercase font-bold">Intensity</div>
              <div className="text-xs sm:text-sm font-black text-vault-lime font-heading mt-0.5">
                {program.intensity}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
              Curriculum Overview
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {program.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-1.5">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Syllabus Highlights
            </h4>
            <div className="space-y-1">
              {program.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-zinc-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-vault-lime shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hardware Implements Used */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
              Equipment Roster
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {program.equipment.map((eq, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-900 text-zinc-300 border border-zinc-700"
                >
                  ⚡ {eq}
                </span>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className="p-2.5 rounded-lg bg-black/60 border border-zinc-800 flex items-center gap-2 text-xs text-zinc-300">
            <Calendar className="w-3.5 h-3.5 text-vault-lime shrink-0" />
            <span>Class Timings: {program.schedule}</span>
          </div>

          {/* CTA */}
          <div className="pt-2">
            <button
              onClick={() => {
                onClose();
                onBook(program.title);
              }}
              className="w-full py-3 rounded-full bg-vault-lime text-black font-extrabold uppercase text-xs tracking-wider hover:bg-vault-limeHover transition-all flex items-center justify-center gap-2 shadow-lime-glow"
            >
              <span>Book Free Trial Session For {program.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
