import { ButtonLink } from "@/shared/components/Button";
import { Logo } from "@/shared/components/Logo";
import { Typography } from "@/shared/components/Typography";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <section className={styles.panel} aria-labelledby="not-found-title">
        <Logo className={styles.logo} size="md" />

        <div className={styles.content}>
          <Typography
            as="h1"
            className={styles.kicker}
            color="brand"
            variant="h1"
          >
            404
          </Typography>
          <Typography as="h1" variant="h4">
            Page introuvable.
          </Typography>
          <Typography color="secondary" variant="large">
            Cette adresse ne correspond à aucune page Abricot. Le lien est
            peut-être incorrect ou la page a été déplacée.
          </Typography>
        </div>

        <div className={styles.actions}>
          <ButtonLink href="/dashboard">
            Retour au tableau de bord
          </ButtonLink>
          <ButtonLink href="/projects" variant="outline">
            Voir les projets
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
