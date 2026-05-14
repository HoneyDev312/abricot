// Profil utilisateur tel qu'il est renvoyé par GET /auth/profile.
export type UserProfile = {
  createdAt?: string;
  email: string;
  id: string;
  name?: string | null;
  updatedAt?: string;
};

// Le backend enveloppe le profil dans une clé `user`.
export type UserProfileResponse = {
  user: UserProfile;
};
