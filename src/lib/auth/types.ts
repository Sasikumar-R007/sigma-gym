export type PlatformRole = "SUPER_ADMIN" | "USER";
export type GymRole = "OWNER" | "MANAGER" | "RECEPTIONIST" | "TRAINER";

export interface SessionGymRole {
  id: string;
  name: string;
  slug: string;
  role: GymRole;
}

export interface SessionUser {
  userId: string;
  email: string;
  fullName: string;
  platformRole: PlatformRole;
  activeGymId: string;
  activeGymName: string;
  activeGymSlug: string;
  gymRole: GymRole;
  availableGyms?: SessionGymRole[];
}

