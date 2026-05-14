import { apiClient } from "@/shared/lib/api-client";
import type { LoginPayload, LoginResponse } from "../types/auth.types";

// Service métier auth : il connaît les routes backend liées à l'authentification.
export function login(payload: LoginPayload) {
  return apiClient.post<LoginResponse>("/auth/login", payload, { auth: false });
}
