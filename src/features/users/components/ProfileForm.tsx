"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/shared/components/Button";
import { TextInput } from "@/shared/components/Input";
import { Typography } from "@/shared/components/Typography";
import { useUserProfile } from "../hooks/useUserProfile";
import type { UserProfile } from "../types/user.types";
import {
  ConfirmProfileUpdateModal,
  type PendingProfileUpdate,
} from "./ConfirmProfileUpdateModal";
import styles from "./ProfileForm.module.css";

type ProfileFormProps = {
  profile: UserProfile;
};

export function ProfileForm({ profile }: ProfileFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingUpdate, setPendingUpdate] =
    useState<PendingProfileUpdate | null>(null);
  const user = useUserProfile(profile);

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

  function closeModal() {
    setIsModalOpen(false);
    setPendingUpdate(null);
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

      {pendingUpdate ? (
        <ConfirmProfileUpdateModal
          currentEmail={profile.email}
          isOpen={isModalOpen}
          onClose={closeModal}
          onSuccess={closeModal}
          pendingUpdate={pendingUpdate}
        />
      ) : null}
    </section>
  );
}
