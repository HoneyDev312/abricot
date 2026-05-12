import { redirectIfAuthenticated } from "@/features/auth/services/session.service";
import styles from "./page.module.css";

export default async function RegisterPage() {
  await redirectIfAuthenticated();

  return <main className={styles.page}>Inscription</main>;
}
