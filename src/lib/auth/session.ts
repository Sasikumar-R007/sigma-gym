import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export type PlatformRole = "SUPER_ADMIN" | "USER";
export type GymRole = "OWNER" | "MANAGER" | "RECEPTIONIST" | "TRAINER";

export interface SessionUser {
  userId: string;
  email: string;
  fullName: string;
  platformRole: PlatformRole;
  activeGymId: string;
  activeGymName: string;
  activeGymSlug: string;
  gymRole: GymRole;
  availableGyms?: {
    id: string;
    name: string;
    slug: string;
    role: GymRole;
  }[];
}

const COOKIE_NAME = "symphonix_os_session";
const SECRET_KEY = new TextEncoder().encode(
  process.env.AUTH_SECRET || "symphonix-gym-os-production-grade-jwt-secret-key-32chars"
);

export async function createSessionToken(user: SessionUser): Promise<string> {
  return new SignJWT({ ...user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET_KEY);
}

export async function verifySessionToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as unknown as SessionUser;
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string) {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export async function clearSessionCookie() {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function requireSession(allowedRoles?: GymRole[]): Promise<SessionUser> {
  const session = await getSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  if (session.platformRole === "SUPER_ADMIN") {
    return session;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(session.gymRole)) {
    throw new Error("FORBIDDEN");
  }

  return session;
}

export async function requireSuperAdmin(): Promise<SessionUser> {
  const session = await getSession();
  if (!session || session.platformRole !== "SUPER_ADMIN") {
    throw new Error("SUPER_ADMIN_REQUIRED");
  }
  return session;
}

