export interface SeedGym {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  brandColor: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  gstNumber: string;
  status: "ACTIVE" | "TRIAL" | "SUSPENDED";
  planTier: "STARTER" | "PRO" | "ENTERPRISE";
}

export interface SeedUser {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  platformRole: "SUPER_ADMIN" | "USER";
  passwordHash: string; // bcrypt hash for "password123"
  gymRoles: {
    gymId: string;
    role: "OWNER" | "MANAGER" | "RECEPTIONIST" | "TRAINER";
  }[];
}

export interface SeedPlan {
  id: string;
  gymId: string;
  name: string;
  durationDays: number;
  price: number;
  registrationFee: number;
  description: string;
  facilitiesIncluded: string[];
  isActive: boolean;
}

export interface SeedMember {
  id: string;
  gymId: string;
  memberCode: string;
  fullName: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  phone: string;
  email: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  bloodGroup: string;
  status: "ACTIVE" | "EXPIRING_SOON" | "EXPIRED" | "INACTIVE";
  joinedAt: string;
  activePlanName: string;
  planExpiryDate: string;
  balanceDue: number;
  totalPaid: number;
  photoUrl: string;
}

export interface SeedPayment {
  id: string;
  gymId: string;
  memberId: string;
  memberName: string;
  memberCode: string;
  receiptNumber: string;
  amount: number;
  paymentMethod: "CASH" | "UPI" | "CARD" | "BANK_TRANSFER";
  transactionRef?: string;
  paymentDate: string;
  planName: string;
  collectedBy: string;
}

export interface SeedAttendance {
  id: string;
  gymId: string;
  memberId: string;
  memberName: string;
  memberCode: string;
  checkInTime: string;
  checkInMethod: "MANUAL" | "QR_CODE";
  markedBy: string;
}

// bcrypt hash for "password123"
export const DEMO_PASSWORD_HASH = "$2b$10$EP3tWkO5F8Zz0y5ZlP4qE.n8PqRk0XyE5A1aW3P9n9L1z0k3J7Y9q";

export const INITIAL_GYMS: SeedGym[] = [
  {
    id: "gym-ironvault",
    name: "IronVault Fitness & Athletic Club",
    slug: "ironvault-blr",
    brandColor: "#CCFF00",
    address: "Apex Prestige Tower, 100ft Rd, Indiranagar",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560038",
    phone: "+91 80 4920 8800",
    email: "symphonixtech@gmail.com",
    gstNumber: "29AAAAA0000A1Z5",
    status: "ACTIVE",
    planTier: "PRO",
  },
  {
    id: "gym-apex",
    name: "Apex Strength Sanctuary",
    slug: "apex-strength",
    brandColor: "#FF5500",
    address: "4th Block, 80ft Main Rd, Koramangala",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560034",
    phone: "+91 80 4112 9900",
    email: "owner@apexstrength.com",
    gstNumber: "29BBBBB1111B2Z6",
    status: "ACTIVE",
    planTier: "PRO",
  },
];

export const INITIAL_USERS: SeedUser[] = [
  // Super Admin
  {
    id: "user-superadmin",
    email: "admin@symphonixtech.com",
    fullName: "Symphonix Platform Admin",
    phone: "+91 99000 11223",
    platformRole: "SUPER_ADMIN",
    passwordHash: DEMO_PASSWORD_HASH,
    gymRoles: [],
  },
  // IronVault Owner
  {
    id: "user-ironvault-owner",
    email: "owner@ironvault.com",
    fullName: "Vikramaditya Rao",
    phone: "+91 98450 11223",
    platformRole: "USER",
    passwordHash: DEMO_PASSWORD_HASH,
    gymRoles: [{ gymId: "gym-ironvault", role: "OWNER" }],
  },
  // IronVault Receptionist
  {
    id: "user-ironvault-reception",
    email: "reception@ironvault.com",
    fullName: "Pooja Hegde",
    phone: "+91 98450 22334",
    platformRole: "USER",
    passwordHash: DEMO_PASSWORD_HASH,
    gymRoles: [{ gymId: "gym-ironvault", role: "RECEPTIONIST" }],
  },
  // IronVault Head Trainer
  {
    id: "user-ironvault-trainer",
    email: "trainer@ironvault.com",
    fullName: "Marcus Vance",
    phone: "+91 98450 33445",
    platformRole: "USER",
    passwordHash: DEMO_PASSWORD_HASH,
    gymRoles: [{ gymId: "gym-ironvault", role: "TRAINER" }],
  },
  // Apex Strength Owner
  {
    id: "user-apex-owner",
    email: "owner@apexstrength.com",
    fullName: "Karthik Subramanian",
    phone: "+91 97410 88990",
    platformRole: "USER",
    passwordHash: DEMO_PASSWORD_HASH,
    gymRoles: [{ gymId: "gym-apex", role: "OWNER" }],
  },
];

export const INITIAL_PLANS: SeedPlan[] = [
  {
    id: "plan-iv-1",
    gymId: "gym-ironvault",
    name: "Monthly Strength Foundation",
    durationDays: 30,
    price: 3499,
    registrationFee: 1000,
    description: "Standard gym access with full Eleiko equipment and locker rooms.",
    facilitiesIncluded: ["Strength Floor", "Cardio Zone", "Steam & Showers"],
    isActive: true,
  },
  {
    id: "plan-iv-2",
    gymId: "gym-ironvault",
    name: "Quarterly Athletic Transformation",
    durationDays: 90,
    price: 8999,
    registrationFee: 0,
    description: "Our most popular 3-month cycle with bi-weekly body composition scans.",
    facilitiesIncluded: ["All Strength Decks", "Contrast Hydrotherapy", "InBody Assessment"],
    isActive: true,
  },
  {
    id: "plan-iv-3",
    gymId: "gym-ironvault",
    name: "Annual Vault Black Elite",
    durationDays: 365,
    price: 26999,
    registrationFee: 0,
    description: "VIP All-Access with free valet, hydrotherapy suite, and 2 complimentary PT sessions.",
    facilitiesIncluded: ["24/7 Keyless Access", "Hydrotherapy Cold Plunge", "2 Master PT Sessions", "Laundry Service"],
    isActive: true,
  },
  {
    id: "plan-apex-1",
    gymId: "gym-apex",
    name: "Quarterly Powerlifting Access",
    durationDays: 90,
    price: 7500,
    registrationFee: 500,
    description: "Calibrated plates, deadlift platforms, and chalk privileges.",
    facilitiesIncluded: ["Power Racks", "Chalk Arena", "Open Turf"],
    isActive: true,
  },
];

export const INITIAL_MEMBERS: SeedMember[] = [
  {
    id: "mem-iv-1",
    gymId: "gym-ironvault",
    memberCode: "IV-1001",
    fullName: "Rajesh Kannan",
    gender: "MALE",
    phone: "+91 98860 12345",
    email: "rajesh.k@gmail.com",
    emergencyContactName: "Deepa Kannan",
    emergencyContactPhone: "+91 98860 54321",
    bloodGroup: "O+",
    status: "ACTIVE",
    joinedAt: "2026-08-15",
    activePlanName: "Annual Vault Black Elite",
    planExpiryDate: "2027-08-14",
    balanceDue: 0,
    totalPaid: 26999,
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "mem-iv-2",
    gymId: "gym-ironvault",
    memberCode: "IV-1002",
    fullName: "Meera Nambiar",
    gender: "FEMALE",
    phone: "+91 99450 67890",
    email: "meera.nambiar@techcorp.in",
    emergencyContactName: "Siddharth Menon",
    emergencyContactPhone: "+91 99450 99887",
    bloodGroup: "B+",
    status: "ACTIVE",
    joinedAt: "2026-09-01",
    activePlanName: "Quarterly Athletic Transformation",
    planExpiryDate: "2026-11-30",
    balanceDue: 0,
    totalPaid: 8999,
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "mem-iv-3",
    gymId: "gym-ironvault",
    memberCode: "IV-1003",
    fullName: "Rohan Deshmukh",
    gender: "MALE",
    phone: "+91 97310 44556",
    email: "rohan.deshmukh@gmail.com",
    emergencyContactName: "Priya Deshmukh",
    emergencyContactPhone: "+91 97310 11223",
    bloodGroup: "A+",
    status: "EXPIRING_SOON",
    joinedAt: "2026-08-10",
    activePlanName: "Quarterly Athletic Transformation",
    planExpiryDate: "2026-11-08", // Expiring in 6 days
    balanceDue: 0,
    totalPaid: 8999,
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "mem-iv-4",
    gymId: "gym-ironvault",
    memberCode: "IV-1004",
    fullName: "Ananya Swaminathan",
    gender: "FEMALE",
    phone: "+91 98450 77889",
    email: "ananya.s@outlook.com",
    emergencyContactName: "Swaminathan K",
    emergencyContactPhone: "+91 98450 33441",
    bloodGroup: "AB+",
    status: "EXPIRED",
    joinedAt: "2026-07-01",
    activePlanName: "Monthly Strength Foundation",
    planExpiryDate: "2026-10-25", // Expired 8 days ago
    balanceDue: 0,
    totalPaid: 3499,
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "mem-iv-5",
    gymId: "gym-ironvault",
    memberCode: "IV-1005",
    fullName: "Arjun Natarajan",
    gender: "MALE",
    phone: "+91 96110 33221",
    email: "arjun.natarajan@gmail.com",
    emergencyContactName: "Gauri Natarajan",
    emergencyContactPhone: "+91 96110 99887",
    bloodGroup: "O-",
    status: "ACTIVE",
    joinedAt: "2026-10-15",
    activePlanName: "Quarterly Athletic Transformation",
    planExpiryDate: "2027-01-14",
    balanceDue: 2000, // Partial payment due
    totalPaid: 6999,
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "mem-iv-6",
    gymId: "gym-ironvault",
    memberCode: "IV-1006",
    fullName: "Divya Balakrishnan",
    gender: "FEMALE",
    phone: "+91 99000 88776",
    email: "divya.bala@gmail.com",
    emergencyContactName: "Balakrishnan R",
    emergencyContactPhone: "+91 99000 11223",
    bloodGroup: "B-",
    status: "ACTIVE",
    joinedAt: "2026-10-20",
    activePlanName: "Monthly Strength Foundation",
    planExpiryDate: "2026-11-19",
    balanceDue: 0,
    totalPaid: 4499,
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
  },
  // Apex Strength Members
  {
    id: "mem-apex-1",
    gymId: "gym-apex",
    memberCode: "APX-001",
    fullName: "Varun Reddy",
    gender: "MALE",
    phone: "+91 98800 55443",
    email: "varun.reddy@gmail.com",
    emergencyContactName: "Suresh Reddy",
    emergencyContactPhone: "+91 98800 11223",
    bloodGroup: "O+",
    status: "ACTIVE",
    joinedAt: "2026-09-10",
    activePlanName: "Quarterly Powerlifting Access",
    planExpiryDate: "2026-12-09",
    balanceDue: 0,
    totalPaid: 8000,
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop",
  },
];

export const INITIAL_PAYMENTS: SeedPayment[] = [
  {
    id: "pay-iv-1",
    gymId: "gym-ironvault",
    memberId: "mem-iv-1",
    memberName: "Rajesh Kannan",
    memberCode: "IV-1001",
    receiptNumber: "IV-REC-2026-0042",
    amount: 26999,
    paymentMethod: "UPI",
    transactionRef: "UPI/324109882190/GPay",
    paymentDate: "2026-08-15 11:24 AM",
    planName: "Annual Vault Black Elite",
    collectedBy: "Vikramaditya Rao",
  },
  {
    id: "pay-iv-2",
    gymId: "gym-ironvault",
    memberId: "mem-iv-2",
    memberName: "Meera Nambiar",
    memberCode: "IV-1002",
    receiptNumber: "IV-REC-2026-0058",
    amount: 8999,
    paymentMethod: "CARD",
    transactionRef: "HDFC-POS-8831",
    paymentDate: "2026-09-01 07:15 PM",
    planName: "Quarterly Athletic Transformation",
    collectedBy: "Pooja Hegde",
  },
  {
    id: "pay-iv-3",
    gymId: "gym-ironvault",
    memberId: "mem-iv-3",
    memberName: "Rohan Deshmukh",
    memberCode: "IV-1003",
    receiptNumber: "IV-REC-2026-0071",
    amount: 8999,
    paymentMethod: "UPI",
    transactionRef: "PhonePe/9921008761",
    paymentDate: "2026-08-10 09:30 AM",
    planName: "Quarterly Athletic Transformation",
    collectedBy: "Pooja Hegde",
  },
  {
    id: "pay-iv-4",
    gymId: "gym-ironvault",
    memberId: "mem-iv-5",
    memberName: "Arjun Natarajan",
    memberCode: "IV-1005",
    receiptNumber: "IV-REC-2026-0094",
    amount: 6999, // Partial payment
    paymentMethod: "CASH",
    paymentDate: "2026-10-15 06:45 PM",
    planName: "Quarterly Athletic Transformation (Part 1/2)",
    collectedBy: "Pooja Hegde",
  },
  {
    id: "pay-iv-5",
    gymId: "gym-ironvault",
    memberId: "mem-iv-6",
    memberName: "Divya Balakrishnan",
    memberCode: "IV-1006",
    receiptNumber: "IV-REC-2026-0102",
    amount: 4499,
    paymentMethod: "UPI",
    transactionRef: "Paytm/1122998844",
    paymentDate: "2026-10-20 08:10 AM",
    planName: "Monthly Strength Foundation",
    collectedBy: "Vikramaditya Rao",
  },
  // Apex Payment
  {
    id: "pay-apex-1",
    gymId: "gym-apex",
    memberId: "mem-apex-1",
    memberName: "Varun Reddy",
    memberCode: "APX-001",
    receiptNumber: "APX-2026-0012",
    amount: 8000,
    paymentMethod: "UPI",
    transactionRef: "UPI/8877112233",
    paymentDate: "2026-09-10 10:00 AM",
    planName: "Quarterly Powerlifting Access",
    collectedBy: "Karthik Subramanian",
  },
];

export const INITIAL_ATTENDANCE: SeedAttendance[] = [
  {
    id: "att-iv-1",
    gymId: "gym-ironvault",
    memberId: "mem-iv-1",
    memberName: "Rajesh Kannan",
    memberCode: "IV-1001",
    checkInTime: "Today at 06:45 AM",
    checkInMethod: "QR_CODE",
    markedBy: "Auto Turnstile",
  },
  {
    id: "att-iv-2",
    gymId: "gym-ironvault",
    memberId: "mem-iv-2",
    memberName: "Meera Nambiar",
    memberCode: "IV-1002",
    checkInTime: "Today at 07:15 AM",
    checkInMethod: "MANUAL",
    markedBy: "Pooja Hegde",
  },
  {
    id: "att-iv-3",
    gymId: "gym-ironvault",
    memberId: "mem-iv-5",
    memberName: "Arjun Natarajan",
    memberCode: "IV-1005",
    checkInTime: "Today at 08:30 AM",
    checkInMethod: "QR_CODE",
    markedBy: "Auto Turnstile",
  },
];

