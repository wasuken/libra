export interface Book {
  isbn: string;
  title: string;
  author: string;
  publicationDate: string; // 日付の形式はプロジェクトによって異なる場合があります
  publisher: string;
  stock: number;
}
