import type { ReactNode } from "react";
import { requireAuth } from "@/features/auth/services/session.service";
import { Logo } from "@/shared/components/Logo";
import { Typography } from "@/shared/components/Typography";
import { PrivateHeader } from "./components/PrivateHeader";
import styles from "./layout.module.css";

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  await requireAuth();

  return (
    <div className={styles.shell}>
      <PrivateHeader />

      <div className={styles.content}>{children}</div>

      <footer className={styles.footer}>
        <Logo className={styles.footerLogo} />
        <Typography variant="navLink" color="primary">
          Abricot 2025
        </Typography>
      </footer>
    </div>
  );
}
