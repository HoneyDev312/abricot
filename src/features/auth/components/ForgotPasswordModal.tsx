"use client";

import { Modal } from "@/shared/components/Modal";
import { Typography } from "@/shared/components/Typography";
import styles from "./ForgotPasswordModal.module.css";

type ForgotPasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ForgotPasswordModal({
  isOpen,
  onClose,
}: ForgotPasswordModalProps) {
  return (
    <Modal isOpen={isOpen} label="Mot de passe oublié" onClose={onClose}>
      <Typography as="h4" className={styles.title} variant="h4">
        Nous sommes désolé !{" "}
      </Typography>
      <Typography className={styles.text} variant="medium">
        Cette fonctionnalité est en cours de construction
      </Typography>
    </Modal>
  );
}
