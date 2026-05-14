import { PageSection } from "@/shared/components/PageSection";
import { Typography } from "@/shared/components/Typography";
import styles from "./page.module.css";

export default function DashboardPage() {
  return (
    <main>
      <PageSection className={styles.page} label="Tableau de bord">
        <Typography as="h1" variant="h1">
          Tableau de bord
        </Typography>
      </PageSection>
    </main>
  );
}
