// LinkLikeButton/index.tsx
import React from "react";
import styles from "./index.module.css";

interface LinkLikeButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  isSimple: boolean;
}

const LinkLikeButton: React.FC<LinkLikeButtonProps> = ({
  onClick,
  children,
  isSimple,
}) => {
  return (
    <button
      className={
        isSimple == true ? styles.linkLikeSimpleButton : styles.linkLikeButton
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default LinkLikeButton;
