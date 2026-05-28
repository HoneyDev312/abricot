"use client";

import { useActionState, useState } from "react";
import { Button } from "@/shared/components/Button";
import { TextInput } from "@/shared/components/Input";
import { Typography } from "@/shared/components/Typography";
import { loginAction } from "../services/auth.actions";
import { ForgotPasswordModal } from "./ForgotPasswordModal";
import styles from "./LoginForm.module.css";

export function LoginForm() {
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  // useActionState connecte le formulaire React à la Server Action.
  // state contient ici l'éventuel message d'erreur renvoyé par loginAction.
  const [state, formAction, isPending] = useActionState(loginAction, {});

  return (
    <>
      <form action={formAction} className={styles.form}>
        <Typography as="h1" className={styles.title} variant="h1">
          Connexion
        </Typography>

        <div className={styles.fields}>
          <TextInput
            autoComplete="email"
            label="Email"
            name="email"
            required
            type="email"
          />
          <TextInput
            autoComplete="current-password"
            label="Mot de passe"
            name="password"
            required
            type="password"
          />
        </div>

        {/* Affiche l'erreur backend ou réseau sans quitter la page. */}
        {state.error ? (
          <Typography className={styles.error} variant="small">
            {state.error}
          </Typography>
        ) : null}

        <Button
          className={styles.submit}
          disabled={isPending}
          fullWidth
          type="submit"
        >
          {isPending ? "Connexion..." : "Se connecter"}
        </Button>

        <button
          className={styles.forgotLink}
          onClick={() => setIsForgotPasswordModalOpen(true)}
          type="button"
        >
          Mot de passe oublié?
        </button>
      </form>

      <ForgotPasswordModal
        isOpen={isForgotPasswordModalOpen}
        onClose={() => setIsForgotPasswordModalOpen(false)}
      />
    </>
  );
}
