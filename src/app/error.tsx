"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/shared/components/Button";
import { Logo } from "@/shared/components/Logo";
import { Typography } from "@/shared/components/Typography";
import styles from "./error.module.css";

type ErrorPageProps = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

export default function ErrorPage({ error, unstable_retry }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.page}>
      <section className={styles.panel} aria-labelledby="error-title">
        <Logo className={styles.logo} size="md" />

        <div className={styles.content}>
          <Typography
            as="h1"
            className={styles.kicker}
            color="brand"
            variant="h1"
          >
            Erreur
          </Typography>
          <Typography as="h4" variant="h4">
            {error.message}
          </Typography>
          <Typography color="secondary" variant="large">
            La page n’a pas pu s’afficher correctement. Vous pouvez réessayer ou
            revenir au tableau de bord.
          </Typography>
        </div>

        <div className={styles.actions}>
          <Button onClick={() => unstable_retry()} type="button">
            Réessayer
          </Button>
          <ButtonLink href="/projects" variant="outline">
            Retour aux projets
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
