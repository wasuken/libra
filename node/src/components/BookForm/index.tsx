// BookForm/index.tsx
import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { Book } from "@/const";

interface BookFormProps {
  initialBookData: Book;
  onSubmit: (updatedBookData: Book) => void;
}

const BookForm: React.FC<BookFormProps> = ({ initialBookData, onSubmit }) => {
  const formatDate = (date: string) => {
    if (date.length <= 0) return "";
    return new Date(date).toISOString().split("T")[0];
  };
  const [bookData, setBookData] = useState<Book>({
    ...initialBookData,
    publicationDate: formatDate(initialBookData.publicationDate),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(bookData);
  };

  useEffect(() => {
    setBookData(initialBookData);
  }, [initialBookData]);

  return (
    <form className={styles.form}>
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
          type="date"
          value={formatDate(bookData.publicationDate)}
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
      <button
        type="button"
        className={styles.submitButton}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </form>
  );
};

export default BookForm;
