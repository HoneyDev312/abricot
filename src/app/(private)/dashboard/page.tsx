import { DashboardTabs } from "@/features/dashboard/components/DashboardTabs";
import { getAssignedTasks } from "@/features/dashboard/services/dashboard.service";
import { CreateProjectButton } from "@/features/projects/components/CreateProjectButton";
import { getDisplayName } from "@/features/users/services/user.helpers";
import { getUserProfile } from "@/features/users/services/user.service";
import { PageHeader } from "../components/PageHeader";

export default async function DashboardPage() {
  const [profile, assignedTasks] = await Promise.all([
    getUserProfile(),
    getAssignedTasks(),
  ]);
  const displayName = getDisplayName(profile);

  return (
    <main>
      <PageHeader
        action={<CreateProjectButton />}
        description={`Bonjour ${displayName}, voici un aperçu de vos projets et tâches`}
        title="Tableau de bord"
      />

      <DashboardTabs assignedTasks={assignedTasks} />
    </main>
  );
}
