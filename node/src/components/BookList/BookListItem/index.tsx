// BookListItem/index.tsx
import React from "react";
import styles from "./index.module.css";
import LinkLikeButton from "@/components/LinkLikeButton";
import { Book } from "@/const";

interface BookListItemProps {
  book: Book;
  onClick: (book: Book) => void;
}

const BookListItem: React.FC<BookListItemProps> = ({ book, onClick }) => {
  return (
    <LinkLikeButton isSimple={true} onClick={onClick}>
      <div className={styles.item}>
        <img
          src={
            book.thumbnail_url.length <= 0
              ? "/no_image.png"
              : book.thumbnail_url.length
          }
          alt={book.title}
          className={styles.thumbnail}
        />
        <div className={styles.details}>
          <h2 className={styles.title}>{book.title}</h2>
          <p className={styles.isbn}>ISBN: {book.isbn}</p>
          <p className={styles.publisher}>Publisher: {book.publisher}</p>
          <p className={styles.stock}>Stock: {book.stock}</p>
          <p className={styles.date}>
            Published:{" "}
            {new Date(book.publication_date).toISOString().split("T")[0]}
          </p>
        </div>
      </div>
    </LinkLikeButton>
  );
};

export default BookListItem;
