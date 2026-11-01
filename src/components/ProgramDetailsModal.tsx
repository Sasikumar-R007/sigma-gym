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
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full bg-zinc-950 border border-zinc-700 rounded-2xl overflow-hidden shadow-2xl my-8 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/80 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-vault-lime hover:border-vault-lime transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Hero Image */}
        <div className="relative h-64 sm:h-72 w-full">
          <Image
            src={program.image}
            alt={program.title}
            fill
            className="object-cover object-center filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-vault-lime px-2 py-0.5 rounded bg-black/80 border border-vault-lime/30">
              {program.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-heading mt-1">
              {program.title}
            </h3>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Key Metas */}
          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
            <div>
              <div className="text-[10px] text-zinc-400 uppercase font-bold">Session Duration</div>
              <div className="text-sm font-black text-white font-heading mt-0.5 flex items-center justify-center gap-1">
                <Clock className="w-3.5 h-3.5 text-vault-lime" />
                <span>{program.duration}</span>
              </div>
            </div>
            <div className="border-x border-zinc-800">
              <div className="text-[10px] text-zinc-400 uppercase font-bold">Calorie Burn</div>
              <div className="text-sm font-black text-orange-400 font-heading mt-0.5 flex items-center justify-center gap-1">
                <Flame className="w-3.5 h-3.5" />
                <span>{program.caloriesBurned}</span>
              </div>
            </div>
            <div>
              <div className="text-[10px] text-zinc-400 uppercase font-bold">Intensity Rating</div>
              <div className="text-sm font-black text-vault-lime font-heading mt-0.5">
                {program.intensity}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
              Curriculum Overview
            </h4>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {program.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Syllabus Highlights
            </h4>
            <div className="space-y-1.5">
              {program.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-200">
                  <CheckCircle2 className="w-4 h-4 text-vault-lime shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hardware Implements Used */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Equipment Roster
            </h4>
            <div className="flex flex-wrap gap-2">
              {program.equipment.map((eq, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-900 text-zinc-300 border border-zinc-700"
                >
                  ⚡ {eq}
                </span>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className="p-3 rounded-lg bg-black/60 border border-zinc-800 flex items-center gap-2 text-xs text-zinc-300">
            <Calendar className="w-4 h-4 text-vault-lime shrink-0" />
            <span>Class Timings: {program.schedule}</span>
          </div>

          {/* CTA */}
          <div className="pt-2">
            <button
              onClick={() => {
                onClose();
                onBook(program.title);
              }}
              className="w-full py-3.5 rounded-xl bg-vault-lime text-black font-extrabold uppercase text-xs tracking-wider hover:bg-vault-limeHover transition-all flex items-center justify-center gap-2 shadow-lime-glow"
            >
              <span>Book Free Trial Session For {program.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

