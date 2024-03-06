import React, { useState, useEffect } from "react";
import BookInfoModal from "@/components/BookInfoModal";
import BookList from "@/components/BookList";
import { Book, RentalBook } from "@/const";
import useAuth from "@/useAuth";
import styles from "./Top.module.css"; // CSS Moduleのインポート

// 仮の書籍データ
const Top: React.FC<TopProps> = () => {
  const { logout, afetch } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [rentalBooks, setRentalBooks] = useState<RentalBook[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const postRentalBook = async (book: Book) => {
    const res = await afetch(`/api/book/rental/${book.id}`, {
      method: "POST",
      body: JSON.stringify(book),
    });
    if (res.ok) {
      alert("レンタル完了");
      // 再取得
      await fetchBooks();
    }
  };
  const postReturnBook = async (book: Book) => {
    const res = await afetch(`/api/book/return/${book.id}`, {
      method: "POST",
      body: JSON.stringify(book),
    });
    if (res.ok) {
      alert("返却完了");
      // 再取得
      await fetchBooks();
    }
  };

  const fetchRentalBooks = async () => {
    const res = await afetch(`/api/rental/books`);
    if (res.ok) {
      const resData = await res.json();

      setRentalBooks(
        resData.data.map((rb, i) => {
          const rentalBook: RentalBook = {
            id: rb.id,
            isbn: rb.isbn,
            title: rb.title,
            author: rb.author,
            thumbnailUrl: rb.thumbnail_url,
            publicationDate: rb.publication_date,
            publisher: rb.publisher,
            stock: rb.stock,
            dueDate: rb.due_date,
            returnDate: rb.return_date,
          };
          return rentalBook;
        })
      );
    }
  };

  const fetchBooks = async () => {
    const res = await afetch(`/api/books`);
    if (res.ok) {
      const resData = await res.json();
      setBooks(
        resData.map((book, i) => {
          return {
            id: book.id,
            isbn: book.isbn,
            title: book.title,
            author: book.author,
            thumbnailUrl: book.thumbnail_url,
            publicationDate: book.publication_date,
            publisher: book.publisher,
            stock: book.stock,
          };
        })
      );
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
    fetchRentalBooks().then(() => console.log("fetch rental books."));
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Book Manager</h1>
        <button onClick={logout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
      <div className={styles.bookRegistrationSection}>
        <button onClick={handleOpenModal} className={styles.registerButton}>
          本を登録する
        </button>
        <BookInfoModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={postBook}
        />
      </div>
      <div className={styles.bookListSection}>
        <h2 className={styles.title}>本一覧</h2>
        <BookList
          books={books}
          onRentalClick={postRentalBook}
          onReturnClick={postReturnBook}
          onItemClick={() => {}}
        />
      </div>
      <div className={styles.bookListSection}>
        <h2 className={styles.title}>レンタル本一覧</h2>
        <BookList
          books={rentalBooks}
          onRentalClick={postRentalBook}
          onReturnClick={postReturnBook}
          onItemClick={() => {}}
        />
      </div>
    </div>
  );
};

export default Top;
