// LinkLikeButton/index.tsx
import React from "react";
import styles from "./index.module.css";

interface LinkLikeButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const LinkLikeButton: React.FC<LinkLikeButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <button className={styles.linkLikeButton} onClick={onClick}>
      {children}
    </button>
  );
};

export default LinkLikeButton;
