// BookInfoModal/index.tsx
import React, { useState } from "react";
import ISBNScanner from "../ISBNScanner";
import BookForm from "../BookForm";
import styles from "./index.module.css";
import { Book } from "@/const";

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

  const handleISBNDetected = async (isbn: string) => {
    // ISBNが検出されたら書籍情報を取得する（ここではダミーデータを使用）
    try {
      const res = await fetch(`https://api.openbd.jp/v1/get?isbn=${isbn}`);
      if (res.ok) {
        const resData = await res.json();

        const {
          title,
          publisher,
          pubdate: publicationDate,
          author,
        } = resData[0].summary;
        const inputBookData = {
          isbn,
          title,
          author,
          publicationDate,
          publisher,
          stock: 1,
        };
        setBookData(inputBookData);
      } else {
        alert("invalid search isbn");
      }
    } catch (error) {
      alert(error.toString());
    }
  };

  const handleFormSubmit = async (updatedBookData: Book) => {
    console.log("Updated Book Data:", updatedBookData);
    // フォームのデータを送信する処理（APIへのPOSTリクエストなど）
    const res = await fetch(`/api/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
    onClose(); // モーダルを閉じる
  };

  return (
    <div className={isOpen ? styles.modalOpen : styles.modalClosed}>
      <div className={styles.formContainer}>
        <ISBNScanner onISBNDetected={handleISBNDetected} />
        <BookForm initialBookData={bookData} onSubmit={handleFormSubmit} />
        <button onClick={onClose} className={styles.closeButton} />
      </div>
    </div>
  );
};

export default BookInfoModal;
