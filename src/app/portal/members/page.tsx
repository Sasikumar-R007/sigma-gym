"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Users,
  Search,
  Plus,
  Phone,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  X,
  CreditCard,
  CalendarCheck,
  ShieldCheck,
} from "lucide-react";
import { SeedMember, SeedPlan } from "@/lib/db/seedData";

export default function MembersPage() {
  const [members, setMembers] = useState<SeedMember[]>([]);
  const [plans, setPlans] = useState<SeedPlan[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);

  // New Member Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "CASH" | "CARD">("UPI");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const url = `/api/members?status=${statusFilter}${search ? `&search=${encodeURIComponent(search)}` : ""}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.members) {
        setMembers(data.members);
      }
    } catch {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMembers();
  };

  const openNewMemberModal = () => {
    setIsModalOpen(true);
    setFormError("");
  };

  const handleRegisterMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!fullName.trim() || !phone.trim()) {
      setFormError("Full Name and Phone number are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          gender,
          phone,
          email,
          emergencyContactName: emergencyName,
          emergencyContactPhone: emergencyPhone,
          planId: selectedPlanId || "plan-iv-2",
          amountPaid: Number(amountPaid) || 0,
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to register member.");

      setIsModalOpen(false);
      // Reset form
      setFullName("");
      setPhone("");
      setEmail("");
      setAmountPaid("");
      fetchMembers();
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "Error creating member.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-vault-lime uppercase tracking-widest mb-1.5">
            <Users className="w-3.5 h-3.5" />
            <span>MODULE 1: MEMBER CRM</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading tracking-tight">
            Member Management Directory
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Track member profiles, active subscriptions, payment dues & check-in status.
          </p>
        </div>

        <button
          onClick={openNewMemberModal}
          className="px-5 py-2.5 rounded-xl bg-vault-lime text-black font-extrabold uppercase text-xs tracking-wider shadow-lime-glow hover:bg-vault-limeHover transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4 text-black" />
          <span>Register New Member</span>
        </button>
      </div>

      {/* Search & Status Filter Bar */}
      <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, phone (+91), or member code..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700/80 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-vault-lime"
          />
        </form>

        {/* Status Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-zinc-950 border border-zinc-800 text-xs">
          {[
            { id: "ALL", label: "All Members" },
            { id: "ACTIVE", label: "Active" },
            { id: "EXPIRING_SOON", label: "Expiring Soon" },
            { id: "EXPIRED", label: "Expired" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase transition-all ${
                statusFilter === tab.id
                  ? "bg-zinc-800 text-white shadow-sm border border-zinc-700"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* Member Directory Table */}
      <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950 text-zinc-400 font-bold uppercase tracking-wider text-[10px] border-b border-zinc-800">
              <tr>
                <th className="py-3.5 px-4">Member Info</th>
                <th className="py-3.5 px-4">Code</th>
                <th className="py-3.5 px-4">Active Plan</th>
                <th className="py-3.5 px-4">Expiry Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Balance Due</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-zinc-400">
                    Loading tenant members...
                  </td>
                </tr>
              ) : members.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-zinc-400">
                    No members found matching your search.
                  </td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr key={member.id} className="hover:bg-zinc-800/30 transition-colors">
                    
                    {/* Member Info & Photo */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-9 h-9 rounded-full overflow-hidden bg-zinc-800 border border-zinc-700 shrink-0">
                          <Image
                            src={member.photoUrl}
                            alt={member.fullName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-white text-xs font-heading">
                            {member.fullName}
                          </div>
                          <div className="text-[11px] text-zinc-400 flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3 text-vault-lime" />
                            <span>{member.phone}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Member Code */}
                    <td className="py-3.5 px-4 font-mono font-bold text-vault-lime text-[11px]">
                      {member.memberCode}
                    </td>

                    {/* Active Plan */}
                    <td className="py-3.5 px-4 text-zinc-300 font-medium">
                      {member.activePlanName}
                    </td>

                    {/* Plan Expiry Date */}
                    <td className="py-3.5 px-4 font-mono text-zinc-300">
                      {member.planExpiryDate}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          member.status === "ACTIVE"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : member.status === "EXPIRING_SOON"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                            : "bg-red-500/10 text-red-400 border border-red-500/30"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        <span>{member.status.replace("_", " ")}</span>
                      </span>
                    </td>

                    {/* Balance Due */}
                    <td className="py-3.5 px-4">
                      {member.balanceDue > 0 ? (
                        <span className="font-mono font-bold text-amber-400">
                          ₹{member.balanceDue.toLocaleString("en-IN")}
                        </span>
                      ) : (
                        <span className="font-mono text-emerald-400 text-[11px]">
                          Nil (Paid)
                        </span>
                      )}
                    </td>

                    {/* Quick Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={`https://wa.me/${member.phone.replace(/\D/g, "")}?text=Hi%20${encodeURIComponent(member.fullName)},%20greeting%20from%20your%20gym!`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-semibold text-[11px] transition-colors"
                      >
                        Message
                      </a>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Register New Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="max-w-xl w-full p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-vault-lime/20 flex items-center justify-center text-vault-lime">
                  <Plus className="w-5 h-5 text-vault-lime" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white font-heading">
                    Register New Member
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Add member details, assign membership & record initial fee.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleRegisterMember} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sumanth Kumar"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Gender *
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime"
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Phone (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="sumanth@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime"
                  />
                </div>
              </div>

              {/* Plan Selection */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Assign Membership Package *
                </label>
                <select
                  value={selectedPlanId}
                  onChange={(e) => setSelectedPlanId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime"
                >
                  <option value="plan-iv-2">Quarterly Athletic Transformation (90 Days - ₹8,999)</option>
                  <option value="plan-iv-1">Monthly Strength Foundation (30 Days - ₹3,499)</option>
                  <option value="plan-iv-3">Annual Vault Black Elite (365 Days - ₹26,999)</option>
                </select>
              </div>

              {/* Initial Fee Collection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-800">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Amount Collected Now (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 5000"
                    value={amountPaid}
                    onChange={(e) => setAmountPaid(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Payment Method
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime"
                  >
                    <option value="UPI">UPI (GPay / PhonePe / QR)</option>
                    <option value="CASH">Cash</option>
                    <option value="CARD">Credit / Debit Card (POS)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 font-bold text-xs hover:bg-zinc-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-vault-lime text-black font-extrabold uppercase text-xs tracking-wider shadow-lime-glow hover:bg-vault-limeHover transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Enrolling Member..." : "Confirm Enrollment"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

