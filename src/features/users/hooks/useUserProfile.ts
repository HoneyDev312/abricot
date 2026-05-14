"use client";

import type { UserProfile } from "../types/user.types";

export function useUserProfile(profile: UserProfile) {
  const firstName = profile.firstname ?? "";
  const lastName = profile.name ?? "";

  return {
    email: profile.email,
    firstName,
    lastName,
  };
}
