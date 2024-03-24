// RentalBookList/index.tsx
import React from "react";
import BookListItem from "@/components/BookListItem";
import styles from "./index.module.css";
import { Book, RentalBook, isRentalBook } from "@/const";
import ChoiceDialog from "@/components/ChoiceDialog";

interface RentalBookListProps {
  books: RentalBook[];
  onItemClick: (book: RentalBook) => Promise<void>;
  onReturnClick: (book: Book) => Promise<void>;
}

const RentalBookList: React.FC<RentalBookListProps> = ({
  books,
  onItemClick,
  onReturnClick,
}) => {
  return (
    <div className={styles.list}>
      {books.map((book) => (
        <BookListItem
          key={book.id}
          book={book}
          onClick={() => onItemClick(book)}
          onReturnClick={onReturnClick}
        >
          <div>
            <h3>
              返却日:{" "}
              {book.returnDate === null ? (
                <span style={{ color: "red" }}>未返却</span>
              ) : (
                book.returnDate
              )}
            </h3>
          </div>
        </BookListItem>
      ))}
    </div>
  );
};

export default RentalBookList;
