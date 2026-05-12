// Utilisateur tel qu'il revient depuis les endpoints d'authentification.
export type AuthUser = {
  createdAt?: string;
  email: string;
  id: string;
  name?: string | null;
};

// Données envoyées au backend pour POST /auth/login.
export type LoginPayload = {
  email: string;
  password: string;
};

// Données reçues après une connexion réussie.
export type LoginResponse = {
  token: string;
  user: AuthUser;
};
