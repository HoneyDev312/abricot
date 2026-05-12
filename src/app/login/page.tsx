import Image from "next/image";
import { Button } from "@/shared/components/Button";
import { TextInput } from "@/shared/components/Input";
import { Link } from "@/shared/components/Link";
import { Logo } from "@/shared/components/Logo";
import { Typography } from "@/shared/components/Typography";
import styles from "./page.module.css";

export default function SignInPage() {
  return (
    <main className={styles.page}>
      <section className={styles.panel} aria-label="Connexion">
        <div className={styles.formColumn}>
          <Logo className={styles.logo} />

          <form className={styles.form}>
            <Typography as="h1" className={styles.title} variant="h1">
              Connexion
            </Typography>

            <div className={styles.fields}>
              <TextInput autoComplete="email" label="Email" type="email" />
              <TextInput
                autoComplete="current-password"
                label="Mot de passe"
                type="password"
              />
            </div>

            <Button className={styles.submit} type="submit">
              Se connecter
            </Button>

            <Link className={styles.forgotLink} href="/">
              Mot de passe oublié?
            </Link>
          </form>

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
