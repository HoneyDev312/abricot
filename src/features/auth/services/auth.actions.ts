"use server";

import { redirect } from "next/navigation";
import { login, register } from "./auth.service";
import { clearAuthToken, setAuthToken } from "./session.service";

// Etat renvoyé au composant client après tentative de connexion.
export type LoginActionState = {
  error?: string;
};

export type RegisterActionState = {
  error?: string;
};

// Server Action appelée directement par le formulaire de connexion.
export async function loginAction(
  _state: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  // FormData vient des champs HTML qui portent les noms `email` et `password`.
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  try {
    // Si le backend valide les identifiants, il renvoie un JWT.
    const { token } = await login({ email, password });

    // Le JWT est placé dans un cookie sécurisé côté serveur.
    await setAuthToken(token);
  } catch (error) {
    // En cas d'erreur, on retourne un état lisible par le formulaire client.
    return {
      error:
        error instanceof Error
          ? error.message
          : "Impossible de se connecter pour le moment",
    };
  }

  // redirect doit rester hors du try/catch car Next lève une exception interne.
  redirect("/dashboard");
}

// Server Action appelée par le bouton de déconnexion.
export async function logoutAction() {
  await clearAuthToken();
  redirect("/login");
}

export async function registerAction(
  _state: RegisterActionState,
  formData: FormData
): Promise<RegisterActionState> {
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  try {
    const { token } = await register({ email, name, password });

    await setAuthToken(token);
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Impossible de créer le compte pour le moment",
    };
  }

  redirect("/dashboard");
}
