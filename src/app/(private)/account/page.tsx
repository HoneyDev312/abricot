import { logoutAction } from "@/features/auth/services/auth.actions";
import { ProfileForm } from "@/features/users/components/ProfileForm";
import { getUserProfile } from "@/features/users/services/user.service";
import { Button } from "@/shared/components/Button";
import styles from "./page.module.css";

export default async function AccountPage() {
  const profile = await getUserProfile();

  return (
    <main className={styles.page}>
      <form action={logoutAction} className={styles.logout}>
        <Button size="sm" type="submit" variant="outline">
          Se déconnecter
        </Button>
      </form>
      <ProfileForm profile={profile} />
    </main>
  );
}
