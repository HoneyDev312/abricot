import type { ApiResponse } from "@/shared/types/api.types";

// URL du backend Express. La variable d'environnement permet de changer
// facilement d'API entre local, staging et production.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type RequestOptions = Omit<RequestInit, "body"> & {
  auth?: boolean;
  body?: unknown;
  token?: string;
};

// Erreur personnalisée pour conserver le statut HTTP et le code d'erreur backend.
export class ApiError extends Error {
  code?: string;
  status: number;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

async function request<T>(
  endpoint: string,
  { auth = true, body, headers, token, ...options }: RequestOptions = {}
): Promise<T> {
  const authToken = token ?? (auth ? await getSessionToken() : undefined);

  // Tous les appels backend passent par ce wrapper pour centraliser les headers,
  // la sérialisation JSON et la gestion des erreurs.
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...headers,
    },
  });

  const payload = (await response.json()) as ApiResponse<T>;

  // Le backend renvoie à la fois un statut HTTP et un champ `success`.
  // On vérifie les deux pour éviter de traiter une erreur comme une réussite.
  if (!response.ok || !payload.success) {
    throw new ApiError(
      payload.message || "Une erreur est survenue",
      response.status,
      payload.error
    );
  }

  return payload.data as T;
}

// Charge le service de session uniquement côté serveur : il utilise `next/headers`,
// qui ne peut pas être importé dans le bundle navigateur.
async function getSessionToken() {
  if (typeof window !== "undefined") {
    return undefined;
  }

  const { getAuthToken } = await import(
    "@/features/auth/services/session.service"
  );

  return getAuthToken();
}

// API minimale pour les méthodes HTTP dont on aura besoin dans les services métier.
export const apiClient = {
  get<T>(endpoint: string, options?: RequestOptions) {
    return request<T>(endpoint, { ...options, method: "GET" });
  },
  post<T>(endpoint: string, body?: unknown, options?: RequestOptions) {
    return request<T>(endpoint, { ...options, body, method: "POST" });
  },
  put<T>(endpoint: string, body?: unknown, options?: RequestOptions) {
    return request<T>(endpoint, { ...options, body, method: "PUT" });
  },
  delete<T>(endpoint: string, options?: RequestOptions) {
    return request<T>(endpoint, { ...options, method: "DELETE" });
  },
};
