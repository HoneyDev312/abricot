import { getProjectOrNotFound } from "@/features/projects/services/project.helpers";
import { PageHeader } from "../../components/PageHeader";
import styles from "./page.module.css";

type ProjectPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const project = await getProjectOrNotFound(projectId);

  return (
    <main className={styles.page}>
      <PageHeader
        actionLabel="+ Créer une tâche"
        description={project.description || "Aucune description"}
        title={project.name}
      />
    </main>
  );
}
