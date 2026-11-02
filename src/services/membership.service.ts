import { INITIAL_PLANS, SeedPlan } from "@/lib/db/seedData";

let plansStore: SeedPlan[] = [...INITIAL_PLANS];

export async function getPlansByGym(gymId: string): Promise<SeedPlan[]> {
  return plansStore.filter((p) => p.gymId === gymId);
}

export interface CreatePlanInput {
  name: string;
  durationDays: number;
  price: number;
  registrationFee: number;
  description: string;
  facilitiesIncluded: string[];
}

export async function createPlan(
  gymId: string,
  input: CreatePlanInput
): Promise<SeedPlan> {
  const newPlan: SeedPlan = {
    id: `plan-${Date.now()}`,
    gymId,
    name: input.name.trim(),
    durationDays: input.durationDays,
    price: input.price,
    registrationFee: input.registrationFee,
    description: input.description.trim(),
    facilitiesIncluded: input.facilitiesIncluded,
    isActive: true,
  };

  plansStore.push(newPlan);
  return newPlan;
}

export async function togglePlanStatus(
  gymId: string,
  planId: string
): Promise<SeedPlan | null> {
  const plan = plansStore.find((p) => p.gymId === gymId && p.id === planId);
  if (!plan) return null;
  plan.isActive = !plan.isActive;
  return plan;
}

