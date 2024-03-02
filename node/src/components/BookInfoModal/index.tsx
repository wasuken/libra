// BookInfoModal/index.tsx
import React, { useState } from "react";
import ISBNScanner from "../ISBNScanner";
import BookForm from "../BookForm";
import styles from "./index.module.css";

// 仮のBook型（APIのレスポンス型に合わせて調整してください）
interface Book {
  isbn: string;
  title: string;
  author: string;
  publicationDate: string;
  publisher: string;
  stock: number;
}

interface BookInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookInfoModal: React.FC<BookInfoModalProps> = ({ isOpen, onClose }) => {
  const [bookData, setBookData] = useState<Book>({
    isbn: "",
    title: "",
    author: "",
    publicationDate: "",
    publisher: "",
    stock: 0,
  });

  const handleISBNDetected = (isbn: string) => {
    // ISBNが検出されたら書籍情報を取得する（ここではダミーデータを使用）
    const dummyBookData = {
      isbn,
      title: "Sample Book Title",
      author: "Author Name",
      publicationDate: "2022-01-01",
      publisher: "Sample Publisher",
      stock: 10,
    };
    setBookData(dummyBookData);
  };

  const handleFormSubmit = (updatedBookData: Book) => {
    console.log("Updated Book Data:", updatedBookData);
    // フォームのデータを送信する処理（APIへのPOSTリクエストなど）
    onClose(); // モーダルを閉じる
  };

  return (
    <div className={isOpen ? styles.modalOpen : styles.modalClosed}>
      <ISBNScanner onISBNDetected={handleISBNDetected} />
      <BookForm initialBookData={bookData} onSubmit={handleFormSubmit} />
      <button onClick={onClose} className={styles.closeButton}>
        Close
      </button>
    </div>
  );
};

export default BookInfoModal;
