import React, { useState } from "react";
import BookInfoModal from "@/components/BookInfoModal";
import BookList from "@/components/BookList";
import { Book } from "@/const";
import useAuth from "@/useAuth";
import styles from "./Top.module.css"; // CSS Moduleのインポート

// 仮の書籍データ
const Top: React.FC<TopProps> = () => {
  const { logout } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  // setBooks([]);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Book Manager</h1>
        <button onClick={logout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
      <div className={styles.bookListSection}>
        <h2 className={styles.title}>本一覧</h2>
        <BookList books={books} />
      </div>
      <div className={styles.bookRegistrationSection}>
        <h2 className={styles.title}>本登録</h2>
        <button onClick={handleOpenModal} className={styles.registerButton}>
          本を登録する
        </button>
        <BookInfoModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </div>
  );
};

export default Top;
