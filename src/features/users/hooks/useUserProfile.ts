"use client";

import type { UserProfile } from "../types/user.types";

export function useUserProfile(profile: UserProfile) {
  const firstName = profile.firstname ?? "";
  const lastName = profile.name ?? "";
  const fullName = [firstName, lastName].filter(Boolean).join(" ");

  return {
    email: profile.email,
    firstName,
    fullName: fullName || profile.email,
    lastName,
  };
}
