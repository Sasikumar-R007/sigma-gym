import { INITIAL_GYMS, SeedGym } from "@/lib/db/seedData";
import { prisma } from "@/lib/db/prisma";

// In-memory tenant store fallback
let gymsStore: SeedGym[] = [...INITIAL_GYMS];

export async function getGymById(gymId: string): Promise<SeedGym | null> {
  try {
    const dbGym = await prisma.gym.findUnique({
      where: { id: gymId },
    });
    if (dbGym) {
      return {
        id: dbGym.id,
        name: dbGym.name,
        slug: dbGym.slug,
        brandColor: dbGym.brandColor,
        address: dbGym.address,
        city: dbGym.city,
        state: dbGym.state,
        pincode: dbGym.pincode,
        phone: dbGym.phone,
        email: dbGym.email,
        gstNumber: dbGym.gstNumber || "",
        status: dbGym.status as "ACTIVE" | "TRIAL" | "SUSPENDED",
        planTier: dbGym.planTier as "STARTER" | "PRO" | "ENTERPRISE",
      };
    }
  } catch {
    // Graceful fallback to memory store
  }
  return gymsStore.find((g) => g.id === gymId) || null;
}

export async function getGymBySlug(slug: string): Promise<SeedGym | null> {
  try {
    const dbGym = await prisma.gym.findUnique({
      where: { slug },
    });
    if (dbGym) {
      return {
        id: dbGym.id,
        name: dbGym.name,
        slug: dbGym.slug,
        brandColor: dbGym.brandColor,
        address: dbGym.address,
        city: dbGym.city,
        state: dbGym.state,
        pincode: dbGym.pincode,
        phone: dbGym.phone,
        email: dbGym.email,
        gstNumber: dbGym.gstNumber || "",
        status: dbGym.status as "ACTIVE" | "TRIAL" | "SUSPENDED",
        planTier: dbGym.planTier as "STARTER" | "PRO" | "ENTERPRISE",
      };
    }
  } catch {
    // Graceful fallback
  }
  return gymsStore.find((g) => g.slug === slug) || null;
}

export async function getAllGyms(): Promise<SeedGym[]> {
  try {
    const dbGyms = await prisma.gym.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (dbGyms.length > 0) {
      return dbGyms.map((g) => ({
        id: g.id,
        name: g.name,
        slug: g.slug,
        brandColor: g.brandColor,
        address: g.address,
        city: g.city,
        state: g.state,
        pincode: g.pincode,
        phone: g.phone,
        email: g.email,
        gstNumber: g.gstNumber || "",
        status: g.status as "ACTIVE" | "TRIAL" | "SUSPENDED",
        planTier: g.planTier as "STARTER" | "PRO" | "ENTERPRISE",
      }));
    }
  } catch {
    // Fallback
  }
  return gymsStore;
}

