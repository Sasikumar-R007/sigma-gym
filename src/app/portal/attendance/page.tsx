"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  CalendarCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  QrCode,
  UserCheck,
  ShieldAlert,
  Zap,
  Camera,
  Sparkles,
} from "lucide-react";
import { SeedAttendance, SeedMember } from "@/lib/db/seedData";

export default function AttendancePage() {
  const [attendanceList, setAttendanceList] = useState<SeedAttendance[]>([]);
  const [members, setMembers] = useState<SeedMember[]>([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"QUICK_TAP" | "QR_SCANNER">("QUICK_TAP");
  const [alertResult, setAlertResult] = useState<{
    type: "SUCCESS" | "EXPIRED" | "DUPLICATE";
    message: string;
    memberName?: string;
  } | null>(null);
  const [isScanning, setIsScanning] = useState(false);

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

  const handlePunchCheckIn = async (member: SeedMember, method: "MANUAL" | "QR_CODE" = "MANUAL") => {
    setAlertResult(null);

    try {
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId: member.id, checkInMethod: method }),
      });

      const data = await res.json();

      if (data.success) {
        setAlertResult({
          type: "SUCCESS",
          message: `ACCESS GRANTED: Verified active member ${member.fullName} (${member.memberCode}). Gate unlocked.`,
          memberName: member.fullName,
        });
        fetchAttendanceAndMembers();
      } else if (data.reason === "MEMBERSHIP_EXPIRED") {
        setAlertResult({
          type: "EXPIRED",
          message: `ACCESS DENIED: Membership expired on ${member.planExpiryDate}. Please renew to enter.`,
          memberName: member.fullName,
        });
      } else if (data.reason === "ALREADY_CHECKED_IN") {
        setAlertResult({
          type: "DUPLICATE",
          message: `DUPLICATE ATTEMPT: ${member.fullName} has already punched in today.`,
          memberName: member.fullName,
        });
      }
    } catch {
      // Handle error
    }
  };

  const handleSimulateQRScan = (memberId: string) => {
    const member = members.find((m) => m.id === memberId);
    if (!member) return;

    setIsScanning(true);
    setAlertResult(null);

    setTimeout(() => {
      setIsScanning(false);
      handlePunchCheckIn(member, "QR_CODE");
    }, 700);
  };

  const filteredMembers = members.filter(
    (m) =>
      !search.trim() ||
      m.fullName.toLowerCase().includes(search.toLowerCase()) ||
      m.memberCode.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.includes(search)
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-vault-lime uppercase tracking-widest mb-1.5">
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>MODULE 4: ATTENDANCE & ACCESS TERMINAL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading tracking-tight">
            Front-Desk Smart Access Terminal
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            1-Tap member punch in, optical QR pass scanning, and automated expiry lockout.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
          <button
            onClick={() => setActiveTab("QUICK_TAP")}
            className={`px-3.5 py-2 rounded-lg font-bold uppercase transition-all flex items-center gap-1.5 ${
              activeTab === "QUICK_TAP"
                ? "bg-vault-lime text-black shadow-lime-glow/30"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>1-Tap Member Punch</span>
          </button>

          <button
            onClick={() => setActiveTab("QR_SCANNER")}
            className={`px-3.5 py-2 rounded-lg font-bold uppercase transition-all flex items-center gap-1.5 ${
              activeTab === "QR_SCANNER"
                ? "bg-vault-lime text-black shadow-lime-glow/30"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Optical QR Scanner</span>
          </button>
        </div>
      </div>

      {/* Live Result Alert Banner */}
      {alertResult && (
        <div
          className={`p-5 rounded-2xl border flex items-center gap-4 animate-fadeIn shadow-2xl ${
            alertResult.type === "SUCCESS"
              ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400"
              : alertResult.type === "EXPIRED"
              ? "bg-red-500/15 border-red-500/40 text-red-400"
              : "bg-amber-500/15 border-amber-500/40 text-amber-400"
          }`}
        >
          {alertResult.type === "SUCCESS" && <CheckCircle2 className="w-7 h-7 shrink-0 text-emerald-400" />}
          {alertResult.type === "EXPIRED" && <ShieldAlert className="w-7 h-7 shrink-0 text-red-400 animate-bounce" />}
          {alertResult.type === "DUPLICATE" && <AlertTriangle className="w-7 h-7 shrink-0 text-amber-400" />}
          <div>
            <div className="text-sm font-black font-heading uppercase tracking-wide">
              {alertResult.type === "SUCCESS" ? "Access Approved" : alertResult.type === "EXPIRED" ? "Access Rejected – Expired Membership" : "Duplicate Punch Warning"}
            </div>
            <div className="text-xs font-semibold mt-0.5 text-zinc-200">
              {alertResult.message}
            </div>
          </div>
        </div>
      )}

      {/* MODE 1: 1-TAP QUICK PUNCH GRID */}
      {activeTab === "QUICK_TAP" && (
        <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-2xl space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white font-heading">
                Tap Member to Punch In
              </h3>
              <p className="text-xs text-zinc-400">
                Click any member card to instantly record check-in time.
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter members..."
                className="w-full pl-10 pr-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-vault-lime"
              />
            </div>
          </div>

          {/* Quick-Tap Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredMembers.map((m) => {
              const isExpired = m.status === "EXPIRED";
              return (
                <div
                  key={m.id}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    isExpired
                      ? "bg-red-500/5 border-red-500/30"
                      : "bg-zinc-950/80 border-zinc-800 hover:border-vault-lime/50"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-800 border border-zinc-700 shrink-0">
                      <Image src={m.photoUrl} alt={m.fullName} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-white text-xs font-heading truncate">
                        {m.fullName}
                      </div>
                      <div className="text-[11px] font-mono text-vault-lime">
                        {m.memberCode}
                      </div>
                      <div className="text-[10px] text-zinc-400 truncate mt-0.5">
                        {m.activePlanName}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePunchCheckIn(m, "MANUAL")}
                    className={`shrink-0 px-3 py-2 rounded-xl font-extrabold uppercase text-[11px] tracking-wider transition-all shadow-sm ${
                      isExpired
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-vault-lime text-black hover:bg-vault-limeHover active:scale-95"
                    }`}
                  >
                    {isExpired ? "Test Lockout" : "Punch In"}
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* MODE 2: OPTICAL QR CODE SCANNER SIMULATOR */}
      {activeTab === "QR_SCANNER" && (
        <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-2xl space-y-6">
          <div className="max-w-md mx-auto text-center space-y-4">
            
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-800 text-xs font-mono text-vault-lime border border-zinc-700">
              <Camera className="w-3.5 h-3.5" />
              <span>TERMINAL CAMERA FEED SIMULATOR</span>
            </div>

            {/* Glowing Viewfinder Box */}
            <div className="relative w-72 h-72 mx-auto rounded-3xl bg-black border-2 border-dashed border-vault-lime/60 flex items-center justify-center overflow-hidden shadow-lime-glow/20 shadow-2xl">
              
              {/* Animated Laser Scanning Line */}
              <div
                className={`absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-vault-lime to-transparent shadow-lime-glow transition-all ${
                  isScanning ? "animate-bounce" : "animate-pulse"
                }`}
              />

              <div className="p-6 text-center space-y-2">
                <QrCode className="w-20 h-20 text-zinc-600 mx-auto" />
                <span className="text-[11px] text-zinc-400 block font-mono">
                  {isScanning ? "Decoding Member QR..." : "Align Member Pass QR in Frame"}
                </span>
              </div>
            </div>

            {/* Trigger Simulation dropdown */}
            <div className="pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                Simulate Scanning Digital Guest / Member Pass:
              </label>
              <div className="flex items-center gap-2">
                <select
                  id="scannerMemberSelect"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime"
                >
                  <option value="mem-iv-1">Rajesh Kannan (IV-1001 - Active Annual Pass)</option>
                  <option value="mem-iv-2">Meera Nambiar (IV-1002 - Active Quarterly Pass)</option>
                  <option value="mem-iv-4">Ananya Swaminathan (IV-1004 - EXPIRED PASS)</option>
                </select>
                <button
                  onClick={() => {
                    const sel = (document.getElementById("scannerMemberSelect") as HTMLSelectElement).value;
                    handleSimulateQRScan(sel);
                  }}
                  disabled={isScanning}
                  className="px-5 py-2.5 rounded-xl bg-vault-lime text-black font-extrabold uppercase text-xs tracking-wider shadow-lime-glow hover:bg-vault-limeHover transition-all shrink-0 disabled:opacity-50"
                >
                  {isScanning ? "Scanning..." : "Scan Pass"}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

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
            Entrance Gate Log
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
                <th className="py-3 px-4 text-right">Gate Status</th>
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
                  <td className="py-3 px-4 text-right">
                    <span className="text-[11px] text-emerald-400 font-semibold flex items-center justify-end gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Unlocked</span>
                    </span>
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
