"use client";

import type { FormEvent } from "react";
import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/Button";
import { TextInput } from "@/shared/components/Input";
import { Modal } from "@/shared/components/Modal";
import { Typography } from "@/shared/components/Typography";
import { useUserProfile } from "../hooks/useUserProfile";
import { updateProfileAction } from "../services/user.actions";
import type { UserProfile } from "../types/user.types";
import styles from "./ProfileForm.module.css";

type ProfileFormProps = {
  profile: UserProfile;
};

type PendingProfileUpdate = {
  email: string;
  name: string;
  newPassword: string;
};

export function ProfileForm({ profile }: ProfileFormProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingUpdate, setPendingUpdate] =
    useState<PendingProfileUpdate | null>(null);
  const user = useUserProfile(profile);

  // La confirmation vit dans la modale : si l'action réussit, on ferme la modale
  // et on rafraîchit les Server Components pour afficher le profil à jour.
  async function handleConfirmAction(
    previousState: Awaited<ReturnType<typeof updateProfileAction>>,
    formData: FormData
  ) {
    const result = await updateProfileAction(previousState, formData);

    if (result.success) {
      setIsModalOpen(false);
      setPendingUpdate(null);
      router.refresh();
    }

    return result;
  }

  const [state, formAction, isPending] = useActionState(
    handleConfirmAction,
    {}
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Premier submit : on capture les nouvelles valeurs sans les envoyer encore.
    // Elles seront confirmées avec le mot de passe actuel dans la modale.
    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();

    setPendingUpdate({
      email: String(formData.get("email") ?? ""),
      name: [firstName, lastName].filter(Boolean).join(" "),
      newPassword: String(formData.get("newPassword") ?? ""),
    });
    setIsModalOpen(true);
  }

  return (
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
          {user.fullName}
        </Typography>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <TextInput
          id="lastName"
          label="Nom"
          name="lastName"
          defaultValue={user.lastName}
        />
        <TextInput
          id="firstName"
          label="Prénom"
          name="firstName"
          defaultValue={user.firstName}
        />
        <TextInput
          id="email"
          label="Email"
          name="email"
          type="email"
          defaultValue={user.email}
        />
        <TextInput
          id="password"
          label="Mot de passe"
          autoComplete="new-password"
          name="newPassword"
          type="password"
          placeholder="••••••••••"
        />

        <Button className={styles.submit} type="submit">
          Modifier les informations
        </Button>
      </form>

      <Modal
        isOpen={isModalOpen}
        label="Modification du compte"
        onClose={() => setIsModalOpen(false)}
      >
        <form action={formAction} className={styles.confirmForm}>
          <Typography as="h4" className={styles.modalTitle} variant="h4">
            Confirmer la modification
          </Typography>
          <Typography color="secondary" variant="small">
            Saisissez votre mot de passe actuel pour valider les changements.
          </Typography>

          <input name="currentEmail" type="hidden" value={profile.email} />
          <input name="email" type="hidden" value={pendingUpdate?.email ?? ""} />
          <input name="name" type="hidden" value={pendingUpdate?.name ?? ""} />
          <input
            name="newPassword"
            type="hidden"
            value={pendingUpdate?.newPassword ?? ""}
          />

          <TextInput
            autoComplete="current-password"
            label="Mot de passe actuel"
            name="currentPassword"
            required
            type="password"
          />

          {state.error ? (
            <Typography className={styles.error} variant="small">
              {state.error}
            </Typography>
          ) : null}

          <Button
            className={styles.confirmSubmit}
            disabled={isPending}
            type="submit"
          >
            {isPending ? "Modification..." : "Confirmer"}
          </Button>
        </form>
      </Modal>
    </section>
  );
}
