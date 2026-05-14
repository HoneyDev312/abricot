"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/Button";
import { TextInput } from "@/shared/components/Input";
import { Modal } from "@/shared/components/Modal";
import { Typography } from "@/shared/components/Typography";
import { updateProfileAction } from "../services/user.actions";
import styles from "./ConfirmProfileUpdateModal.module.css";

export type PendingProfileUpdate = {
  email: string;
  name: string;
  newPassword: string;
};

type ConfirmProfileUpdateModalProps = {
  currentEmail: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  pendingUpdate: PendingProfileUpdate;
};

export function ConfirmProfileUpdateModal({
  currentEmail,
  isOpen,
  onClose,
  onSuccess,
  pendingUpdate,
}: ConfirmProfileUpdateModalProps) {
  const router = useRouter();

  // Si l'action réussit, la modale prévient le parent puis rafraîchit la page
  // pour récupérer le profil mis à jour depuis les Server Components.
  async function handleConfirmAction(
    previousState: Awaited<ReturnType<typeof updateProfileAction>>,
    formData: FormData
  ) {
    const result = await updateProfileAction(previousState, formData);

    if (result.success) {
      onSuccess();
      router.refresh();
    }

    return result;
  }

  const [state, formAction, isPending] = useActionState(
    handleConfirmAction,
    {}
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
        <input name="name" type="hidden" value={pendingUpdate.name} />
        <input
          name="newPassword"
          type="hidden"
          value={pendingUpdate.newPassword}
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

        <Button className={styles.submit} disabled={isPending} type="submit">
          {isPending ? "Modification..." : "Confirmer"}
        </Button>
      </form>
    </Modal>
  );
}
