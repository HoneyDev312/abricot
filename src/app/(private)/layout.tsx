import type { ReactNode } from "react";
import { logoutAction } from "@/features/auth/services/auth.actions";
import { requireAuth } from "@/features/auth/services/session.service";
import { Button } from "@/shared/components/Button";
import { Link } from "@/shared/components/Link";
import { Logo } from "@/shared/components/Logo";
import styles from "./layout.module.css";

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  await requireAuth();

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Logo className={styles.logo} />

        <nav className={styles.nav} aria-label="Navigation principale">
          <Link href="/dashboard" variant="dark">
            Dashboard
          </Link>
          <Link href="/projects" variant="dark">
            Projets
          </Link>
        </nav>

        <form action={logoutAction}>
          <Button type="submit" variant="outline">
            Se déconnecter
          </Button>
        </form>
      </header>

      <div className={styles.content}>{children}</div>

      <footer className={styles.footer}>
        <Logo className={styles.footerLogo} />
        <span>Abicot 2025</span>
      </footer>
    </div>
  );
}
