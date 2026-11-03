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
  Edit2,
  Image as ImageIcon,
  ShieldCheck,
  FileText,
  DollarSign,
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
  const [gender, setGender] = useState<"MALE" | "FEMALE" | "OTHER">("MALE");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "CASH" | "CARD">("UPI");
  const [joinedDate, setJoinedDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [photoUrl, setPhotoUrl] = useState("");
  const [idProofType, setIdProofType] = useState("Aadhaar");
  const [idProofNumber, setIdProofNumber] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit Member Modal State
  const [editingMember, setEditingMember] = useState<SeedMember | null>(null);
  const [editFullName, setEditFullName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editStatus, setEditStatus] = useState<SeedMember["status"]>("ACTIVE");
  const [editExpiryDate, setEditExpiryDate] = useState("");
  const [editBalanceDue, setEditBalanceDue] = useState("");
  const [editEmergencyName, setEditEmergencyName] = useState("");
  const [editEmergencyPhone, setEditEmergencyPhone] = useState("");
  const [editBloodGroup, setEditBloodGroup] = useState("O+");
  const [editPhotoUrl, setEditPhotoUrl] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Quick Fee Collection Modal State
  const [quickPayMember, setQuickPayMember] = useState<SeedMember | null>(null);
  const [quickPayAmount, setQuickPayAmount] = useState("");
  const [quickPayMethod, setQuickPayMethod] = useState<"UPI" | "CASH" | "CARD">("UPI");
  const [quickPayRef, setQuickPayRef] = useState("");
  const [isRecordingPay, setIsRecordingPay] = useState(false);

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

  const fetchPlans = async () => {
    try {
      const res = await fetch("/api/plans");
      const data = await res.json();
      if (data.plans) setPlans(data.plans);
    } catch {
      // Ignore
    }
  };

  useEffect(() => {
    fetchMembers();
    fetchPlans();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMembers();
  };

  const openNewMemberModal = () => {
    setIsModalOpen(true);
    setFormError("");
    setJoinedDate(new Date().toISOString().split("T")[0]);
    setPhotoUrl("");
  };

  const openEditModal = (member: SeedMember) => {
    setEditingMember(member);
    setEditFullName(member.fullName);
    setEditPhone(member.phone);
    setEditEmail(member.email || "");
    setEditStatus(member.status);
    setEditExpiryDate(member.planExpiryDate);
    setEditBalanceDue(String(member.balanceDue));
    setEditEmergencyName(member.emergencyContactName || "");
    setEditEmergencyPhone(member.emergencyContactPhone || "");
    setEditBloodGroup(member.bloodGroup || "O+");
    setEditPhotoUrl(member.photoUrl || "");
  };

  const openQuickPay = (member: SeedMember) => {
    setQuickPayMember(member);
    setQuickPayAmount(member.balanceDue > 0 ? String(member.balanceDue) : "3499");
    setQuickPayRef("");
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
          bloodGroup,
          planId: selectedPlanId || (plans[0]?.id || "plan-iv-2"),
          amountPaid: Number(amountPaid) || 0,
          paymentMethod,
          joinedAt: joinedDate,
          photoUrl: photoUrl || undefined,
          idProofType,
          idProofNumber,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to register member.");

      setIsModalOpen(false);
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

  const handleUpdateMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    setIsUpdating(true);
    try {
      const res = await fetch("/api/members", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingMember.id,
          fullName: editFullName,
          phone: editPhone,
          email: editEmail,
          status: editStatus,
          planExpiryDate: editExpiryDate,
          balanceDue: Number(editBalanceDue) || 0,
          emergencyContactName: editEmergencyName,
          emergencyContactPhone: editEmergencyPhone,
          bloodGroup: editBloodGroup,
          photoUrl: editPhotoUrl,
        }),
      });

      if (res.ok) {
        setEditingMember(null);
        fetchMembers();
      }
    } catch {
      // Handle error
    } finally {
      setIsUpdating(false);
    }
  };

  const handleQuickPaySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPayMember || !quickPayAmount) return;

    setIsRecordingPay(true);
    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberId: quickPayMember.id,
          amount: Number(quickPayAmount),
          paymentMethod: quickPayMethod,
          transactionRef: quickPayRef,
          planName: `${quickPayMember.activePlanName} (Fee Collection)`,
        }),
      });

      if (res.ok) {
        setQuickPayMember(null);
        fetchMembers();
      }
    } catch {
      // Handle error
    } finally {
      setIsRecordingPay(false);
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
            Full member profiles, automated ID codes, photo badges, dues tracker & edit records.
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
                          <div className="font-bold text-white text-xs font-heading flex items-center gap-1.5">
                            <span>{member.fullName}</span>
                            {member.bloodGroup && (
                              <span className="text-[9px] font-mono px-1 rounded bg-zinc-800 text-zinc-400">
                                {member.bloodGroup}
                              </span>
                            )}
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

                    {/* Balance Due & Quick Pay */}
                    <td className="py-3.5 px-4">
                      {member.balanceDue > 0 ? (
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-amber-400">
                            ₹{member.balanceDue.toLocaleString("en-IN")}
                          </span>
                          <button
                            onClick={() => openQuickPay(member)}
                            className="px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 font-bold text-[10px] border border-amber-500/40 transition-colors"
                          >
                            Collect
                          </button>
                        </div>
                      ) : (
                        <span className="font-mono text-emerald-400 text-[11px]">
                          Nil (Paid)
                        </span>
                      )}
                    </td>

                    {/* Actions: Edit & Message */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(member)}
                          className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-semibold text-[11px] transition-colors border border-zinc-700 flex items-center gap-1"
                        >
                          <Edit2 className="w-3 h-3 text-vault-lime" />
                          <span>Edit</span>
                        </button>

                        <a
                          href={`https://wa.me/${member.phone.replace(/\D/g, "")}?text=Hi%20${encodeURIComponent(member.fullName)},%20greeting%20from%20your%20gym!`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-semibold text-[11px] transition-colors"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* REGISTER NEW MEMBER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="max-w-2xl w-full p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-vault-lime/20 flex items-center justify-center text-vault-lime">
                  <Plus className="w-5 h-5 text-vault-lime" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white font-heading">
                    Register New Member
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Complete member onboarding with photo, ID proof, dates & initial fee.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
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
              
              {/* Row 1: Legal Name & Gender */}
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

              {/* Row 2: Phone & Email */}
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime font-mono"
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

              {/* Row 3: Joining Date & Blood Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Admission / Joining Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={joinedDate}
                    onChange={(e) => setJoinedDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Blood Group
                  </label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime"
                  >
                    <option value="O+">O Positive (O+)</option>
                    <option value="A+">A Positive (A+)</option>
                    <option value="B+">B Positive (B+)</option>
                    <option value="AB+">AB Positive (AB+)</option>
                    <option value="O-">O Negative (O-)</option>
                    <option value="A-">A Negative (A-)</option>
                    <option value="B-">B Negative (B-)</option>
                    <option value="AB-">AB Negative (AB-)</option>
                  </select>
                </div>
              </div>

              {/* Row 4: ID Proof Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    ID Proof Document
                  </label>
                  <select
                    value={idProofType}
                    onChange={(e) => setIdProofType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime"
                  >
                    <option value="Aadhaar">Aadhaar Card</option>
                    <option value="Driving License">Driving License</option>
                    <option value="Passport">Passport</option>
                    <option value="Voter ID">Voter ID</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    ID Document Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5421 8901 2345"
                    value={idProofNumber}
                    onChange={(e) => setIdProofNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime font-mono"
                  />
                </div>
              </div>

              {/* Row 5: Emergency Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Emergency Contact Person
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Spouse / Parent Name"
                    value={emergencyName}
                    onChange={(e) => setEmergencyName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Emergency Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 99000 11223"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime font-mono"
                  />
                </div>
              </div>

              {/* Row 6: Profile Photo URL / Presets */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Member Profile Photograph (URL or Avatar)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="url"
                    placeholder="Paste image URL (Unsplash or camera photo)..."
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setPhotoUrl(
                        gender === "FEMALE"
                          ? "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop"
                          : "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop"
                      )
                    }
                    className="px-3 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold shrink-0"
                  >
                    Use Sample Photo
                  </button>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-zinc-800">
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

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 font-bold text-xs hover:bg-zinc-700"
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

      {/* EDIT MEMBER MODAL */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="max-w-lg w-full p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-700 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-vault-lime/20 flex items-center justify-center text-vault-lime">
                  <Edit2 className="w-4 h-4 text-vault-lime" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white font-heading">
                    Edit Member Profile
                  </h3>
                  <p className="text-xs text-zinc-400">
                    ID: <strong className="text-vault-lime font-mono">{editingMember.memberCode}</strong>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setEditingMember(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateMember} className="space-y-4">
              
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Full Legal Name
                </label>
                <input
                  type="text"
                  required
                  value={editFullName}
                  onChange={(e) => setEditFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Membership Status
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="EXPIRING_SOON">EXPIRING SOON</option>
                    <option value="EXPIRED">EXPIRED (Locked)</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Plan Expiry Date
                  </label>
                  <input
                    type="date"
                    required
                    value={editExpiryDate}
                    onChange={(e) => setEditExpiryDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Balance Due (₹)
                  </label>
                  <input
                    type="number"
                    value={editBalanceDue}
                    onChange={(e) => setEditBalanceDue(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Profile Photo URL
                </label>
                <input
                  type="url"
                  value={editPhotoUrl}
                  onChange={(e) => setEditPhotoUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-5 py-2 rounded-xl bg-vault-lime text-black font-extrabold text-xs uppercase shadow-lime-glow hover:bg-vault-limeHover disabled:opacity-50"
                >
                  {isUpdating ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* QUICK FEE COLLECTION MODAL */}
      {quickPayMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-700 shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div>
                <h3 className="text-lg font-black text-white font-heading">
                  Collect Member Fee
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Collecting for <strong className="text-white">{quickPayMember.fullName}</strong> ({quickPayMember.memberCode})
                </p>
              </div>
              <button
                onClick={() => setQuickPayMember(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleQuickPaySubmit} className="space-y-4">
              
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                <span className="text-xs text-zinc-400">Current Outstanding Due:</span>
                <span className="text-sm font-mono font-black text-amber-400">
                  ₹{quickPayMember.balanceDue.toLocaleString("en-IN")}
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Collection Amount (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={quickPayAmount}
                  onChange={(e) => setQuickPayAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-vault-lime font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Payment Mode *
                </label>
                <select
                  value={quickPayMethod}
                  onChange={(e) => setQuickPayMethod(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime"
                >
                  <option value="UPI">UPI (Google Pay / PhonePe / QR)</option>
                  <option value="CASH">Cash</option>
                  <option value="CARD">Credit / Debit Card (Card POS)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  UPI / Card Reference ID (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. UPI/9921008761"
                  value={quickPayRef}
                  onChange={(e) => setQuickPayRef(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime font-mono"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setQuickPayMember(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isRecordingPay}
                  className="px-5 py-2 rounded-xl bg-vault-lime text-black font-extrabold text-xs uppercase shadow-lime-glow hover:bg-vault-limeHover disabled:opacity-50"
                >
                  {isRecordingPay ? "Recording..." : "Issue Receipt & Clear Due"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
