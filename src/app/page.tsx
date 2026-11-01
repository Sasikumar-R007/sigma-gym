"use client";

import React, { useState } from "react";
import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Programs from "@/components/Programs";
import Trainers from "@/components/Trainers";
import Facilities from "@/components/Facilities";
import Memberships from "@/components/Memberships";
import Transformations from "@/components/Transformations";
import BmiCalculator from "@/components/BmiCalculator";
import Schedule from "@/components/Schedule";
import FreeTrial from "@/components/FreeTrial";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import TrialModal from "@/components/TrialModal";
import ProgramDetailsModal from "@/components/ProgramDetailsModal";
import VideoModal from "@/components/VideoModal";
import { Program } from "@/data/gymData";

export default function Home() {
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [selectedPlanOrProgram, setSelectedPlanOrProgram] = useState<string>("");
  const [selectedProgramDetails, setSelectedProgramDetails] = useState<Program | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const handleOpenTrial = (item?: string) => {
    setSelectedPlanOrProgram(item || "Gold Vault (All-Access)");
    setTrialModalOpen(true);
  };

  const handleSelectProgram = (program: Program) => {
    setSelectedProgramDetails(program);
  };

  const handleSelectPlan = (planName: string) => {
    setSelectedPlanOrProgram(`Membership: ${planName}`);
    setTrialModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#070707] text-[#F5F5F7] selection:bg-vault-lime selection:text-black">
      {/* Top Notification Announcement Bar */}
      <TopBanner onOpenTrial={() => handleOpenTrial("Complimentary 3-Day VIP Pass")} />

      {/* Sticky Main Navigation */}
      <Navbar onOpenTrial={() => handleOpenTrial("3-Day VIP Pass")} />

      {/* 1. Hero Section */}
      <Hero
        onOpenTrial={() => handleOpenTrial("Hero Free Trial")}
        onOpenVideo={() => setVideoModalOpen(true)}
      />

      {/* 2. About Section */}
      <About onOpenTrial={() => handleOpenTrial("In-Person Facility Walkthrough")} />

      {/* 3. Fitness Programs */}
      <Programs
        onSelectProgram={handleSelectProgram}
        onOpenTrial={(programTitle) => handleOpenTrial(programTitle)}
      />

      {/* 4. Trainers Section */}
      <Trainers onOpenTrial={(trainerTitle) => handleOpenTrial(trainerTitle)} />

      {/* 5. Facilities & Equipment Tour */}
      <Facilities onOpenTrial={() => handleOpenTrial("Facility Tour")} />

      {/* 6. Membership Plans */}
      <Memberships onSelectPlan={handleSelectPlan} />

      {/* 7. Transformations & Member Testimonials */}
      <Transformations onOpenTrial={() => handleOpenTrial("Transformation Assessment")} />

      {/* 8. Interactive Bonus: BMI & Calorie Calculator */}
      <BmiCalculator onOpenTrial={(rec) => handleOpenTrial(rec)} />

      {/* 9. Interactive Bonus: Weekly Class Timetable */}
      <Schedule onOpenTrial={(className) => handleOpenTrial(className)} />

      {/* 10. Free Trial / In-Depth Enquiry Booking Form */}
      <FreeTrial initialProgram="Strength & Conditioning" />

      {/* 11. Contact & Location Information */}
      <Contact onOpenTrial={() => handleOpenTrial("General Concierge Inquiry")} />

      {/* 12. Footer with Symphonix Tech Showcase */}
      <Footer onOpenTrial={() => handleOpenTrial("Footer VIP Pass")} />

      {/* Global Interactive Modals */}
      <TrialModal
        isOpen={trialModalOpen}
        onClose={() => setTrialModalOpen(false)}
        preselectedItem={selectedPlanOrProgram}
      />

      <ProgramDetailsModal
        program={selectedProgramDetails}
        onClose={() => setSelectedProgramDetails(null)}
        onBook={(title) => handleOpenTrial(title)}
      />

      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        onOpenTrial={() => handleOpenTrial("Virtual Tour VIP Trial")}
      />
    </main>
  );
}
