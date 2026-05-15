import { Button } from "@/shared/components/Button";
import { Typography } from "@/shared/components/Typography";
import styles from "./page.module.css";

export default function DashboardPage() {
  return (
    <main>
      <div className={styles.header}>
        <div className={styles.heading}>
          <Typography as="h4" variant="h4">
            Tableau de bord
          </Typography>
          <Typography variant="large">
            Bonjour Alice Dupont, voici un aperçu de vos projets et tâches
          </Typography>
        </div>

        <Button className={styles.createButton} type="button">
          + Créer un projet
        </Button>
      </div>
    </main>
  );
}
