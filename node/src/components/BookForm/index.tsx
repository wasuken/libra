// BookForm/index.tsx
import React, { useState } from "react";
import styles from "./index.module.css";

interface Book {
  isbn: string;
  title: string;
  author: string;
  publicationDate: string; // 日付の形式はプロジェクトによって異なる場合があります
  publisher: string;
  stock: number;
}

interface BookFormProps {
  initialBookData: Book;
  onSubmit: (updatedBookData: Book) => void;
}

const BookForm: React.FC<BookFormProps> = ({ initialBookData, onSubmit }) => {
  const [bookData, setBookData] = useState<Book>(initialBookData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(bookData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="isbn">ISBN:</label>
        <input
          id="isbn"
          name="isbn"
          type="text"
          value={bookData.isbn}
          onChange={handleChange}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          name="title"
          type="text"
          value={bookData.title}
          onChange={handleChange}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="author">Author:</label>
        <input
          id="author"
          name="author"
          type="text"
          value={bookData.author}
          onChange={handleChange}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="publicationDate">Publication Date:</label>
        <input
          id="publicationDate"
          name="publicationDate"
          type="text"
          value={bookData.publicationDate}
          onChange={handleChange}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="publisher">Publisher:</label>
        <input
          id="publisher"
          name="publisher"
          type="text"
          value={bookData.publisher}
          onChange={handleChange}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="stock">Stock:</label>
        <input
          id="stock"
          name="stock"
          type="number"
          value={bookData.stock}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default BookForm;
