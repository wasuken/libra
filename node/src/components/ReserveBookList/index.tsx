// ReserveBookList/index.tsx
import React from "react";
import BookListItem from "@/components/BookListItem";
import styles from "./index.module.css";
import { Book, RentalBook, isRentalBook } from "@/const";
import ChoiceDialog from "@/components/ChoiceDialog";

interface ReserveBookListProps {
  books: Book | RentalBook[];
  onItemClick: (book: Book | RentalBook) => Promise<void>;
  onRentalClick: (book: Book) => Promise<void>;
}

const ReserveBookList: React.FC<ReserveBookListProps> = ({
  books,
  onItemClick,
  onRentalClick,
}) => {
  return (
    <div className={styles.list}>
      {books.map((book) => (
        <BookListItem
          key={book.id}
          book={book}
          onClick={() => onItemClick(book)}
          onRentalClick={onRentalClick}
        />
      ))}
    </div>
  );
};

export default ReserveBookList;
