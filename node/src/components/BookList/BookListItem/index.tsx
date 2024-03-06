// BookListItem/index.tsx
import React, { useState } from "react";
import styles from "./index.module.css";
import LinkLikeButton from "@/components/LinkLikeButton";
import ChoiceDialog from "@/components/ChoiceDialog";
import { Book } from "@/const";

const MAX_DISPLAY_LENGTH = 20;

interface BookListItemProps {
  book: Book;
  onClick: (book: Book) => Promise<void>;
  onRentalClick: (book: Book) => Promise<void>;
  onReturnClick: (book: Book) => Promise<void>;
  children: React.ReactNode;
}

const BookListItem: React.FC<BookListItemProps> = ({
  book,
  onClick,
  onRentalClick,
  onReturnClick,
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClick = () => {
    onClick();
    setIsOpen(true);
  };
  // short title
  const sTitle =
    book.title.length < 20 ? book.title : book.title.substring(0, 20) + "...";
  // default url
  console.log(book.thumbnailUrl);
  const dUrl =
    (book.thumbnailUrl && book.thumbnailUrl.length) <= 0
      ? "/no_image.png"
      : book.thumbnailUrl;
  const sPublisher =
    book.publisher.length < 10
      ? book.publisher
      : book.publisher.substring(0, 10) + "...";
  return (
    <div>
      <LinkLikeButton onClick={handleClick} isSimple={true}>
        <div className={styles.item}>
          <img src={dUrl} alt={sTitle} className={styles.thumbnail} />
          <div className={styles.details}>
            <h2 className={styles.title}>{sTitle}</h2>
            <p className={styles.isbn}>ISBN: {book.isbn}</p>
            <p className={styles.publisher}>Publisher: {sPublisher}</p>
            <p className={styles.stock}>Stock: {book.stock}</p>
            <p className={styles.date}>
              Published:{" "}
              {new Date(book.publicationDate).toISOString().split("T")[0]}
            </p>
            {children}
          </div>
        </div>
      </LinkLikeButton>
      <ChoiceDialog
        isOpen={isOpen}
        onClose={(e) => {
          e.preventDefault();
          setIsOpen(false);
          console.log("false");
        }}
        onChoice1={() => onRentalClick(book)}
        onChoice2={() => onReturnClick(book)}
        message={book.title}
        choice1Label="借りる"
        choice2Label="返す"
      />
    </div>
  );
};

export default BookListItem;
