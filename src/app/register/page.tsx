import Image from "next/image";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { redirectIfAuthenticated } from "@/features/auth/services/session.service";
import { Link } from "@/shared/components/Link";
import { Logo } from "@/shared/components/Logo";
import { PageSection } from "@/shared/components/PageSection";
import { Typography } from "@/shared/components/Typography";
import styles from "./page.module.css";

export default async function RegisterPage() {
  await redirectIfAuthenticated();

  return (
    <main>
      <PageSection label="Inscription" unlogged={true}>
        <div className={styles.formColumn}>
          <Logo className={styles.logo} />

          <RegisterForm />

          <Typography variant="small" className={styles.loginText}>
            <span>Déjà inscrit ?</span>
            <Link className={styles.loginLink} href="/login">
              Se connecter
            </Link>
          </Typography>
        </div>

        <div className={styles.imageColumn} aria-hidden="true">
          <Image
            alt=""
            className={styles.image}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 60vw"
            src="/images/register.jpg"
          />
        </div>
      </PageSection>
    </main>
  );
}
