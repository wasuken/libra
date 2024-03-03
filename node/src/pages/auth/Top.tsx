import React, { useState, useEffect } from "react";
import BookInfoModal from "@/components/BookInfoModal";
import BookList from "@/components/BookList";
import { Book } from "@/const";
import useAuth from "@/useAuth";
import styles from "./Top.module.css"; // CSS Moduleのインポート

// 仮の書籍データ
const Top: React.FC<TopProps> = () => {
  const { logout, afetch } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBooks = async () => {
    const res = await afetch(`/api/books`);
    if (res.ok) {
      const resData = await res.json();
      setBooks(resData);
    }
  };
  const postBook = async (book: Book) => {
    const res = await afetch(`/api/book`, {
      method: "POST",
      body: JSON.stringify(book),
    });
    if (res.ok) {
      alert("登録完了");
      // 再取得
      await fetchBooks();
    }
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    fetchBooks().then(() => console.log("fetch books."));
  }, []);
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
        <BookInfoModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={postBook}
        />
      </div>
    </div>
  );
};

export default Top;
