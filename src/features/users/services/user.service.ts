import { apiClient } from "@/shared/lib/api-client";
import type { UserProfile, UserProfileResponse } from "../types/user.types";

// Service métier utilisateur : il connaît les routes backend liées au profil.
export async function getUserProfile(): Promise<UserProfile> {
  const { user } = await apiClient.get<UserProfileResponse>("/auth/profile", {
    cache: "no-store",
  });

  return user;
}
