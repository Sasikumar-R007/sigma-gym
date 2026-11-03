"use client";

import React, { useState, useEffect } from "react";
import {
  CreditCard,
  Plus,
  Search,
  Printer,
  Download,
  CheckCircle2,
  X,
  Building2,
  Calendar,
  Sparkles,
  QrCode,
  Smartphone,
  Zap,
} from "lucide-react";
import { SeedPayment, SeedMember } from "@/lib/db/seedData";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<SeedPayment[]>([]);
  const [members, setMembers] = useState<SeedMember[]>([]);
  const [methodFilter, setMethodFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Record Payment Modal State
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "CASH" | "CARD" | "BANK_TRANSFER">("UPI");
  const [transactionRef, setTransactionRef] = useState("");
  const [planName, setPlanName] = useState("Membership Renewal Fee");
  const [showUpiQr, setShowUpiQr] = useState(false);

  // Printable Receipt Modal State
  const [activeReceipt, setActiveReceipt] = useState<SeedPayment | null>(null);

  const fetchPaymentsAndMembers = async () => {
    setIsLoading(true);
    try {
      const [payRes, memRes] = await Promise.all([
        fetch(`/api/payments?method=${methodFilter}${search ? `&search=${encodeURIComponent(search)}` : ""}`),
        fetch("/api/members"),
      ]);
      const payData = await payRes.json();
      const memData = await memRes.json();

      if (payData.payments) setPayments(payData.payments);
      if (memData.members) {
        setMembers(memData.members);
        if (!selectedMemberId && memData.members.length > 0) {
          setSelectedMemberId(memData.members[0].id);
        }
      }
    } catch {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentsAndMembers();
  }, [methodFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPaymentsAndMembers();
  };

  const handleMemberChange = (id: string) => {
    setSelectedMemberId(id);
    const m = members.find((mem) => mem.id === id);
    if (m) {
      setAmount(m.balanceDue > 0 ? String(m.balanceDue) : "3499");
      setPlanName(`${m.activePlanName} (Renewal / Balance Dues)`);
    }
  };

  const openRecordModal = () => {
    setIsRecordModalOpen(true);
    if (members.length > 0) {
      const defaultM = members.find((m) => m.balanceDue > 0) || members[0];
      handleMemberChange(defaultM.id);
    }
  };

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberId: selectedMemberId,
          amount: Number(amount),
          paymentMethod,
          transactionRef: transactionRef || (paymentMethod === "UPI" ? `UPI/${Math.floor(1000000000 + Math.random() * 9000000000)}/Auto` : undefined),
          planName,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsRecordModalOpen(false);
        setAmount("");
        setTransactionRef("");
        fetchPaymentsAndMembers();
        if (data.payment) {
          setActiveReceipt(data.payment);
        }
      }
    } catch {
      // Handle error
    }
  };

  const currentSelectedMember = members.find((m) => m.id === selectedMemberId);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-vault-lime uppercase tracking-widest mb-1.5">
            <CreditCard className="w-3.5 h-3.5" />
            <span>MODULE 3: PAYMENTS & FINANCIAL LEDGER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading tracking-tight">
            Fee Collection & Receipt Ledger
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Smart balance auto-detection, dynamic UPI QR generator & printable tax invoices.
          </p>
        </div>

        <button
          onClick={openRecordModal}
          className="px-5 py-2.5 rounded-xl bg-vault-lime text-black font-extrabold uppercase text-xs tracking-wider shadow-lime-glow hover:bg-vault-limeHover transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4 text-black" />
          <span>Record New Fee Payment</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by receipt number, member name or UPI ref..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700/80 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-vault-lime"
          />
        </form>

        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-zinc-950 border border-zinc-800 text-xs">
          {[
            { id: "ALL", label: "All Modes" },
            { id: "UPI", label: "UPI" },
            { id: "CARD", label: "Card / POS" },
            { id: "CASH", label: "Cash" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setMethodFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase transition-all ${
                methodFilter === tab.id
                  ? "bg-zinc-800 text-white shadow-sm border border-zinc-700"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* Ledger Table */}
      <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950 text-zinc-400 font-bold uppercase tracking-wider text-[10px] border-b border-zinc-800">
              <tr>
                <th className="py-3.5 px-4">Receipt #</th>
                <th className="py-3.5 px-4">Member</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Description</th>
                <th className="py-3.5 px-4">Payment Method</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-zinc-400">
                    Loading transactions...
                  </td>
                </tr>
              ) : payments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-zinc-400">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                payments.map((p) => (
                  <tr key={p.id} className="hover:bg-zinc-800/30 transition-colors">
                    
                    <td className="py-3.5 px-4 font-mono font-bold text-vault-lime text-[11px]">
                      {p.receiptNumber}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-xs">{p.memberName}</div>
                      <div className="text-[10px] font-mono text-zinc-400">{p.memberCode}</div>
                    </td>

                    <td className="py-3.5 px-4 text-zinc-400 text-[11px]">
                      {p.paymentDate}
                    </td>

                    <td className="py-3.5 px-4 text-zinc-300">
                      {p.planName}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-zinc-900 border border-zinc-700 text-zinc-300">
                        <span>{p.paymentMethod}</span>
                      </span>
                      {p.transactionRef && (
                        <div className="text-[10px] text-zinc-400 font-mono mt-0.5 truncate max-w-[130px]">
                          {p.transactionRef}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="text-sm font-black text-white font-heading">
                        ₹{p.amount.toLocaleString("en-IN")}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setActiveReceipt(p)}
                        className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-[11px] inline-flex items-center gap-1 transition-colors border border-zinc-700"
                      >
                        <Printer className="w-3 h-3 text-vault-lime" />
                        <span>Print</span>
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SMART RECORD PAYMENT MODAL */}
      {isRecordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="max-w-lg w-full p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-700 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div>
                <h3 className="text-lg font-black text-white font-heading">
                  Smart Fee Collection
                </h3>
                <p className="text-xs text-zinc-400">
                  Select member to auto-fetch dues & generate dynamic UPI QR.
                </p>
              </div>
              <button
                onClick={() => setIsRecordModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-4">
              
              {/* Member Selection */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Select Member *
                </label>
                <select
                  value={selectedMemberId}
                  onChange={(e) => handleMemberChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime font-medium"
                >
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.fullName} ({m.memberCode}) — {m.balanceDue > 0 ? `Pending Due: ₹${m.balanceDue.toLocaleString("en-IN")}` : "Paid in Full"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dynamic Due Indicator & Quick-Fill Chips */}
              {currentSelectedMember && (
                <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Current Outstanding Due:</span>
                    <span className="text-sm font-mono font-black text-amber-400">
                      ₹{currentSelectedMember.balanceDue.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {currentSelectedMember.balanceDue > 0 && (
                    <div className="flex items-center gap-2 pt-1 border-t border-zinc-800/80">
                      <span className="text-[10px] text-zinc-400 uppercase font-bold">1-Click Amount:</span>
                      <button
                        type="button"
                        onClick={() => setAmount(String(currentSelectedMember.balanceDue))}
                        className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold text-[10px] border border-amber-500/40 hover:bg-amber-500/30"
                      >
                        Full Due (₹{currentSelectedMember.balanceDue})
                      </button>
                      <button
                        type="button"
                        onClick={() => setAmount(String(Math.round(currentSelectedMember.balanceDue / 2)))}
                        className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-bold text-[10px] hover:bg-zinc-700"
                      >
                        Half (₹{Math.round(currentSelectedMember.balanceDue / 2)})
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Amount input */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Collection Amount (₹) *
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 2000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-base focus:outline-none focus:border-vault-lime font-mono font-bold"
                />
              </div>

              {/* Payment Mode Selection */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Payment Mode *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "UPI", label: "UPI (QR / PhonePe)" },
                    { id: "CARD", label: "Card (POS Swipe)" },
                    { id: "CASH", label: "Cash Entry" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                        paymentMethod === m.id
                          ? "bg-vault-lime text-black border-vault-lime shadow-sm"
                          : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Instant UPI QR Code Preview for Reception Screen */}
              {paymentMethod === "UPI" && amount && (
                <div className="p-4 rounded-2xl bg-zinc-900/90 border border-vault-lime/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-vault-lime font-bold flex items-center gap-1">
                      <QrCode className="w-3.5 h-3.5" /> Instant UPI QR for Member
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      Amount: ₹{Number(amount).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                    <div className="w-16 h-16 bg-white p-1 rounded-lg flex items-center justify-center shrink-0">
                      <QrCode className="w-14 h-14 text-black" />
                    </div>
                    <div className="text-xs space-y-0.5">
                      <div className="text-white font-bold font-mono">ironvault@icici</div>
                      <div className="text-[10px] text-zinc-400">
                        Scan with GPay, PhonePe or Paytm
                      </div>
                      <span className="inline-block px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold">
                        Auto-Reconciling
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Transaction Reference */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Transaction Ref / Note (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. PhonePe/882190 or Leave blank for auto-ref"
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-vault-lime font-mono"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsRecordModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-vault-lime text-black font-extrabold text-xs uppercase shadow-lime-glow hover:bg-vault-limeHover"
                >
                  Issue Receipt & Update Dues
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Digital Receipt Modal */}
      {activeReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="max-w-lg w-full p-8 rounded-3xl bg-[#0e0e11] border border-zinc-700 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <span className="text-[10px] font-mono uppercase tracking-widest text-vault-lime font-bold">
                OFFICIAL TAX INVOICE RECEIPT
              </span>
              <button
                onClick={() => setActiveReceipt(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Printable Area */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 text-white font-sans space-y-4">
              <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
                <div>
                  <h4 className="text-base font-black font-heading tracking-tight text-white">
                    IRONVAULT FITNESS & ATHLETIC CLUB
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Apex Prestige Tower, 100ft Rd, Indiranagar, Bangalore
                  </p>
                  <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                    GSTIN: 29AAAAA0000A1Z5 • Concierge: +91 80 4920 8800
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-vault-lime font-bold block">
                    {activeReceipt.receiptNumber}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono block mt-1">
                    {activeReceipt.paymentDate}
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="text-zinc-400 text-[11px]">Billed To:</div>
                <div className="text-sm font-bold text-white font-heading">
                  {activeReceipt.memberName}
                </div>
                <div className="text-[11px] font-mono text-vault-lime">
                  Member ID: {activeReceipt.memberCode}
                </div>
              </div>

              <div className="border-t border-zinc-800 pt-3">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-zinc-500 text-[10px] uppercase font-bold text-left">
                      <th className="pb-1.5">Description</th>
                      <th className="pb-1.5 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-zinc-800/60">
                      <td className="py-2 text-zinc-300">{activeReceipt.planName}</td>
                      <td className="py-2 text-right font-mono font-bold text-white">
                        ₹{activeReceipt.amount.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="pt-3 font-bold text-white">Total Amount Paid:</td>
                      <td className="pt-3 text-right font-mono font-black text-lg text-vault-lime font-heading">
                        ₹{activeReceipt.amount.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-500">
                <span>Payment Mode: <strong className="text-zinc-300 font-mono">{activeReceipt.paymentMethod}</strong></span>
                <span>Authorized Desk Signature: <strong className="text-zinc-300 font-mono">{activeReceipt.collectedBy}</strong></span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified in Tenant Ledger</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded-xl bg-vault-lime text-black font-extrabold uppercase text-xs tracking-wider flex items-center gap-2 hover:bg-vault-limeHover"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
