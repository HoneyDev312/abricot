// Utilisateur tel qu'il revient depuis les endpoints d'authentification.
export type AuthUser = {
  createdAt?: string;
  email: string;
  firstname?: string | null;
  id: string;
  name?: string | null;
};

// Données envoyées au backend pour POST /auth/login.
export type LoginPayload = {
  email: string;
  password: string;
};

// Données envoyées au backend pour POST /auth/register.
export type RegisterPayload = {
  email: string;
  firstname: string;
  name: string;
  password: string;
};

// Données reçues après une connexion réussie.
export type LoginResponse = {
  token: string;
  user: AuthUser;
};

// Données reçues après une inscription réussie.
export type RegisterResponse = LoginResponse;
