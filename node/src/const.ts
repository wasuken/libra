export interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  thumbnailUrl: string;
  publicationDate: string;
  publisher: string;
  stock: number;
  reserves: number;
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
  buttonType: "white" | "red";
  onClick: () => Promise<void>;
}

export interface Choice {
  onChoice: () => void;
  choiceLabel: string;
  choiceButtonType: string;
}
