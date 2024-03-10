// src/components/UserMenu/index.tsx
import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import styles from "./index.module.css";
import { SelectButton } from "@/const";

interface UserMenuProps {
  buttons: SelectButton[];
}

const UserMenu: React.FC<UserMenuProps> = ({ buttons }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={styles.userMenu}>
      <div className={styles.userInfo} onClick={handleClick}>
        <FaRegUser />
        <span className={styles.userName}>John Doe</span>
      </div>
      {isOpen && (
        <ul className={styles.menuList}>
          {buttons.map((button, i) => (
            <li key={i} className={styles.list1}>
              <div
                className={`${styles.menuButton} ${styles[button.buttonType]}`}
                onClick={button.onClick}
              >
                {button.text}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserMenu;
