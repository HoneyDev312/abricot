"use client";

import type { UserProfile } from "../types/user.types";

function splitName(name?: string | null) {
  const [firstName = "", ...lastNameParts] = name?.trim().split(" ") ?? [];

  return {
    firstName,
    lastName: lastNameParts.join(" "),
  };
}

export function useUserProfile(profile: UserProfile) {
  const { firstName, lastName } = splitName(profile.name);

  return {
    email: profile.email,
    firstName,
    fullName: profile.name || profile.email,
    lastName,
  };
}
