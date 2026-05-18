import { Icon } from "@/shared/components/Icons";
import { Typography } from "@/shared/components/Typography";
import Link from "next/link";
import type { ProjectDetails } from "../types/project.types";
import { EditProjectButton } from "./EditProjectButton";
import styles from "./ProjectDetailsHeader.module.css";

type ProjectDetailsHeaderProps = {
  description: string;
  project: ProjectDetails;
  title: string;
};

export function ProjectDetailsHeader({
  description,
  project,
  title,
}: ProjectDetailsHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link
          aria-label="Retour aux projets"
          className={styles.backLink}
          href="/projects"
        >
          ←
        </Link>

        <div className={styles.heading}>
          <div className={styles.titleRow}>
            <Typography as="h4" variant="h4">
              {title}
            </Typography>
            <EditProjectButton project={project} />
          </div>

          <Typography color="secondary" variant="large">
            {description}
          </Typography>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.createTaskButton} type="button">
          Créer une tâche
        </button>
        <button aria-label="Assistant IA" className={styles.aiButton} type="button">
          <Icon color="light" name="star" size="16px" />
          IA
        </button>
      </div>
    </header>
  );
}
