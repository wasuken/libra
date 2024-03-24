import React, { useState, useEffect } from "react";
import BookInfoModal from "@/components/BookInfoModal";
import BookList from "@/components/BookList";
import RentalBookList from "@/components/RentalBookList";
import ReserveBookList from "@/components/ReserveBookList";
import BookListTab from "@/components/BookListTab";
import UserMenu from "@/components/UserMenu";
import { Book, RentalBook, ReserveBook } from "@/const";
import useAuth from "@/useAuth";
import styles from "./Top.module.css"; // CSS Moduleのインポート

// 仮の書籍データ
const Top: React.FC<TopProps> = () => {
  const { logout, afetch, userId, username } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [rentalBooks, setRentalBooks] = useState<RentalBook[]>([]);
  const [reserveBooks, setReserveBooks] = useState<ReserveBook[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const postReserveBook = async (book: Book) => {
    const res = await afetch(`/api/user/book/reserve/${book.id}`, {
      method: "POST",
      body: JSON.stringify(book),
    });
    if (res.ok) {
      alert("予約完了");
      // 再取得
      await fetchBooks();
    }
  };
  const postRentalBook = async (book: Book) => {
    const res = await afetch(`/api/book/rental/${book.id}`, {
      method: "POST",
      body: JSON.stringify(book),
    });
    if (res.ok) {
      alert("レンタル完了");
      // 再取得
      await fetchBooks();
    }
  };
  const postReturnBook = async (book: Book) => {
    const res = await afetch(`/api/book/return/${book.id}`, {
      method: "POST",
      body: JSON.stringify(book),
    });
    if (res.ok) {
      alert("返却完了");
      // 再取得
      await fetchBooks();
    }
  };

  const fetchBooks = async () => {
    const res = await afetch(`/api/user/books`);
    if (res.ok) {
      const resData = await res.json();
      /* console.log("debug", userId);
       * console.log("debug", resData.data); */
      setBooks(
        resData.data
          .filter(
            (b) =>
              parseInt(b.rental_user_id) != userId &&
              parseInt(b.reserve_user_id) != userId
          )
          .map((book) => {
            return {
              id: book.id,
              isbn: book.isbn,
              title: book.title,
              author: book.author,
              thumbnailUrl: book.thumbnail_url,
              publicationDate: book.publication_date,
              publisher: book.publisher,
              stock: book.stock,
              reserves: parseInt(book.reserves),
            };
          })
      );
      setRentalBooks(
        resData.data
          .filter(
            (b) =>
              parseInt(b.rental_user_id) == userId &&
              parseInt(b.reserve_user_id) != userId
          )
          .map((rb, i) => {
            const book: RentalBook = {
              id: rb.id,
              isbn: rb.isbn,
              title: rb.title,
              author: rb.author,
              thumbnailUrl: rb.thumbnail_url,
              publicationDate: rb.publication_date,
              publisher: rb.publisher,
              stock: rb.stock,
              dueDate: rb.due_date,
              returnDate: rb.return_date,
              reserves: parseInt(rb.reserves),
            };
            return book;
          })
      );
      setReserveBooks(
        resData.data
          .filter((b) => parseInt(b.reserve_user_id) == userId)
          .map((rb, i) => {
            const book: ReserveBook = {
              id: rb.id,
              isbn: rb.isbn,
              title: rb.title,
              author: rb.author,
              thumbnailUrl: rb.thumbnail_url,
              publicationDate: rb.publication_date,
              publisher: rb.publisher,
              stock: rb.stock,
              reserveDate: rb.reserve_date,
              reserves: parseInt(rb.reserves),
            };
            return book;
          })
      );
    }
  };
  const postBook = async (book: Book) => {
    const res = await afetch(`/api/book`, {
      method: "POST",
      body: JSON.stringify(book),
    });
    if (res.ok) {
      alert("登録完了");
      // 再取得
      await fetchBooks();
    }
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const tabs: BookListInfo[] = [
    {
      title: "本一覧",
      contents: (
        <BookList
          books={books}
          onRentalClick={postRentalBook}
          onReturnClick={postReturnBook}
          onReserveClick={postReserveBook}
          onItemClick={() => {}}
        />
      ),
    },
    {
      title: "レンタル中の本",
      contents: (
        <RentalBookList
          books={rentalBooks}
          onRentalClick={postRentalBook}
          onReturnClick={postReturnBook}
          onReserveClick={postReserveBook}
          onItemClick={() => {}}
        />
      ),
    },
    {
      title: "予約中の本",
      contents: (
        <ReserveBookList
          books={reserveBooks}
          onRentalClick={postRentalBook}
          onReturnClick={postReturnBook}
          onReserveClick={postReserveBook}
          onItemClick={() => {}}
        />
      ),
    },
  ];

  useEffect(() => {
    fetchBooks().then(() => console.log("fetch books."));
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Book Manager</h1>
        <UserMenu
          username={username}
          buttons={[
            {
              text: "ログアウト",
              buttonType: "blue",
              onClick: () => logout(),
            },
            {
              text: "本の登録",
              buttonType: "blue",
              onClick: handleOpenModal,
            },
          ]}
        />
      </div>
      <div className={styles.bookRegistrationSection}>
        <BookInfoModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={postBook}
        />
      </div>
      <BookListTab tabs={tabs} />
    </div>
  );
};

export default Top;
