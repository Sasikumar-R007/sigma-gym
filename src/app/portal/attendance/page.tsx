"use client";

import React, { useState, useEffect } from "react";
import {
  CalendarCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  QrCode,
  UserCheck,
  ShieldAlert,
} from "lucide-react";
import { SeedAttendance, SeedMember } from "@/lib/db/seedData";

export default function AttendancePage() {
  const [attendanceList, setAttendanceList] = useState<SeedAttendance[]>([]);
  const [members, setMembers] = useState<SeedMember[]>([]);
  const [search, setSearch] = useState("");
  const [selectedMember, setSelectedMember] = useState<SeedMember | null>(null);
  const [alertResult, setAlertResult] = useState<{
    type: "SUCCESS" | "EXPIRED" | "DUPLICATE";
    message: string;
  } | null>(null);
  const [isPunching, setIsPunching] = useState(false);

  const fetchAttendanceAndMembers = async () => {
    try {
      const [attRes, memRes] = await Promise.all([
        fetch("/api/attendance"),
        fetch("/api/members"),
      ]);
      const attData = await attRes.json();
      const memData = await memRes.json();

      if (attData.attendance) setAttendanceList(attData.attendance);
      if (memData.members) setMembers(memData.members);
    } catch {
      // Handle error
    }
  };

  useEffect(() => {
    fetchAttendanceAndMembers();
  }, []);

  const filteredMembers = search.trim()
    ? members.filter(
        (m) =>
          m.fullName.toLowerCase().includes(search.toLowerCase()) ||
          m.memberCode.toLowerCase().includes(search.toLowerCase()) ||
          m.phone.includes(search)
      )
    : [];

  const handlePunchCheckIn = async (member: SeedMember) => {
    setIsPunching(true);
    setAlertResult(null);

    try {
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId: member.id, checkInMethod: "MANUAL" }),
      });

      const data = await res.json();

      if (data.success) {
        setAlertResult({
          type: "SUCCESS",
          message: `Access Granted! ${member.fullName} (${member.memberCode}) successfully checked in.`,
        });
        setSearch("");
        setSelectedMember(null);
        fetchAttendanceAndMembers();
      } else if (data.reason === "MEMBERSHIP_EXPIRED") {
        setAlertResult({
          type: "EXPIRED",
          message: `ACCESS DENIED: ${data.message}`,
        });
      } else if (data.reason === "ALREADY_CHECKED_IN") {
        setAlertResult({
          type: "DUPLICATE",
          message: `NOTE: ${data.message}`,
        });
      }
    } catch {
      // Handle error
    } finally {
      setIsPunching(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-vault-lime uppercase tracking-widest mb-1.5">
          <CalendarCheck className="w-3.5 h-3.5" />
          <span>MODULE 4: ATTENDANCE & ACCESS TERMINAL</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-heading tracking-tight">
          Front-Desk Check-In Terminal
        </h1>
        <p className="text-xs text-zinc-400 mt-0.5">
          Fast-search member check-ins, duplicate entry prevention & instant expiry lockout.
        </p>
      </div>

      {/* Main Terminal Widget */}
      <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-2xl space-y-6">
        
        {/* Rapid Search Bar */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
            Search Member to Punch Check-In (Name, Phone or Code)
          </label>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="e.g. Type 'Rajesh', 'Ananya', or 'IV-1004' to test expiry lockout..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-vault-lime transition-all"
            />
          </div>
        </div>

        {/* Dynamic Search Results Dropdown / Cards */}
        {filteredMembers.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-zinc-800">
            <span className="text-[10px] uppercase font-bold text-zinc-400">
              Matching Members ({filteredMembers.length})
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredMembers.map((m) => (
                <div
                  key={m.id}
                  className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-3 hover:border-zinc-700 transition-all"
                >
                  <div>
                    <div className="font-bold text-white text-xs font-heading">
                      {m.fullName}
                    </div>
                    <div className="text-[11px] font-mono text-vault-lime">
                      {m.memberCode} • {m.phone}
                    </div>
                    <div className="text-[10px] text-zinc-400 mt-1">
                      Status:{" "}
                      <strong
                        className={
                          m.status === "ACTIVE"
                            ? "text-emerald-400"
                            : m.status === "EXPIRED"
                            ? "text-red-400"
                            : "text-amber-400"
                        }
                      >
                        {m.status}
                      </strong>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePunchCheckIn(m)}
                    disabled={isPunching}
                    className="shrink-0 px-3.5 py-2 rounded-xl bg-vault-lime text-black font-extrabold uppercase text-[11px] tracking-wider shadow-sm hover:bg-vault-limeHover transition-all disabled:opacity-50"
                  >
                    Check In
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Live Result Alert Banner */}
        {alertResult && (
          <div
            className={`p-4 rounded-2xl border flex items-center gap-3 animate-fadeIn ${
              alertResult.type === "SUCCESS"
                ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                : alertResult.type === "EXPIRED"
                ? "bg-red-500/10 border-red-500/40 text-red-400"
                : "bg-amber-500/10 border-amber-500/40 text-amber-400"
            }`}
          >
            {alertResult.type === "SUCCESS" && <CheckCircle2 className="w-5 h-5 shrink-0" />}
            {alertResult.type === "EXPIRED" && <ShieldAlert className="w-5 h-5 shrink-0" />}
            {alertResult.type === "DUPLICATE" && <AlertTriangle className="w-5 h-5 shrink-0" />}
            <span className="text-xs font-bold leading-relaxed">{alertResult.message}</span>
          </div>
        )}

      </div>

      {/* Today's Check-ins Log */}
      <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-vault-lime" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white font-heading">
              Today&apos;s Verified Floor Check-Ins ({attendanceList.length})
            </h3>
          </div>
          <span className="text-xs text-zinc-400 font-mono">
            Front Desk Log
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Member Name</th>
                <th className="py-3 px-4">Member ID</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4 text-right">Verified By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {attendanceList.map((att) => (
                <tr key={att.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-white">
                    {att.memberName}
                  </td>
                  <td className="py-3 px-4 font-mono text-vault-lime text-[11px]">
                    {att.memberCode}
                  </td>
                  <td className="py-3 px-4 text-zinc-300">
                    {att.checkInTime}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-900 border border-zinc-700 text-zinc-300">
                      {att.checkInMethod === "QR_CODE" ? <QrCode className="w-3 h-3 text-vault-lime" /> : <UserCheck className="w-3 h-3" />}
                      <span>{att.checkInMethod}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-zinc-400 font-mono text-[11px]">
                    {att.markedBy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

