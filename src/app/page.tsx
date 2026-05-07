import { Logo } from "@/shared/components/Logo";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <Logo className={styles.logo} />
    </main>
  );
}
