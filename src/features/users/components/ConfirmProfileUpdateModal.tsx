"use client";

import { useActionState } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/Button";
import { TextInput } from "@/shared/components/Input";
import { Modal } from "@/shared/components/Modal";
import { Typography } from "@/shared/components/Typography";
import {
  updateProfileAction,
  UpdateProfileActionState,
} from "../services/user.actions";
import type {
  PendingProfileValues,
  ProfileUpdateFeedback,
} from "../types/user.types";
import styles from "./ConfirmProfileUpdateModal.module.css";

type ConfirmProfileUpdateModalProps = {
  currentEmail: string;
  isOpen: boolean;
  onClose: () => void;
  onResult: (feedback: ProfileUpdateFeedback) => void;
  onSuccess: () => void;
  pendingUpdate: PendingProfileValues;
};

export function ConfirmProfileUpdateModal({
  currentEmail,
  isOpen,
  onClose,
  onResult,
  onSuccess,
  pendingUpdate,
}: ConfirmProfileUpdateModalProps) {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const isNotEmpty = currentPassword.trim().length >= 5;

  async function handleConfirmAction(
    previousState: Awaited<UpdateProfileActionState>,
    formData: FormData,
  ) {
    const result = await updateProfileAction(previousState, formData);

    if (result.success) {
      onResult({
        message: "Profil mis à jour avec succès.",
        type: "success",
      });
      onSuccess();
      router.refresh();
    } else if (result.error) {
      onResult({
        message: result.error,
        type: "error",
      });
    }

    return result;
  }

  const [state, formAction, isPending] = useActionState(
    handleConfirmAction,
    {},
  );

  return (
    <Modal isOpen={isOpen} label="Modification du compte" onClose={onClose}>
      <form action={formAction} className={styles.form}>
        <Typography as="h4" className={styles.title} variant="h4">
          Confirmer la modification
        </Typography>
        <Typography color="secondary" variant="small">
          Saisissez votre mot de passe actuel pour valider les changements.
        </Typography>

        <input name="currentEmail" type="hidden" value={currentEmail} />
        <input name="email" type="hidden" value={pendingUpdate.email} />
        <input name="firstname" type="hidden" value={pendingUpdate.firstname} />
        <input name="name" type="hidden" value={pendingUpdate.name} />
        <input
          name="newPassword"
          type="hidden"
          value={pendingUpdate.newPassword}
        />

        <TextInput
          autoComplete="current-password"
          label="Mot de passe actuel"
          minLength={5}
          name="currentPassword"
          onChange={(event) => setCurrentPassword(event.target.value)}
          required
          type="password"
          value={currentPassword}
        />

        {state.error ? (
          <Typography className={styles.error} variant="small">
            {state.error}
          </Typography>
        ) : null}

        <Button
          className={styles.submit}
          disabled={!isNotEmpty || isPending}
          variant={!isNotEmpty || isPending ? "disabled" : "dark"}
          type="submit"
        >
          {isPending ? "Modification..." : "Confirmer"}
        </Button>
      </form>
    </Modal>
  );
}
