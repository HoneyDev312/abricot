"use server";

import { revalidatePath } from "next/cache";
import { login } from "@/features/auth/services/auth.service";
import { updateUserPassword, updateUserProfile } from "./user.service";

export type UpdateProfileActionState = {
  error?: string;
  success?: boolean;
};

export async function updateProfileAction(
  _state: UpdateProfileActionState,
  formData: FormData,
): Promise<UpdateProfileActionState> {
  const currentEmail = String(formData.get("currentEmail") ?? "");
  const currentPassword = String(formData.get("currentPassword") ?? "");
  const email = String(formData.get("email") ?? "");
  const name = String(formData.get("name") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");

  try {
    // Le backend ne demande pas le mot de passe actuel pour modifier le profil.
    // On force donc cette vérification côté Server Action avant toute mise à jour.
    await login({ email: currentEmail, password: currentPassword });

    await updateUserProfile({ email, name });

    // Le changement de mot de passe reste optionnel : champ vide = profil seul.
    if (newPassword) {
      await updateUserPassword({ currentPassword, newPassword });
    }
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Impossible de modifier le profil pour le moment",
      success: false,
    };
  }

  revalidatePath("/account");

  return { success: true };
}
