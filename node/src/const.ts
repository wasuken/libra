export interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  publicationDate: string;
  publisher: string;
  stock: number;
}

export interface SelectButton {
  text: string;
  onClick: () => Promise<void>;
}
