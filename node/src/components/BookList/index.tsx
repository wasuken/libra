// BookList/index.tsx
import React from "react";
import BookListItem from "@/components/BookListItem";
import styles from "./index.module.css";
import { Book, RentalBook, isRentalBook } from "@/const";
import ChoiceDialog from "@/components/ChoiceDialog";

interface BookListProps {
  books: Book | RentalBook[];
  onItemClick: (book: Book | RentalBook) => Promise<void>;
  onRentalClick: (book: Book) => Promise<void>;
  onReturnClick: (book: Book) => Promise<void>;
  onReserveClick: (book: Book) => Promise<void>;
}

const BookList: React.FC<BookListProps> = ({
  books,
  onItemClick,
  onRentalClick,
  onReturnClick,
  onReserveClick,
}) => {
  return (
    <div className={styles.list}>
      {books.map((book) =>
        isRentalBook(book) ? (
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
        ) : (
          <BookListItem
            key={book.id}
            book={book}
            onClick={() => onItemClick(book)}
            onRentalClick={onRentalClick}
            onReserveClick={onReserveClick}
          />
        )
      )}
    </div>
  );
};

export default BookList;
