"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/shared/components/Button";
import { TextInput } from "@/shared/components/Input";
import { Modal } from "@/shared/components/Modal";
import { Typography } from "@/shared/components/Typography";
import { useUserProfile } from "../hooks/useUserProfile";
import type { UserProfile } from "../types/user.types";
import styles from "./ProfileForm.module.css";

type ProfileFormProps = {
  profile: UserProfile;
};

export function ProfileForm({ profile }: ProfileFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useUserProfile(profile);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
        <TextInput id="lastName" label="Nom" defaultValue={user.lastName} />
        <TextInput
          id="firstName"
          label="Prénom"
          defaultValue={user.firstName}
        />
        <TextInput
          id="email"
          label="Email"
          type="email"
          defaultValue={user.email}
        />
        <TextInput
          id="password"
          label="Mot de passe"
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
        <Typography as="h4" className={styles.modalTitle} variant="h4">
          Modal de test
        </Typography>
      </Modal>
    </section>
  );
}
