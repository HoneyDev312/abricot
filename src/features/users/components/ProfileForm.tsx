"use client";

import type { ChangeEvent, SyntheticEvent } from "react";
import { useState } from "react";
import { Button } from "@/shared/components/Button";
import { TextInput } from "@/shared/components/Input";
import { Typography } from "@/shared/components/Typography";
import { useUserProfile } from "../hooks/useUserProfile";
import {
  getPendingProfileValues,
  isPendingProfileValuesChanged,
} from "../services/user.helpers";
import type {
  PendingProfileValues,
  ProfileUpdateFeedback as ProfileUpdateFeedbackType,
  UserProfile,
} from "../types/user.types";
import { ConfirmProfileUpdateModal } from "./ConfirmProfileUpdateModal";
import { ProfileUpdateFeedback } from "./ProfileUpdateFeedback";
import styles from "./ProfileForm.module.css";

type ProfileFormProps = {
  profile: UserProfile;
};

export function ProfileForm({ profile }: ProfileFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [pendingUpdate, setPendingUpdate] =
    useState<PendingProfileValues | null>(null);
  const [feedback, setFeedback] = useState<ProfileUpdateFeedbackType | null>(
    null,
  );
  const user = useUserProfile(profile);
  const initialValues: PendingProfileValues = {
    email: user.email,
    firstname: user.firstName,
    name: user.lastName,
    newPassword: "",
  };

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!hasUnsavedChanges) {
      return;
    }

    setFeedback(null);
    setPendingUpdate(getPendingProfileValues(event.currentTarget));
    setIsModalOpen(true);
  }

  function handleChange(event: ChangeEvent<HTMLFormElement>) {
    setHasUnsavedChanges(
      isPendingProfileValuesChanged(
        getPendingProfileValues(event.currentTarget),
        initialValues,
      ),
    );
  }

  function closeModal() {
    setIsModalOpen(false);
    setPendingUpdate(null);
  }

  function handleSuccess() {
    closeModal();
    setHasUnsavedChanges(false);
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

      <ProfileUpdateFeedback feedback={feedback} />

      <form
        className={styles.form}
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <TextInput
          id="lastName"
          label="Nom"
          name="name"
          defaultValue={user.lastName}
        />
        <TextInput
          id="firstName"
          label="Prénom"
          name="firstname"
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

        <Button
          className={styles.submit}
          disabled={!hasUnsavedChanges}
          variant={!hasUnsavedChanges ? "disabled" : "dark"}
          type="submit"
        >
          Modifier les informations
        </Button>
      </form>

      {pendingUpdate ? (
        <ConfirmProfileUpdateModal
          currentEmail={profile.email}
          isOpen={isModalOpen}
          onClose={closeModal}
          onResult={setFeedback}
          onSuccess={handleSuccess}
          pendingUpdate={pendingUpdate}
        />
      ) : null}
    </section>
  );
}
