import { ProjectsGrid } from "@/features/projects/components/ProjectsGrid";
import { PageHeader } from "../components/PageHeader";

export default function ProjectsPage() {
  return (
    <main>
      <PageHeader
        actionLabel="+ Créer un projet"
        description="Gérez vos projets"
        title="Mes projets"
      />
      <ProjectsGrid />
    </main>
  );
}
