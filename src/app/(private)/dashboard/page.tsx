import { DashboardTabs } from "@/features/dashboard/components/DashboardTabs";
import { getDisplayName } from "@/features/users/services/user.helpers";
import { getUserProfile } from "@/features/users/services/user.service";
import { Button } from "@/shared/components/Button";
import { Typography } from "@/shared/components/Typography";
import styles from "./page.module.css";

export default async function DashboardPage() {
  const profile = await getUserProfile();
  const displayName = getDisplayName(profile);

  return (
    <main>
      <div className={styles.header}>
        <div className={styles.heading}>
          <Typography as="h4" variant="h4">
            Tableau de bord
          </Typography>
          <Typography variant="large">
            Bonjour {displayName}, voici un aperçu de vos projets et tâches
          </Typography>
        </div>

        <Button className={styles.createButton} type="button">
          + Créer un projet
        </Button>
      </div>

      <DashboardTabs />
    </main>
  );
}
