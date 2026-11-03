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

export interface UpdatePlanInput {
  id: string;
  name?: string;
  durationDays?: number;
  price?: number;
  registrationFee?: number;
  description?: string;
  facilitiesIncluded?: string[];
  isActive?: boolean;
}

export async function updatePlan(
  gymId: string,
  planId: string,
  input: UpdatePlanInput
): Promise<SeedPlan | null> {
  const plan = plansStore.find((p) => p.gymId === gymId && p.id === planId);
  if (!plan) return null;

  if (input.name !== undefined) plan.name = input.name.trim();
  if (input.durationDays !== undefined) plan.durationDays = Number(input.durationDays);
  if (input.price !== undefined) plan.price = Number(input.price);
  if (input.registrationFee !== undefined) plan.registrationFee = Number(input.registrationFee);
  if (input.description !== undefined) plan.description = input.description.trim();
  if (input.facilitiesIncluded !== undefined) plan.facilitiesIncluded = input.facilitiesIncluded;
  if (input.isActive !== undefined) plan.isActive = Boolean(input.isActive);

  return plan;
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

