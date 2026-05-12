import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Nom du cookie qui stocke le JWT côté navigateur.
const AUTH_COOKIE_NAME = "abricot_token";

// Durée de vie du cookie : 7 jours, exprimés en secondes.
const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

// Lecture du token depuis les Server Components, Server Actions ou Route Handlers.
export async function getAuthToken() {
  return (await cookies()).get(AUTH_COOKIE_NAME)?.value;
}

// Protège une page privée : sans token, l'utilisateur retourne au login.
export async function requireAuth() {
  const token = await getAuthToken();

  if (!token) {
    redirect("/login");
  }

  return token;
}

// Empêche un utilisateur connecté de revoir les pages login/register.
export async function redirectIfAuthenticated() {
  const token = await getAuthToken();

  if (token) {
    redirect("/dashboard");
  }
}

// Stockage du token dans un cookie httpOnly pour éviter l'accès depuis JavaScript.
export async function setAuthToken(token: string) {
  (await cookies()).set({
    httpOnly: true,
    maxAge: AUTH_COOKIE_MAX_AGE,
    name: AUTH_COOKIE_NAME,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    value: token,
  });
}

// Suppression du cookie, utile pour un futur logout.
export async function clearAuthToken() {
  (await cookies()).delete(AUTH_COOKIE_NAME);
}
