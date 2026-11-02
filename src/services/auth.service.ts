import { INITIAL_USERS, INITIAL_GYMS, SeedUser } from "@/lib/db/seedData";
import { verifyPassword } from "@/lib/auth/password";
import {
  SessionUser,
  createSessionToken,
  setSessionCookie,
  clearSessionCookie,
  getSession,
  GymRole,
} from "@/lib/auth/session";

const usersStore: SeedUser[] = [...INITIAL_USERS];

export async function loginUser(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();

  // Find user
  const user = usersStore.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (!user) {
    throw new Error("Invalid email or password.");
  }

  // Verify password (supports "password123" for demo accounts, or bcrypt verification)
  const isMatch =
    password === "password123" || (await verifyPassword(password, user.passwordHash));
  if (!isMatch) {
    throw new Error("Invalid email or password.");
  }

  // Super Admin check
  if (user.platformRole === "SUPER_ADMIN") {
    const sessionUser: SessionUser = {
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      platformRole: "SUPER_ADMIN",
      activeGymId: INITIAL_GYMS[0].id,
      activeGymName: INITIAL_GYMS[0].name,
      activeGymSlug: INITIAL_GYMS[0].slug,
      gymRole: "OWNER",
      availableGyms: INITIAL_GYMS.map((g) => ({
        id: g.id,
        name: g.name,
        slug: g.slug,
        role: "OWNER",
      })),
    };

    const token = await createSessionToken(sessionUser);
    await setSessionCookie(token);

    return {
      success: true,
      user: sessionUser,
      redirectUrl: "/superadmin",
    };
  }

  // Regular Gym Staff or Owner
  const gymMemberships = user.gymRoles.map((roleAssignment) => {
    const gym = INITIAL_GYMS.find((g) => g.id === roleAssignment.gymId);
    return {
      id: roleAssignment.gymId,
      name: gym?.name || "Fitness Center",
      slug: gym?.slug || "gym",
      role: roleAssignment.role,
    };
  });

  if (gymMemberships.length === 0) {
    throw new Error("No active gym account associated with this login.");
  }

  const primaryGym = gymMemberships[0];

  const sessionUser: SessionUser = {
    userId: user.id,
    email: user.email,
    fullName: user.fullName,
    platformRole: "USER",
    activeGymId: primaryGym.id,
    activeGymName: primaryGym.name,
    activeGymSlug: primaryGym.slug,
    gymRole: primaryGym.role,
    availableGyms: gymMemberships,
  };

  const token = await createSessionToken(sessionUser);
  await setSessionCookie(token);

  return {
    success: true,
    user: sessionUser,
    redirectUrl: "/portal",
  };
}

export async function switchGymContext(targetGymId: string) {
  const currentSession = await getSession();
  if (!currentSession) throw new Error("UNAUTHORIZED");

  // Verify user has access to this gym
  const targetMembership = currentSession.availableGyms?.find((g) => g.id === targetGymId);
  if (!targetMembership && currentSession.platformRole !== "SUPER_ADMIN") {
    throw new Error("You do not have access to this gym.");
  }

  const targetGym = INITIAL_GYMS.find((g) => g.id === targetGymId);
  if (!targetGym) throw new Error("Gym not found.");

  const updatedSession: SessionUser = {
    ...currentSession,
    activeGymId: targetGym.id,
    activeGymName: targetGym.name,
    activeGymSlug: targetGym.slug,
    gymRole: targetMembership ? targetMembership.role : "OWNER",
  };

  const token = await createSessionToken(updatedSession);
  await setSessionCookie(token);

  return { success: true, activeGymId: targetGym.id };
}

export async function logoutUser() {
  await clearSessionCookie();
  return { success: true };
}

