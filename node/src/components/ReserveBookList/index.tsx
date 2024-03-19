// ReserveBookList/index.tsx
import React from "react";
import ReserveBookListItem from "@/components/ReserveBookListItem";
import styles from "./index.module.css";
import { Book, RentalBook, isRentalBook } from "@/const";
import ChoiceDialog from "@/components/ChoiceDialog";

interface ReserveBookListProps {
  books: Book | RentalBook[];
  onItemClick: (book: Book | RentalBook) => Promise<void>;
  onRentalClick: (book: Book) => Promise<void>;
  onReturnClick: (book: Book) => Promise<void>;
  onReserveClick: (book: Book) => Promise<void>;
}

const ReserveBookList: React.FC<ReserveBookListProps> = ({
  books,
  onItemClick,
  onRentalClick,
  onReturnClick,
  onReserveClick,
}) => {
  return (
    <div className={styles.list}>
      {books.map((book) => (
        <ReserveBookListItem
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
