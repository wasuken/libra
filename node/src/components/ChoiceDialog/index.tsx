// ChoiceDialog.tsx
import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { Choice } from "@/const";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  choices: Choice[];
  message: string;
}

const ChoiceDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  choices,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <p>{message}</p>
        <div>
          {choices.map((choice, i) => (
            <button
              key={i}
              className={`${styles.button} ${styles[choice.choiceButtonType]}`}
              onClick={choice.onChoice}
            >
              {choice.choiceLabel}
            </button>
          ))}

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
