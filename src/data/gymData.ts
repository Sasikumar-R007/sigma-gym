export interface Program {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  intensity: 'Medium' | 'High' | 'Extreme';
  duration: string;
  caloriesBurned: string;
  image: string;
  highlights: string[];
  equipment: string[];
  schedule: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  experience: string;
  certifications: string[];
  specialization: string[];
  quote: string;
  bio: string;
  image: string;
  instagram: string;
  stats: {
    clientsTrained: string;
    transformationSuccess: string;
  };
}

export interface Facility {
  id: string;
  title: string;
  category: 'strength' | 'cardio' | 'free-weights' | 'turf' | 'recovery';
  description: string;
  image: string;
  specs: string[];
  badge: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  tier: 'Basic' | 'Pro' | 'Elite';
  popular?: boolean;
  tagline: string;
  pricing: {
    monthly: number;
    quarterly: number;
    annual: number;
  };
  features: string[];
  notIncluded?: string[];
  color: string;
  perks: string;
}

export interface Transformation {
  id: string;
  name: string;
  age: number;
  occupation: string;
  duration: string;
  lostKg: string;
  gainedMuscle: string;
  beforeImage: string;
  afterImage: string;
  quote: string;
  programUsed: string;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  rating: number;
  text: string;
  avatar: string;
  badge: string;
  date: string;
}

export interface ScheduleItem {
  id: string;
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  time: string;
  className: string;
  trainer: string;
  intensity: 'Medium' | 'High' | 'Extreme';
  room: string;
  duration: string;
}

export const GYM_DATA = {
  brand: {
    name: "IRONVAULT",
    subName: "FITNESS",
    slogan: "BUILD STRENGTH. BREAK LIMITS.",
    location: "Indiranagar, Bangalore",
    address: "Level 4 & 5, Apex Prestige Tower, 100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
    email: "symphonixtech@gmail.com",
    openingHours: {
      weekdays: "5:30 AM – 11:00 PM",
      saturday: "6:00 AM – 10:00 PM",
      sunday: "7:00 AM – 8:00 PM",
      members247: "24/7 Biometric Access for Pro & Elite Members",
    },
    demoNotice: "Demonstration project developed for portfolio showcase by Symphonix Tech. Inquiries: symphonixtech@gmail.com",
  },

  stats: [
    { label: "Active Members", value: "1,200+", subtext: "Dedicated fitness community" },
    { label: "Master Coaches", value: "15+", subtext: "CSCS & Olympic certified" },
    { label: "Strength Floor", value: "12,000", subtext: "Sq.Ft. premium facility" },
    { label: "Vault Access", value: "24/7", subtext: "Biometric keyless entry" },
  ],

  programs: [
    {
      id: "strength-conditioning",
      title: "Strength & Conditioning",
      category: "Power & Hypertrophy",
      tagline: "Calibrated barbells, structured periodization, and raw power development.",
      description: "Designed for individuals serious about building foundational strength, dense muscular hypertrophy, and explosive athleticism. Utilizes progressive overload protocols on competition-spec Eleiko platforms and power cages.",
      intensity: "Extreme",
      duration: "75 Mins",
      caloriesBurned: "650 - 850 kcal",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
      highlights: [
        "Full Olympic Eleiko lifting platforms & calibrated plates",
        "Linear & undulating periodization coaching",
        "Biomechanic video bar-path analysis",
        "Quarterly 1RM testing and velocity-based tracking"
      ],
      equipment: ["Eleiko IPF Barbells", "Arsenal Strength Racks", "Safety Squat Bars", "Dumbbells up to 60kg"],
      schedule: "Mon, Wed, Fri · 06:30 AM & 06:30 PM",
    },
    {
      id: "personal-training",
      title: "1-on-1 Bespoke Personal Training",
      category: "Elite Mentorship",
      tagline: "Dedicated master coaching tailored surgically to your physiological goals.",
      description: "Experience the pinnacle of individualized coaching. Every session is engineered based on comprehensive posture assessments, 3D body composition scanning, and metabolic profiling to guarantee accelerated, injury-free progress.",
      intensity: "High",
      duration: "60 Mins",
      caloriesBurned: "500 - 750 kcal",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
      highlights: [
        "Comprehensive 3D InBody & DEXA body scans every 30 days",
        "Bespoke macro & micronutrient dietary formulation",
        "Private coaching bays with dedicated coach",
        "Corrective movement patterning & joint mobilization"
      ],
      equipment: ["Private Coach Bay", "Force Plates", "Heart-Rate Telemetry", "Customized Implement Array"],
      schedule: "Flexible Scheduling · By Appointment (24/7)",
    },
    {
      id: "weight-loss-transformation",
      title: "Weight Loss & Body Transformation",
      category: "Metabolic Mastery",
      tagline: "Shed stubborn fat, preserve lean mass, and rebuild athletic vitality.",
      description: "An evidence-based body transformation protocol pairing high-density metabolic resistance training with sustainable nutritional habit architecture. Designed to permanently lower visceral fat while preserving hard-earned muscular tone.",
      intensity: "High",
      duration: "60 Mins",
      caloriesBurned: "700 - 950 kcal",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
      highlights: [
        "EPOC-inducing metabolic resistance circuits",
        "Weekly body fat caliper & tape audit",
        "Dedicated clinical dietitian check-in",
        "Metabolic conditioning with zero muscle wasting"
      ],
      equipment: ["Skillmills", "Concept2 SkiErgs", "Kettlebells", "Air Resistance Bikes"],
      schedule: "Tue, Thu, Sat · 07:00 AM & 05:30 PM",
    },
    {
      id: "crossfit-functional",
      title: "CrossFit & Functional Training",
      category: "Athletic Conditioning",
      tagline: "High-voltage functional fitness combining gymnastics, Olympic lifts, and engine work.",
      description: "Unleash primal athletic horsepower. Our functional arena integrates 40 meters of sled turf, custom rig frameworks, gymnastic rings, assault bikes, and plyometric boxes to forge unstoppable real-world endurance.",
      intensity: "Extreme",
      duration: "60 Mins",
      caloriesBurned: "750 - 1000 kcal",
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1200&auto=format&fit=crop",
      highlights: [
        "40-meter indoor Astroturf sprint & sled track",
        "Gymnastic bar muscle-up and ring complexes",
        "High-output Rogue Echo Bike anaerobic intervals",
        "Daily WODs scaled precisely to every fitness tier"
      ],
      equipment: ["Rogue Monster Rig", "Prowler Sleds", "Echo Bikes", "Gymnastic Rings"],
      schedule: "Mon to Sat · 06:00 AM, 08:00 AM & 07:00 PM",
    },
    {
      id: "cardio-endurance",
      title: "Cardio & VO2 Max Endurance",
      category: "Cardiovascular Health",
      tagline: "Build an iron cardiovascular engine with biomechanically advanced machines.",
      description: "Supercharge your resting heart rate, cellular mitochondria, and aerobic stamina. Features Technogym Artis curved treadmills, Concept2 rowers, and interactive telemetry monitors tracking your heart rate zones in real-time.",
      intensity: "Medium",
      duration: "50 Mins",
      caloriesBurned: "550 - 750 kcal",
      image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=1200&auto=format&fit=crop",
      highlights: [
        "Zone 2 to Zone 5 targeted cardiovascular conditioning",
        "Curved non-motorized Skillmills for natural cadence",
        "Virtual scenic immersive trail runs on 21-inch displays",
        "Low-impact endurance protocols for orthopedic longevity"
      ],
      equipment: ["Technogym Artis Run", "Concept2 RowErg", "StairMaster 10G", "Wattbike Atoms"],
      schedule: "Daily All-Day Access · Classes at 07:30 AM & 06:00 PM",
    },
    {
      id: "group-fitness-boxing",
      title: "Vault Strike & Group Conditioning",
      category: "High Energy Classes",
      tagline: "Intense striking rounds, rhythm-driven cycling, and primal group motivation.",
      description: "Experience the electric camaraderie of high-energy group fitness. Featuring Aqua-bag boxing combos, rhythm athletic spin, and power mobility recovery sessions led by Bangalore's most charismatic coaches in an acoustic-tuned studio.",
      intensity: "High",
      duration: "55 Mins",
      caloriesBurned: "600 - 850 kcal",
      image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=1200&auto=format&fit=crop",
      highlights: [
        "Water-filled Aqua Bags for joint-friendly boxing strikes",
        "Custom acoustic club-grade audio system & reactive lighting",
        "High-tempo team calorie challenges",
        "Post-workout cold eucalyptus towel and recovery shake service"
      ],
      equipment: ["Aqua Training Bags", "Boxing Gloves & Wraps", "Keiser M3i Bikes", "Plyo Blocks"],
      schedule: "Daily Morning & Evening Slots · Reserve on App",
    },
  ] as Program[],

  trainers: [
    {
      id: "vikram-sengupta",
      name: "Vikram 'Titan' Sengupta",
      role: "Head Strength Director & Co-Founder",
      experience: "12+ Years",
      certifications: ["CSCS (NSCA)", "USAW Senior International Coach", "EXOS Performance Specialist"],
      specialization: ["Powerlifting & Raw Strength", "Olympic Weightlifting", "Biomechanics & Bar Path Analysis"],
      quote: "The barbell never lies. 220 kilograms is 220 kilograms in every language. What you overcome under the iron defines who you are outside the gym.",
      bio: "Former National Powerlifting Championship medalist and coach to over 40 competitive collegiate athletes. Vikram leads IronVault's strength philosophy with uncompromising biomechanical discipline.",
      image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800&auto=format&fit=crop",
      instagram: "@vikram_ironvault",
      stats: {
        clientsTrained: "650+",
        transformationSuccess: "98.4%",
      },
    },
    {
      id: "ananya-rao",
      name: "Ananya 'Valkyrie' Rao",
      role: "Lead Performance Coach & Nutrition Director",
      experience: "9+ Years",
      certifications: ["ACE Master Trainer", "Precision Nutrition L2", "CrossFit Level 3 Coach"],
      specialization: ["Hypertrophy & Body Recomposition", "Hormonal & Sports Nutrition", "Metabolic Conditioning"],
      quote: "True transformation isn't accidental starvation; it is the calculated synthesis of heavy lifting, metabolic conditioning, and relentless nutritional consistency.",
      bio: "Specializing in sustainable transformations for founders, corporate executives, and female athletes. Ananya combines clinical metabolic profiling with intense strength programming.",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800&auto=format&fit=crop",
      instagram: "@ananya_performance",
      stats: {
        clientsTrained: "520+",
        transformationSuccess: "99.1%",
      },
    },
    {
      id: "marcus-sterling",
      name: "Marcus Sterling",
      role: "Senior Physique & Hypertrophy Specialist",
      experience: "11+ Years",
      certifications: ["IFBB Pro League Coach", "NASM-PES", "Postural Restoration Institute (PRI)"],
      specialization: ["Aesthetic Muscular Symmetry", "Muscle Hypertrophy Protocols", "Pre-Contest Prep & Shredding"],
      quote: "We don't simply move weight; we isolate muscle fiber recruitment to sculpt a proportioned, powerful, and armor-plated physique.",
      bio: "Having coached dozens of podium-finishing physique athletes across Asia and Europe, Marcus brings surgical mind-muscle isolation methods and structural integrity training to IronVault.",
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop",
      instagram: "@marcus_vaultphysique",
      stats: {
        clientsTrained: "480+",
        transformationSuccess: "97.8%",
      },
    },
    {
      id: "priya-sundaram",
      name: "Priya Sundaram",
      role: "Mobility, Kinesiology & Rehabilitation Specialist",
      experience: "8+ Years",
      certifications: ["MSc Exercise Kinesiology", "FRC Mobility Specialist", "FMS Level 2"],
      specialization: ["Joint Health & Pain-Free Lifting", "Spine & Shoulder Prehab", "Dynamic Athletic Mobility"],
      quote: "Strength without mobility is fragile. We bulletproof your joints so you can lift heavier, move freely, and remain indestructible for decades.",
      bio: "Priya specializes in orthopedic corrective mechanics and post-injury athletic return. She ensures IronVault members maintain bulletproof joints while moving maximal loads safely.",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
      instagram: "@priya_kinesiology",
      stats: {
        clientsTrained: "410+",
        transformationSuccess: "99.5%",
      },
    },
    {
      id: "devraj-pillai",
      name: "Devraj 'Rhino' Pillai",
      role: "Boxing & Combat Conditioning Coach",
      experience: "10+ Years",
      certifications: ["AIBA Level 2 Boxing Coach", "ISSA Combat Conditioning", "USA Boxing Certified"],
      specialization: ["Boxing Striking Mechanics", "Anaerobic Lactic Conditioning", "Footwork & Reflex Timing"],
      quote: "In the ring and in the gym, panic is a choice. Breath control, razor-sharp speed, and grit carry you through the final round.",
      bio: "Former State Golden Gloves fighter and conditioning trainer to championship mixed-martial artists. Devraj leads our high-intensity Vault Strike boxing and combat conditioning sessions.",
      image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      instagram: "@devraj_rhino_boxing",
      stats: {
        clientsTrained: "590+",
        transformationSuccess: "98.0%",
      },
    },
    {
      id: "sneha-kapoor",
      name: "Sneha Kapoor",
      role: "Athletic Conditioning & Reformer Coach",
      experience: "7+ Years",
      certifications: ["Polestar Pilates Comprehensive", "ACE Group Fitness", "TRX Master Instructor"],
      specialization: ["Core & Lumbar Stabilization", "Athletic Reformer Protocols", "Postural Symmetry"],
      quote: "True athletic control starts from the deep core. When your center is anchored in steel, every external movement explodes with power.",
      bio: "Sneha bridges the gap between intense strength lifting and elite muscular control, helping athletes recover faster, strengthen their core cylinder, and maximize functional output.",
      image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop",
      instagram: "@sneha_vaultcore",
      stats: {
        clientsTrained: "350+",
        transformationSuccess: "98.9%",
      },
    },
  ] as Trainer[],

  facilities: [
    {
      id: "strength-zone",
      title: "Olympic & Arsenal Strength Deck",
      category: "strength" as const,
      description: "Equipped with custom Swedish Eleiko competition racks, calibrated steel disc sets, Arsenal Strength plate-loaded pendulum squats, and ISO-lateral rowers engineered for zero joint shear.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
      specs: ["6 Eleiko Competition Squat Cages", "Arsenal Pendulum & Hack Squats", "Competition IPF Benches", "10,000kg Calibrated Steel Plates"],
      badge: "Competition Grade",
    },
    {
      id: "free-weights",
      title: "Heavy Dumbbell & Free Weights Vault",
      category: "free-weights" as const,
      description: "Solid urethane custom dumbbells ranging from 2.5kg to 60kg, heavy-duty adjustable incline benches with laser-cut angle indicators, and dedicated deadlift drop zones with acoustic dampening.",
      image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1200&auto=format&fit=crop",
      specs: ["Urethane Dumbbells Up to 60kg", "Acoustic Impact Absorbing Subfloors", "8 Heavy Duty Adjustable Benches", "Specialty Grip & Bar Array"],
      badge: "Heavy Duty",
    },
    {
      id: "cardio-deck",
      title: "Technogym Artis Cardio Deck",
      category: "cardio" as const,
      description: "Immersive cardiovascular deck featuring Technogym Artis treadmills with 21.5\" HD displays, Skillmills, StairMaster 10G climbers, and Concept2 RowErgs overlooking Bangalore's skyline.",
      image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop",
      specs: ["Technogym Artis 21.5\" Screens", "Non-motorized Skillmills", "StairMaster 10G Overdrive", "Integrated Heart-Rate Telemetry"],
      badge: "Skyline View",
    },
    {
      id: "turf-zone",
      title: "40M Performance Turf Arena",
      category: "turf" as const,
      description: "High-density synthetic sled turf track engineered for sled pushes, farmers walks, sprint acceleration drills, agility ladders, and tire flips, flanked by an expansive Rogue Monster rig.",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
      specs: ["40-Meter High-Traction Sled Track", "Custom Heavy Prowler Sleds", "Rogue Gymnastics Rig & Rings", "Plyometric Jump Boxes & Tires"],
      badge: "Athletic Turf",
    },
    {
      id: "recovery-spa",
      title: "Contrast Hydrotherapy & Finnish Sauna",
      category: "recovery" as const,
      description: "Accelerate muscular repair with our luxury recovery suite featuring twin stainless-steel cold plunge baths chilled to 8°C, a Nordic cedarwood infrared sauna at 85°C, and Normatec compression boots.",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop",
      specs: ["Twin 8°C Cold Plunge Baths", "Nordic Cedarwood Sauna (85°C)", "Normatec 3 Compression Boots", "Hyperice Percussive Massage Bay"],
      badge: "Executive Spa",
    },
    {
      id: "executive-lockers",
      title: "Executive Dressing & Grooming Suites",
      category: "recovery" as const,
      description: "Private biometric lockers, rainfall hydro-massage showers, complimentary Malin+Goetz grooming amenities, Dyson Supersonic hair styling stations, and daily steam rooms.",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop",
      specs: ["RFID Biometric Keyless Lockers", "High-Pressure Rainfall Showers", "Dyson Supersonic Stations", "Fresh Fluffy Towel Service"],
      badge: "Luxury Amenities",
    },
  ] as Facility[],

  memberships: [
    {
      id: "basic",
      name: "Silver Vault",
      tier: "Basic" as const,
      tagline: "Essential strength access for the disciplined self-starter.",
      pricing: {
        monthly: 3499,
        quarterly: 9499,
        annual: 31499,
      },
      color: "border-zinc-700",
      perks: "Ideal for independent lifters seeking world-class equipment without fluff.",
      features: [
        "Full access to Strength & Free Weights Floors",
        "Technogym Cardio Deck & Turf Track",
        "Executive Locker Rooms & Rainfall Showers",
        "Biometric Keyless RFID App Access",
        "Standard Gym Hours (5:30 AM – 11:00 PM)",
        "Complimentary Initial InBody 3D Scan",
        "Free High-Speed Wi-Fi & Vault Hydration Station",
      ],
      notIncluded: [
        "24/7 After-Hours Vault Access",
        "Group Fitness & Boxing Classes",
        "Sauna & Cold Plunge Recovery Suite",
        "Personal Training Sessions Included",
        "Complimentary Guest Passes",
      ],
    },
    {
      id: "pro",
      name: "Gold Vault (All-Access)",
      tier: "Pro" as const,
      popular: true,
      tagline: "The definitive high-performance membership for dedicated athletes.",
      pricing: {
        monthly: 5999,
        quarterly: 15999,
        annual: 53999,
      },
      color: "border-vault-lime",
      perks: "Most Popular: Unrestricted gym access, all group classes & recovery spa.",
      features: [
        "24/7 Unlimited Biometric Keyless Access",
        "Unlimited Access to ALL Group Classes (Boxing, HIIT, Spin, Yoga)",
        "Contrast Hydrotherapy Suite (Cold Plunge & Finnish Sauna)",
        "2 Complimentary 1-on-1 Personal Training Sessions per Month",
        "Monthly InBody 3D Body Composition & Postural Audit",
        "2 Complimentary Guest Passes per Month",
        "Executive Locker Suite with Towel & Grooming Service",
        "10% Discount at Vault Nutrition & Protein Bar",
        "Priority Booking via IronVault Mobile App",
      ],
    },
    {
      id: "elite",
      name: "Black Diamond VIP",
      tier: "Elite" as const,
      tagline: "Uncompromising luxury, dedicated master coaching, and concierge service.",
      pricing: {
        monthly: 9999,
        quarterly: 26999,
        annual: 89999,
      },
      color: "border-amber-400",
      perks: "The ultimate concierge fitness experience for founders and elite executives.",
      features: [
        "Everything in Gold Vault All-Access",
        "Weekly 1-on-1 Dedicated Master Coach Sessions (4 per month)",
        "Reserved Permanent Private Locker with Complimentary Laundry Service",
        "Unlimited Daily Recovery Spa (Cold Plunge, Sauna & Normatec Boots)",
        "Quarterly DEXA Body Fat & Bone Density Scan (Hospital Grade)",
        "Full Personalized Nutrition & Supplement Blueprint with Clinical Dietitian",
        "Unlimited Free Protein Shakes & Pre-Workouts at Vault Bar",
        "5 VIP Guest Passes per Month with Full Access",
        "Dedicated VIP Concierge Line & Valet Parking Included",
      ],
    },
  ],

  transformations: [
    {
      id: "rajesh-k",
      name: "Rajesh Krishnamurthy",
      age: 35,
      occupation: "Tech Founder & Angel Investor",
      duration: "20 Weeks",
      lostKg: "16.5 kg Fat Lost",
      gainedMuscle: "+5.2 kg Lean Muscle",
      beforeImage: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800&auto=format&fit=crop",
      quote: "Running a startup in Bangalore meant 80-hour workweeks, chronic burnout, and terrible back pain. IronVault’s coaches completely re-engineered my training and nutrition. I have more energy now at 35 than I had at 22.",
      programUsed: "Personal Training & Body Transformation",
    },
    {
      id: "meera-n",
      name: "Meera Nandakumar",
      age: 29,
      occupation: "Principal UX Architect",
      duration: "16 Weeks",
      lostKg: "9.8 kg Body Recomp",
      gainedMuscle: "Deadlift PR: 120 kg",
      beforeImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800&auto=format&fit=crop",
      quote: "I used to be intimidated by heavy barbells and traditional gyms. Coach Ananya taught me proper Olympic bar kinematics. I went from zero pullups to cranking out sets of 8, and my deadlift exceeded 120kg. The atmosphere here is empowering.",
      programUsed: "Strength & Conditioning + Olympic Lifting",
    },
    {
      id: "rohan-d",
      name: "Rohan D'Souza",
      age: 42,
      occupation: "Managing Director, PE Firm",
      duration: "24 Weeks",
      lostKg: "18.2 kg Fat Lost",
      gainedMuscle: "Resting HR: 52 bpm",
      beforeImage: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=800&auto=format&fit=crop",
      quote: "I thought my age and travel schedule made it impossible to get lean. The structured 1-on-1 coaching and travel programming kept me accountable across Singapore and Bangalore. The cold plunge and sauna suite alone is worth the membership.",
      programUsed: "Black Diamond VIP Concierge Coaching",
    },
  ],

  testimonials: [
    {
      id: "test-1",
      name: "Karan Singhal",
      title: "Co-Founder & CTO, FinTech SaaS",
      rating: 5,
      text: "IronVault is the single best fitness facility in South India. There is zero ego, zero fluff, and zero waiting for power racks. The Eleiko equipment is pristine, the air filtration keeps the air cold and fresh, and the community is intensely focused.",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
      badge: "Gold Vault Member · 18 Months",
      date: "October 2026",
    },
    {
      id: "test-2",
      name: "Dr. Shalini Menon",
      title: "Consultant Orthopedic Surgeon",
      rating: 5,
      text: "As a surgeon who treats sports injuries, I am exceptionally critical of gym biomechanics. IronVault's equipment selection (especially Arsenal Strength's variable cam resistance) is scientifically superior. My joint integrity and spinal health have never been better.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
      badge: "VIP Member · 1 Year",
      date: "September 2026",
    },
    {
      id: "test-3",
      name: "Arjun Verma",
      title: "National Triathlete & Marathoner",
      rating: 5,
      text: "The combination of the Skillmill curved runners, Concept2 ergs, and the contrast cold plunge suite cut my marathon recovery time in half. Vikram and his team understand peak sports physiology like no other gym in Bangalore.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      badge: "Gold Vault Member · 2 Years",
      date: "August 2026",
    },
    {
      id: "test-4",
      name: "Tanvi Mathur",
      title: "Corporate Legal Counsel",
      rating: 5,
      text: "The 6:00 AM Vault Strike Boxing class is the absolute highlight of my week. The coaches bring electrifying energy, the facilities are spotlessly clean, and having high-end rainfall showers with Dyson dryers means I can head straight to high-stakes meetings.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
      badge: "Pro Member · 14 Months",
      date: "November 2026",
    },
  ],

  schedule: [
    { id: "s1", day: "Mon", time: "06:30 AM", className: "Iron Strength & Squats", trainer: "Vikram Sengupta", intensity: "Extreme", room: "Olympic Platform Zone", duration: "60m" },
    { id: "s2", day: "Mon", time: "08:00 AM", className: "Metabolic HIIT Engine", trainer: "Ananya Rao", intensity: "High", room: "Performance Turf Arena", duration: "45m" },
    { id: "s3", day: "Mon", time: "05:30 PM", className: "Vault Strike Boxing", trainer: "Devraj Pillai", intensity: "High", room: "Combat Strike Bay", duration: "55m" },
    { id: "s4", day: "Mon", time: "07:00 PM", className: "Hypertrophy Chest & Back", trainer: "Marcus Sterling", intensity: "High", room: "Strength Floor", duration: "60m" },

    { id: "s5", day: "Tue", time: "06:30 AM", className: "Olympic Clean & Jerk", trainer: "Vikram Sengupta", intensity: "Extreme", room: "Olympic Platform Zone", duration: "75m" },
    { id: "s6", day: "Tue", time: "08:00 AM", className: "Athletic Core & Reformer", trainer: "Sneha Kapoor", intensity: "Medium", room: "Reformer Studio", duration: "50m" },
    { id: "s7", day: "Tue", time: "06:00 PM", className: "Functional Turf War", trainer: "Priya Sundaram", intensity: "Extreme", room: "Performance Turf Arena", duration: "60m" },
    { id: "s8", day: "Tue", time: "07:30 PM", className: "Contrast Recovery & Breathwork", trainer: "Priya Sundaram", intensity: "Medium", room: "Spa & Hydro Suite", duration: "45m" },

    { id: "s9", day: "Wed", time: "06:30 AM", className: "Deadlift Mastery & Pulls", trainer: "Vikram Sengupta", intensity: "Extreme", room: "Olympic Platform Zone", duration: "70m" },
    { id: "s10", day: "Wed", time: "08:00 AM", className: "Metabolic Calorie Burner", trainer: "Ananya Rao", intensity: "High", room: "Performance Turf Arena", duration: "50m" },
    { id: "s11", day: "Wed", time: "05:30 PM", className: "Vault Strike Boxing Combos", trainer: "Devraj Pillai", intensity: "High", room: "Combat Strike Bay", duration: "55m" },
    { id: "s12", day: "Wed", time: "07:00 PM", className: "Shoulder & Arm Hypertrophy", trainer: "Marcus Sterling", intensity: "High", room: "Strength Floor", duration: "60m" },

    { id: "s13", day: "Thu", time: "06:30 AM", className: "Kettlebell & Sled Conditioning", trainer: "Priya Sundaram", intensity: "High", room: "Performance Turf Arena", duration: "55m" },
    { id: "s14", day: "Thu", time: "08:00 AM", className: "Spinal Health & Joint Mobility", trainer: "Priya Sundaram", intensity: "Medium", room: "Recovery Studio", duration: "45m" },
    { id: "s15", day: "Thu", time: "06:00 PM", className: "Technogym VO2 Max Cardio Circuit", trainer: "Ananya Rao", intensity: "High", room: "Cardio Sky Deck", duration: "50m" },
    { id: "s16", day: "Thu", time: "07:30 PM", className: "Heavy Bench Press Clinic", trainer: "Vikram Sengupta", intensity: "Extreme", room: "Olympic Platform Zone", duration: "60m" },

    { id: "s17", day: "Fri", time: "06:30 AM", className: "Full-Body Strength Peaking", trainer: "Vikram Sengupta", intensity: "Extreme", room: "Olympic Platform Zone", duration: "65m" },
    { id: "s18", day: "Fri", time: "08:00 AM", className: "Friday Burn HIIT Marathon", trainer: "Ananya Rao", intensity: "Extreme", room: "Performance Turf Arena", duration: "50m" },
    { id: "s19", day: "Fri", time: "05:30 PM", className: "Vault Strike Fight Night", trainer: "Devraj Pillai", intensity: "Extreme", room: "Combat Strike Bay", duration: "60m" },
    { id: "s20", day: "Fri", time: "07:00 PM", className: "Leg Destruction Day", trainer: "Marcus Sterling", intensity: "Extreme", room: "Strength Floor", duration: "65m" },

    { id: "s21", day: "Sat", time: "07:30 AM", className: "Weekend Warrior Team WOD", trainer: "Vikram & Ananya", intensity: "Extreme", room: "Whole Facility", duration: "75m" },
    { id: "s22", day: "Sat", time: "09:30 AM", className: "Olympic Snatch Clinic", trainer: "Vikram Sengupta", intensity: "Extreme", room: "Olympic Platform Zone", duration: "60m" },
    { id: "s23", day: "Sat", time: "05:00 PM", className: "Athletic Stretch & Deep Release", trainer: "Sneha Kapoor", intensity: "Medium", room: "Recovery Lounge", duration: "50m" },

    { id: "s24", day: "Sun", time: "08:00 AM", className: "Sunday Heavy Engine Rower & Sleds", trainer: "Devraj Pillai", intensity: "High", room: "Performance Turf Arena", duration: "60m" },
    { id: "s25", day: "Sun", time: "10:00 AM", className: "Hydrotherapy & Deep Sauna Recovery", trainer: "Priya Sundaram", intensity: "Medium", room: "Spa & Hydro Suite", duration: "60m" },
  ] as ScheduleItem[],

  faqs: [
    {
      q: "Where exactly is IronVault Fitness located in Bangalore?",
      a: "IronVault Fitness is situated in the heart of East Bangalore at Level 4 & 5, Apex Prestige Tower, 100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru (directly opposite Starbucks, near the Metro station). We offer dedicated covered valet parking for all members.",
    },
    {
      q: "What is included in the Free 3-Day VIP Trial?",
      a: "Your complimentary 3-day VIP trial grants you full access to all strength floors, the Technogym cardio deck, high-performance turf arena, executive steam and showers, as well as a 1-on-1 consultation with an InBody 3D body composition scan.",
    },
    {
      q: "What makes IronVault different from commercial commercial gym chains?",
      a: "We cap our active membership strictly to eliminate crowding. There are zero broken machines, no lines for squat racks, and we exclusively feature Olympic-grade Eleiko competition barbells and Arsenal Strength machines. Every trainer holds tier-1 international certifications (CSCS, EXOS, USAW).",
    },
    {
      q: "How does 24/7 access work?",
      a: "Members on our Gold Vault and Black Diamond VIP plans receive encrypted mobile NFC and biometric fingerprint credentials granting round-the-clock entry through our secure smart turnstiles, backed by 24/7 security personnel and surveillance.",
    },
    {
      q: "Can I freeze or pause my membership when traveling?",
      a: "Yes. Gold Vault and Black Diamond members can freeze their membership free of charge for up to 60 days per annual cycle via the IronVault mobile app or concierge desk.",
    },
    {
      q: "Is there nutrition and supplement support on-site?",
      a: "Yes. Our on-site Vault Shake & Nutrition Lab crafts fresh cold-pressed whey isolate smoothies, BCAAs, electrolytes, and cold brew coffee. Certified clinical dietitians formulate individualized macronutrient plans for our members.",
    },
  ],
};

