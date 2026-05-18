import { Icon } from "@/shared/components/Icons";
import { Typography } from "@/shared/components/Typography";
import styles from "./ProjectCard.module.css";

export function ProjectCard() {
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <Typography as="h5" className={styles.title} variant="h5">
          Nom du projet
        </Typography>
        <Typography color="secondary" variant="small">
          Développement de la nouvelle version de l&apos;API REST avec
          authentification JWT
        </Typography>
      </header>

      <div className={styles.progressBlock}>
        <div className={styles.progressHeader}>
          <Typography color="secondary" variant="small">
            Progression
          </Typography>
          <Typography color="primary" variant="small">
            0%
          </Typography>
        </div>
        <div
          aria-label="Progression du projet"
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={0}
          className={styles.progress}
          role="progressbar"
        >
          <span className={styles.progressValue} />
        </div>
        <Typography color="secondary" variant="small">
          0/2 tâches terminées
        </Typography>
      </div>

      <footer className={styles.footer}>
        <div className={styles.team}>
          <Icon color="neutral" name="team" size="14px" />
          <Typography color="secondary" variant="small">
            Équipe (3)
          </Typography>
        </div>

        <div className={styles.members} aria-label="Membres du projet">
          <span className={styles.ownerAvatar}>AD</span>
          <span className={styles.ownerBadge}>Propriétaire</span>
          <span className={styles.contributorAvatar}>BC</span>
          <span className={styles.contributorAvatar}>CV</span>
        </div>
      </footer>
    </article>
  );
}
