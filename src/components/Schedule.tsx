"use client";

import React, { useState } from "react";
import { Calendar, Clock, MapPin, User, ArrowRight } from "lucide-react";
import { GYM_DATA, ScheduleItem } from "@/data/gymData";

interface ScheduleProps {
  onOpenTrial: (className?: string) => void;
}

export default function Schedule({ onOpenTrial }: ScheduleProps) {
  const [selectedDay, setSelectedDay] = useState<ScheduleItem["day"]>("Mon");

  const days: { id: ScheduleItem["day"]; label: string; full: string }[] = [
    { id: "Mon", label: "MON", full: "Monday" },
    { id: "Tue", label: "TUE", full: "Tuesday" },
    { id: "Wed", label: "WED", full: "Wednesday" },
    { id: "Thu", label: "THU", full: "Thursday" },
    { id: "Fri", label: "FRI", full: "Friday" },
    { id: "Sat", label: "SAT", full: "Saturday" },
    { id: "Sun", label: "SUN", full: "Sunday" },
  ];

  const dailyClasses = GYM_DATA.schedule.filter((item) => item.day === selectedDay);

  return (
    <section id="schedule" className="py-24 bg-[#070708] relative overflow-hidden border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700/80 text-xs font-bold text-vault-lime uppercase tracking-widest mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>LIVE WEEKLY TIMETABLE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-heading">
            TRAIN WITH PURPOSE. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-vault-lime via-white to-zinc-400">
              EXPLORE OUR MASTER ROSTER.
            </span>
          </h2>
          <p className="mt-4 text-zinc-300 text-base sm:text-lg leading-relaxed">
            From 6:30 AM Olympic bar lifting to evening Vault Strike boxing rounds, all classes are limited to 12 participants 
            to guarantee focused coach oversight.
          </p>

          {/* Day Selector Tabs */}
          <div className="grid grid-cols-7 gap-1 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-2 mt-6 sm:mt-8 p-1 sm:p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 max-w-md sm:max-w-none mx-auto w-full">
            {days.map((day) => (
              <button
                key={day.id}
                onClick={() => setSelectedDay(day.id)}
                className={`py-2 px-1 sm:px-4 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wider text-center transition-all duration-200 ${
                  selectedDay === day.id
                    ? "bg-vault-lime text-black shadow-lime-glow/50"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
              >
                <span>{day.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Classes Table / Cards */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {dailyClasses.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-vault-lime/50 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                {/* Time Badge */}
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-vault-lime font-mono font-bold text-sm shrink-0 w-fit">
                  <Clock className="w-4 h-4" />
                  <span>{item.time}</span>
                  <span className="text-[10px] text-zinc-400 font-sans">({item.duration})</span>
                </div>

                {/* Class Details */}
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-bold text-white font-heading group-hover:text-vault-lime transition-colors">
                      {item.className}
                    </h4>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        item.intensity === "Extreme"
                          ? "bg-red-500/20 text-red-400 border border-red-500/30"
                          : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                      }`}
                    >
                      {item.intensity}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 mt-1.5">
                    <div className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-zinc-300" />
                      <span className="text-zinc-300 font-medium">{item.trainer}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-300" />
                      <span>{item.room}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0 pt-2 md:pt-0">
                <button
                  onClick={() => onOpenTrial(`Class: ${item.className} (${selectedDay} ${item.time})`)}
                  className="w-full md:w-auto px-5 py-2.5 rounded-lg bg-zinc-800 hover:bg-vault-lime hover:text-black text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 border border-zinc-700 hover:border-vault-lime flex items-center justify-center gap-1.5"
                >
                  <span>Reserve Free Spot</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Timetable note */}
        <p className="text-center text-xs text-zinc-400 mt-8">
          IronVault members can book up to 7 days in advance via the mobile iOS & Android club app.
        </p>

      </div>
    </section>
  );
}

