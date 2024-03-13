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
  onReserveClick: (book: Book) => Promise<void>;
  children: React.ReactNode;
}

const BookListItem: React.FC<BookListItemProps> = ({
  book,
  onClick,
  onRentalClick,
  onReturnClick,
  onReserveClick,
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
            <p className={styles.stock}>予約可能蔵書数: {book.stock}</p>
            <p className={styles.reserves}>
              予約{book.reserves && book.reserves > 0 ? "有" : "無"}
            </p>
            <p className={styles.date}>
              Published:{" "}
              {new Date(book.publicationDate).toISOString().split("T")[0]}
            </p>
            {children}
          </div>
        </div>
      </LinkLikeButton>
      {onRentalClick === undefined ? (
        <ChoiceDialog
          isOpen={isOpen}
          onClose={(e) => {
            e.preventDefault();
            setIsOpen(false);
          }}
          choices={[
            {
              onChoice: () => {
                onReturnClick(book);
                setIsOpen(false);
              },
              choiceLabel: "返却",
              choiceButtonType: "choice2Button",
            },
          ]}
          message={book.title}
        />
      ) : (
        <ChoiceDialog
          isOpen={isOpen}
          onClose={(e) => {
            e.preventDefault();
            setIsOpen(false);
          }}
          choices={
            book.stock > 0
              ? [
                  {
                    onChoice: () => {
                      onRentalClick(book);
                      setIsOpen(false);
                    },
                    choiceLabel: "借りる",
                    choiceButtonType: "choice1Button",
                  },
                ]
              : [
                  {
                    onChoice: () => {
                      onReserveClick(book);
                      setIsOpen(false);
                    },
                    choiceLabel: "予約",
                    choiceButtonType: "choice1Button",
                  },
                ]
          }
          message={book.title}
        />
      )}
    </div>
  );
};

export default BookListItem;
