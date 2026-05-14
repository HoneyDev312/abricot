"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { Icon } from "@/shared/components/Icons";
import styles from "./Modal.module.css";

type ModalProps = {
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  isOpen: boolean;
  label?: string;
  closeLabel?: string;
  onClose: () => void;
};

export function Modal({
  children,
  className,
  contentClassName,
  isOpen,
  label = "Fenetre modale",
  closeLabel = "Fermer la modale",
  onClose,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const dialogClassName = className
    ? `${styles.dialog} ${className}`
    : styles.dialog;

  const modalContentClassName = contentClassName
    ? `${styles.content} ${contentClassName}`
    : styles.content;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        aria-label={label}
        aria-modal="true"
        className={dialogClassName}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button
          aria-label={closeLabel}
          className={styles.close}
          onClick={onClose}
          type="button"
        >
          <Icon color="neutral" name="cross" size="15px" />
        </button>

        <div className={modalContentClassName}>{children}</div>
      </div>
    </div>
  );
}
