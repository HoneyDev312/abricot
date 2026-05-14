import { ProfileForm } from "@/features/users/components/ProfileForm";
import { getUserProfile } from "@/features/users/services/user.service";
import styles from "./page.module.css";

export default async function AccountPage() {
  const profile = await getUserProfile();

  return (
    <main className={styles.page}>
      <ProfileForm profile={profile} />
    </main>
  );
}
