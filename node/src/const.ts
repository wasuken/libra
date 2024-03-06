export interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  thumbnailUrl: string;
  publicationDate: string;
  publisher: string;
  stock: number;
}

export interface RentalBook extends Book {
  dueDate: string;
  returnDate: string;
}

export function isRentalBook(book: Book | RentalBook): book is RentalBook {
  return (book as RentalBook).returnDate !== undefined;
}

export interface SelectButton {
  text: string;
  onClick: () => Promise<void>;
}
