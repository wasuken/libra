// BookList/index.tsx
import React from "react";
import BookListItem from "./BookListItem";
import styles from "./index.module.css";

type Book = {
  id: number;
  title: string;
  isbn: string;
  publisher: string;
  stock: number;
  thumbnail_url: string;
  publication_date: Date;
};

interface BookListProps {
  books: Book[];
  onItemClick: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onItemClick }) => {
  return (
    <div className={styles.list}>
      {books.map((book) => (
        <BookListItem
          key={book.id}
          book={book}
          onClick={() => onItemClick(book)}
        />
      ))}
    </div>
  );
};

export default BookList;
