// ChoiceDialog.tsx
import React, { useState, useEffect } from "react";
import styles from "./index.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onChoice1: () => void;
  onChoice2: () => void;
  message: string;
  choice1Label: string;
  choice2Label: string;
}

const ChoiceDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  onChoice1,
  onChoice2,
  message,
  choice1Label,
  choice2Label,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <p>{message}</p>
        <div>
          <button
            className={`${styles.button} ${styles.choice1Button}`}
            onClick={onChoice1}
          >
            {choice1Label}
          </button>
          <button
            className={`${styles.button} ${styles.choice2Button}`}
            onClick={onChoice2}
          >
            {choice2Label}
          </button>
          <button
            className={`${styles.button} ${styles.closeButton}`}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChoiceDialog;
