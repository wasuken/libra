// BookListItem/index.tsx
import React from "react";
import styles from "./index.module.css";
import LinkLikeButton from "@/components/LinkLikeButton";
import { Book } from "@/const";

const MAX_DISPLAY_LENGTH = 20;

interface BookListItemProps {
  book: Book;
  onClick: (book: Book) => Promise<void>;
  onRentalClick: (book: Book) => Promise<void>;
  onReturnClick: (book: Book) => Promise<void>;
}

const BookListItem: React.FC<BookListItemProps> = ({ book, onClick }) => {
  // short title
  const sTitle =
    book.title.length < 20 ? book.title : book.title.substring(0, 20) + "...";
  // default url
  const dUrl =
    book.thumbnail_url.length <= 0
      ? "/no_image.png"
      : book.thumbnail_url.length;
  const sPublisher =
    book.publisher.length < 10
      ? book.publisher
      : book.publisher.substring(0, 10) + "...";
  return (
    <LinkLikeButton isSimple={true} onClick={onClick}>
      <div className={styles.item}>
        <img src={dUrl} alt={sTitle} className={styles.thumbnail} />
        <div className={styles.details}>
          <h2 className={styles.title}>{sTitle}</h2>
          <p className={styles.isbn}>ISBN: {book.isbn}</p>
          <p className={styles.publisher}>Publisher: {sPublisher}</p>
          <p className={styles.stock}>Stock: {book.stock}</p>
          <p className={styles.date}>
            Published:{" "}
            {new Date(book.publication_date).toISOString().split("T")[0]}
          </p>
          <p className={styles.itemFooter}>
            <button className={styles.simpleButton}>借りる</button>
            <button className={styles.simpleButton}>返す</button>
          </p>
        </div>
      </div>
    </LinkLikeButton>
  );
};

export default BookListItem;
