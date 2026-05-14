import { apiClient } from "@/shared/lib/api-client";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "../types/auth.types";

// Service métier auth : il connaît les routes backend liées à l'authentification.
export function login(payload: LoginPayload) {
  return apiClient.post<LoginResponse>("/auth/login", payload, { auth: false });
}

export function register(payload: RegisterPayload) {
  return apiClient.post<RegisterResponse>("/auth/register", payload, {
    auth: false,
  });
}
