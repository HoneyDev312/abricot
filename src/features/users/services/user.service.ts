import { apiClient } from "@/shared/lib/api-client";
import type {
  UpdateUserPasswordPayload,
  UpdateUserProfilePayload,
  UpdateUserProfileResponse,
  UserProfile,
  UserProfileResponse,
} from "../types/user.types";

// Service métier utilisateur : il connaît les routes backend liées au profil.
export async function getUserProfile(): Promise<UserProfile> {
  const { user } = await apiClient.get<UserProfileResponse>("/auth/profile", {
    cache: "no-store",
  });

  return user;
}

export async function updateUserProfile(
  payload: UpdateUserProfilePayload
): Promise<UserProfile> {
  const { user } = await apiClient.put<UpdateUserProfileResponse>(
    "/auth/profile",
    payload
  );

  return user;
}

export function updateUserPassword(payload: UpdateUserPasswordPayload) {
  return apiClient.put<void>("/auth/password", payload);
}
