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

export type UpdateUserProfilePayload = {
  email: string;
  name: string;
};

export type UpdateUserProfileResponse = {
  user: UserProfile;
};

export type UpdateUserPasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export type PendingProfileValues = {
  email: string;
  name: string;
  newPassword: string;
};

export type ProfileUpdateFeedback = {
  message: string;
  type: "error" | "success";
};
