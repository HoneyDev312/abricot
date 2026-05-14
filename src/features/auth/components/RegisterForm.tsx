"use client";

import { useActionState } from "react";
import { Button } from "@/shared/components/Button";
import { TextInput } from "@/shared/components/Input";
import { Typography } from "@/shared/components/Typography";
import { registerAction } from "../services/auth.actions";
import styles from "./RegisterForm.module.css";

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, {});

  return (
    <form action={formAction} className={styles.form}>
      <Typography as="h1" className={styles.title} variant="h1">
        Inscription
      </Typography>

      <div className={styles.fields}>
        <TextInput
          autoComplete="name"
          label="Nom"
          name="name"
          required
          type="text"
        />
        <TextInput
          autoComplete="firstname"
          label="Prénom"
          name="firstname"
          required
          type="text"
        />
        <TextInput
          autoComplete="email"
          label="Email"
          name="email"
          required
          type="email"
        />
        <TextInput
          autoComplete="new-password"
          label="Mot de passe"
          minLength={8}
          name="password"
          required
          type="password"
        />
      </div>

      {state.error ? (
        <Typography className={styles.error} variant="small">
          {state.error}
        </Typography>
      ) : null}

      <Button className={styles.submit} disabled={isPending} type="submit">
        {isPending ? "Inscription..." : "S'inscrire"}
      </Button>
    </form>
  );
}
