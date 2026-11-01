# IRONVAULT FITNESS – Premium Gym Portfolio Demo

> **A portfolio demonstration project engineered by Symphonix Tech** to showcase high-conversion, brand-tailored web architecture for high-end fitness centers, athletic clubs, and wellness brands.

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Status](https://img.shields.io/badge/Build-Passing-brightgreen)]()

---

## ⚡ Project Overview

**IRONVAULT FITNESS** is a fictional luxury strength and athletic performance sanctuary located in **Indiranagar, Bangalore**. Designed to stand out from generic fitness website templates, this project presents an editorial, high-energy, dark-themed digital experience built to captivate prospective members and maximize membership conversions.

### Core Objectives:
- Present a dark, high-contrast athletic aesthetic (deep blacks, charcoal, electric neon lime `#CCFF00`, and subtle metallic grey).
- Provide prospective gym owners with an undeniable demonstration of **Symphonix Tech's** front-end design, interactivity, and conversion-focused architecture.
- Ensure 100% responsive fluid performance across mobile, tablet, and widescreen desktop displays.

---

## 🏋️‍♂️ Website Architecture & Sections

### 1. Header & Navigation (`Navbar.tsx` & `TopBanner.tsx`)
- **Top VIP Notice Strip**: Live member intake indicator (*"Only 25 Free VIP Passes Available"*), location tag (*Indiranagar, Bangalore*), and developer accreditation.
- **Brand Identity**: Custom geometric vault/dumbbell emblem with bold typography (`IRONVAULT FITNESS`).
- **Glassmorphic Sticky Nav**: Smooth background blur on scroll with direct section navigation.
- **Mobile Drawer**: Slide-over navigation menu optimized for quick thumb navigation on iOS and Android.

### 2. Cinematic Hero Section (`Hero.tsx`)
- Headline: **"BUILD STRENGTH. BREAK LIMITS."**
- Atmospheric dark vignette with high-res gym photography and neon volt glow effects.
- Direct dual CTAs: *"Book a Free Trial"* and *"Explore Memberships"*.
- **Interactive Virtual Tour Video Modal**: Simulates a 4K UHD walkthrough of the 12,000 sq.ft. facility.
- Live demonstration metrics:
  - `1,200+` Active Members
  - `15+` Master Coaches (CSCS & Olympic Certified)
  - `12,000` Sq.Ft. Luxury Strength Deck
  - `24/7` Biometric Keyless Access

### 3. About the Sanctuary (`About.tsx`)
- Origin story challenging the noisy, overcrowded model of commercial fitness chains.
- **4 Core Pillars**:
  1. *Biomechanical Precision* (Eleiko calibrated competition plates & Arsenal Strength leverage units)
  2. *Elite Coaching Roster* (Tier-1 certified coaches, zero floor attendants)
  3. *Capped Membership Policy* (Zero waiting for squat cages)
  4. *Science-Backed Recovery* (Contrast cold plunge at 8°C & Nordic sauna at 85°C)
- Visual equipment highlights & Google rating badge (`4.9★ / 480+ Reviews`).

### 4. Fitness Programs (`Programs.tsx` & `ProgramDetailsModal.tsx`)
- Interactive category filter tabs: *All Programs*, *Strength & Power*, *1-on-1 Coaching*, *Functional & HIIT*, *Cardio & Group*.
- Showcasing 6 primary disciplines:
  - **Strength & Conditioning** (Calibrated barbells, periodization, bar-path telemetry)
  - **1-on-1 Bespoke Personal Training** (3D body composition scanning, dedicated coach bays)
  - **Weight Loss & Transformation** (Metabolic resistance circuits, clinical nutrition)
  - **CrossFit & Functional Training** (40m sled turf, Rogue rig, Echo bikes)
  - **Cardio & VO2 Max Endurance** (Technogym Artis Skillmills, Concept2 rowers)
  - **Vault Strike Boxing & Group Conditioning** (Aqua training bags, club-grade audio)
- Interactive **"View Details" Modal** featuring full curriculum syllabus, calorie burns, and direct booking trigger.

### 5. Master Trainers Cadre (`Trainers.tsx`)
- Profile cards featuring head coach portraits, competition accolades, verified credentials, and philosophies:
  - **Vikram "Titan" Sengupta**: Head of Strength & Olympic Weightlifting (CSCS, USAW)
  - **Ananya "Valkyrie" Rao**: Lead Performance & Nutrition Director (ACE Master, Precision Nutrition L2)
  - **Marcus Sterling**: Physique & Muscular Hypertrophy Specialist (IFBB Pro Coach, PRI)
  - **Priya Sundaram**: Kinesiology, Mobility & Joint Prehab Specialist (MSc, FRC)
  - **Devraj "Rhino" Pillai**: Boxing & Combat Conditioning (AIBA Level 2)
  - **Sneha Kapoor**: Athletic Core & Reformer Specialist (Polestar Pilates)
- Interactive "Book Consultation" trigger with pre-filled coach name.

### 6. Facilities & Equipment Tour (`Facilities.tsx`)
- Interactive category tabs:
  - *Olympic & Arsenal Strength Deck*
  - *Heavy Dumbbell & Free Weights Vault (up to 60kg)*
  - *Technogym Artis Cardio Deck with 21.5" HD screens*
  - *40M Performance Sled Turf Arena*
  - *Contrast Hydrotherapy Cold Plunge (8°C) & Finnish Sauna (85°C)*
  - *Executive Dressing Suites with Dyson Supersonic styling*
- **Interactive Lightbox Zoom Modal**: Fullscreen high-resolution inspection of facility spaces.

### 7. Membership Plans (`Memberships.tsx`)
- Interactive Billing Toggle:
  - **Monthly**
  - **Quarterly** (Includes 15% discount)
  - **Annual** (Includes 25% discount + 2 complimentary personal training sessions)
- Three tiers:
  - **Silver Vault (Basic)**: Essential open floor & cardio access (₹3,499/mo)
  - **Gold Vault (All-Access - Featured)**: 24/7 access, all group & boxing classes, contrast spa, monthly 3D scans (₹5,999/mo)
  - **Black Diamond VIP (Elite)**: Weekly 1-on-1 master coaching, private locker with laundry, daily recovery spa, unlimited protein shakes (₹9,999/mo)
- Pre-selects the plan and opens the booking modal seamlessly.

### 8. Transformations & Member Reviews (`Transformations.tsx`)
- **Interactive Before / After Switcher**: Toggle between before & after photos with real demo metrics:
  - Rajesh K. (Tech Founder): -16.5 kg fat lost, +5.2 kg muscle in 20 weeks
  - Meera N. (UX Architect): 120 kg deadlift PR, 16-week transformation
  - Rohan D. (Venture Partner): -18.2 kg fat lost, 52 bpm resting HR in 24 weeks
- Authentic testimonials carousel with verified member badges, occupation titles, and 5-star ratings.

### 9. Interactive Bonus Tools
- **BMI & Target Calorie Calculator (`BmiCalculator.tsx`)**: Prospective members enter height, weight, age, and goals to instantly receive BMI score, health classification, target daily calories (kcal), and a personalized IronVault program recommendation.
- **Weekly Class Timetable (`Schedule.tsx`)**: Filterable Monday-to-Sunday live timetable with time slots, class names, coach roster, intensity indicators, and 1-click spot reservation.

### 10. Free Trial / Enquiry Booking (`FreeTrial.tsx` & `TrialModal.tsx`)
- Real-time frontend validation (name, 10-digit mobile number, valid email, arrival date, and preferred time).
- Simulated processing state with celebratory **confetti animation** via `canvas-confetti`.
- **Instant Digital VIP Guest Pass Generator**:
  - Unique Pass ID (e.g. `IV-VIP-84921`)
  - Guest Name, Contact, Program, Date & Time window
  - Graphic QR code mockup ready for reception scan
  - 1-click "Copy Pass Code" and "Print / Save Pass" functionality.
  - Transparent demonstration disclaimer for clients.

### 11. Contact & Location (`Contact.tsx`)
- Realistic Bangalore metropolitan address: Level 4 & 5, Apex Prestige Tower, 100 Feet Road, Indiranagar, Bengaluru.
- Operating hours breakdown with 24/7 member access highlights.
- **Custom Dark Google Maps Mockup**: Interactive styling, radar pulse pin, zoom controls, and direction action.
- Interactive FAQ Accordion addressing common prospect questions.

### 12. Footer & Symphonix Tech Showcase (`Footer.tsx`)
- Comprehensive footer with quick navigation links, social icons (Instagram, YouTube, X, LinkedIn), and legal demo terms.
- Dedicated **Symphonix Tech Showcase Banner**: Highlighting bespoke web engineering capabilities for fitness brands.
- Smooth Back-to-Top anchor button.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router, Server Components & Client Hydration) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) (Strict typing throughout) |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) (Custom electric lime palette, dark metallic glassmorphism) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Visual Effects** | [Canvas-Confetti](https://www.npmjs.com/package/canvas-confetti) |
| **Typography** | Google Fonts (`Inter`, `Outfit`, `Teko`) |
| **Media** | Curated high-resolution Unsplash gym photography |

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18.17.0` or higher (tested on `v22.15.0`)
- npm `v9+`

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/sigma-gym.git

# Navigate into project directory
cd sigma-gym

# Install dependencies
npm install
```

### Running Locally
```bash
# Start Next.js development server
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Building for Production
```bash
# Type check and build optimized bundle
npm run build

# Start production server
npm run start
```

---

## 🏆 Portfolio Note

This website was built as an elite showcase demonstration by **Symphonix Tech**. It does not connect to real credit card payment gateways or gym member databases. All names, pricing tiers, and contact numbers are realistic demonstration data created to show gym owners how their digital storefront can look and perform.
