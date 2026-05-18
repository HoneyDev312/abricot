import { CreateProjectButton } from "@/features/projects/components/CreateProjectButton";
import { ProjectsGrid } from "@/features/projects/components/ProjectsGrid";
import {
  getProjects,
  searchUsers,
} from "@/features/projects/services/project.service";
import { PageHeader } from "../components/PageHeader";

export default async function ProjectsPage() {
  const [projects, contributors] = await Promise.all([
    getProjects(),
    searchUsers(),
  ]);

  return (
    <main>
      <PageHeader
        action={<CreateProjectButton contributors={contributors} />}
        description="Gérez vos projets"
        title="Mes projets"
      />
      <ProjectsGrid projects={projects} />
    </main>
  );
}
