// BookListTab.stories.tsx
import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import BookListTab from "./";
import { BookListInfo } from "@/const";
import BookList from "@/components/BookList";
import RentalBookList from "@/components/RentalBookList";
import ReserveBookList from "@/components/ReserveBookList";

export default {
  title: "Components/BookListTab",
  component: BookListTab,
} as Meta;

const Template: Story<typeof BookListTab> = (args) => <BookListTab {...args} />;

const books = [
  // 本一覧のデータを定義
  {
    id: "test",
    isbn: "test",
    title: "test",
    author: "test",
    thumbnailUrl: "test",
    publicationDate: "2023-01-01",
    publisher: "test",
    stock: 1,
    reserves: 2,
  },
  {
    id: "test",
    isbn: "test",
    title: "test",
    author: "test",
    thumbnailUrl: "test",
    publicationDate: "2023-01-01",
    publisher: "test",
    stock: 1,
    reserves: 2,
  },
  {
    id: "test",
    isbn: "test",
    title: "test",
    author: "test",
    thumbnailUrl: "test",
    publicationDate: "2023-01-01",
    publisher: "test",
    stock: 1,
    reserves: 2,
  },
  {
    id: "test",
    isbn: "test",
    title: "test",
    author: "test",
    thumbnailUrl: "test",
    publicationDate: "2023-01-01",
    publisher: "test",
    stock: 1,
    reserves: 2,
  },
  {
    id: "test",
    isbn: "test",
    title: "test",
    author: "test",
    thumbnailUrl: "test",
    publicationDate: "2023-01-01",
    publisher: "test",
    stock: 1,
    reserves: 2,
  },
  {
    id: "test",
    isbn: "test",
    title: "test",
    author: "test",
    thumbnailUrl: "test",
    publicationDate: "2023-01-01",
    publisher: "test",
    stock: 1,
    reserves: 2,
  },
];

const rentalBooks = [
  // レンタル中の本のデータを定義
  {
    id: "test2",
    isbn: "test",
    title: "test2",
    author: "test",
    thumbnailUrl: "test",
    publicationDate: "2023-01-01",
    publisher: "test",
    stock: 1,
    reserves: 2,
  },
];

const reserveBooks = [
  // 予約中の本のデータを定義
  {
    id: "test3",
    isbn: "test",
    title: "test3",
    author: "test",
    thumbnailUrl: "test",
    publicationDate: "2023-01-01",
    publisher: "test",
    stock: 1,
    reserves: 2,
  },
];

const tabs: BookListInfo[] = [
  {
    title: "本一覧",
    contents: (
      <BookList
        books={books}
        onRentalClick={() => {}}
        onReturnClick={() => {}}
        onReserveClick={() => {}}
        onItemClick={() => {}}
      />
    ),
  },
  {
    title: "レンタル中の本",
    contents: (
      <RentalBookList
        books={rentalBooks}
        onRentalClick={() => {}}
        onReturnClick={() => {}}
        onReserveClick={() => {}}
        onItemClick={() => {}}
      />
    ),
  },
  {
    title: "予約中の本",
    contents: (
      <ReserveBookList
        books={reserveBooks}
        onRentalClick={() => {}}
        onReturnClick={() => {}}
        onReserveClick={() => {}}
        onItemClick={() => {}}
      />
    ),
  },
];

export const Default: Story<typeof BookListTab> = Template.bind({});
Default.args = {
  tabs,
};
