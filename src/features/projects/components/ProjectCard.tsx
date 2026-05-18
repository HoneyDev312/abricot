import { getUserInitials } from "@/features/users/services/user.helpers";
import { Icon } from "@/shared/components/Icons";
import { Typography } from "@/shared/components/Typography";
import Link from "next/link";
import type { Project } from "../types/project.types";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const totalTasks = project._count.tasks;
  const completedTasks = 0;
  const progress = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;
  const visibleMembers = project.members;
  const teamCount = project.members.length + 1;
  console.log("ProjectCard rendered for project:", project);

  return (
    <Link
      aria-label={`Voir le projet ${project.name}`}
      className={styles.cardLink}
      href={`/projects/${project.id}`}
    >
      <article className={styles.card}>
        <header className={styles.header}>
          <Typography as="h5" className={styles.title} variant="h5">
            {project.name}
          </Typography>
          <Typography color="secondary" variant="small">
            {project.description || "Aucune description"}
          </Typography>
        </header>

        <div className={styles.progressBlock}>
          <div className={styles.progressHeader}>
            <Typography color="secondary" variant="small">
              Progression
            </Typography>
            <Typography color="primary" variant="small">
              {progress}%
            </Typography>
          </div>
          <div
            aria-label="Progression du projet"
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={progress}
            className={styles.progress}
            role="progressbar"
          >
            <span
              className={styles.progressValue}
              style={{ width: `${progress}%` }}
            />
          </div>
          <Typography color="secondary" variant="small">
            {completedTasks}/{totalTasks} tâches terminées
          </Typography>
        </div>

        <footer className={styles.footer}>
          <div className={styles.team}>
            <Icon color="neutral" name="team" size="14px" />
            <Typography color="secondary" variant="small">
              Équipe ({teamCount})
            </Typography>
          </div>

          <div className={styles.members} aria-label="Membres du projet">
            <span className={styles.ownerAvatar}>
              {getUserInitials(project.owner)}
            </span>
            <span className={styles.ownerBadge}>Propriétaire</span>
            {visibleMembers.map((member) => (
              <span className={styles.contributorAvatar} key={member.id}>
                {getUserInitials(member.user)}
              </span>
            ))}
          </div>
        </footer>
      </article>
    </Link>
  );
}
