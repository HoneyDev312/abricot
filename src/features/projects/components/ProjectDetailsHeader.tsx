import { Typography } from "@/shared/components/Typography";
import Link from "next/link";
import type { ProjectDetails, ProjectUser } from "../types/project.types";
import { AiTaskButton } from "../../tasks/components/AiTaskButton";
import { CreateTaskButton } from "../../tasks/components/CreateTaskButton";
import { EditProjectButton } from "./EditProjectButton";
import styles from "./ProjectDetailsHeader.module.css";

type ProjectDetailsHeaderProps = {
  description: string;
  project: ProjectDetails;
  title: string;
  contributors: ProjectUser[];
};

export function ProjectDetailsHeader({
  description,
  project,
  title,
  contributors,
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
            <EditProjectButton project={project} contributors={contributors} />
          </div>

          <Typography color="secondary" variant="large">
            {description}
          </Typography>
        </div>
      </div>

      <div className={styles.actions}>
        <CreateTaskButton
          className={styles.createTaskButton}
          project={project}
        />
        <AiTaskButton className={styles.aiButton} />
      </div>
    </header>
  );
}
