import Image from "next/image";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { redirectIfAuthenticated } from "@/features/auth/services/session.service";
import { Link } from "@/shared/components/Link";
import { Logo } from "@/shared/components/Logo";
import { Typography } from "@/shared/components/Typography";
import styles from "./page.module.css";

export default async function SignInPage() {
  await redirectIfAuthenticated();

  return (
    <main className={styles.page}>
      <section className={styles.panel} aria-label="Connexion">
        <div className={styles.formColumn}>
          <Logo className={styles.logo} />

          <LoginForm />

          <Typography variant="small" className={styles.registerText}>
            <span>Pas encore de compte ?</span>
            <Link className={styles.registerLink} href="/register">
              Créer un compte
            </Link>
          </Typography>
        </div>

        <div className={styles.imageColumn} aria-hidden="true">
          <Image
            alt=""
            className={styles.image}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 58vw"
            src="/images/signin.jpg"
          />
        </div>
      </section>
    </main>
  );
}
