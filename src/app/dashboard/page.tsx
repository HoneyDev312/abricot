import { logoutAction } from "@/features/auth/services/auth.actions";
import { Button } from "@/shared/components/Button";
import { Typography } from "@/shared/components/Typography";
import styles from "./page.module.css";

export default function DashboardPage() {
  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <Typography as="h1" variant="h1">
          Tableau de bord
        </Typography>

        <form action={logoutAction}>
          <Button type="submit" variant="outline">
            Se déconnecter
          </Button>
        </form>
      </section>
    </main>
  );
}
