import { Button } from "@/shared/components/Button";
import { TextInput } from "@/shared/components/Input";
import { Typography } from "@/shared/components/Typography";
import styles from "./page.module.css";

export default function AccountPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <header className={styles.header}>
          <Typography
            as="h5"
            className={styles.title}
            variant="h5"
            weight="semibold"
          >
            Mon compte
          </Typography>
          <Typography color="secondary" variant="medium">
            Amélie Dupont
          </Typography>
        </header>

        <form className={styles.form}>
          <TextInput id="lastName" label="Nom" defaultValue="Amélie" />
          <TextInput id="firstName" label="Prénom" defaultValue="Amélie" />
          <TextInput
            id="email"
            label="Email"
            type="email"
            defaultValue="a.dupont@gmail.com"
          />
          <TextInput
            id="password"
            label="Mot de passe"
            type="password"
            defaultValue="password"
          />

          <Button className={styles.submit}>Modifier les informations</Button>
        </form>
      </section>
    </main>
  );
}
