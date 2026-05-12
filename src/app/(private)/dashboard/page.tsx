import { Typography } from "@/shared/components/Typography";
import styles from "./page.module.css";

export default function DashboardPage() {
  return (
    <main className={styles.page}>
      <Typography as="h1" variant="h1">
        Tableau de bord
      </Typography>
    </main>
  );
}
