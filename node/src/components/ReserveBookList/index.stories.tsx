// ReserveBookList/index.stories.tsx
import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import ReserveBookList, { ReserveBookListProps } from "./index";

export default {
  title: "Organizing/ReserveBookList",
  component: ReserveBookList,
} as Meta;

const Template: Story<ReserveBookListProps> = (args) => (
  <ReserveBookList {...args} />
);

function genBooks(n: number) {
  const books = [];
  for (let i = 1; i <= n; i++) {
    books.push({
      id: i,
      title: `Book Title jdfk;ladsjkl;fjkld;sajfkl;dasjkljdsakl;fjdsajfkl ${i}`,
      isbn: `123-4567890123`,
      publisher: `Publisher dklasjfkldasjfk;ljdsalk;fjladsjflk;dasklfdsa ${i}`,
      stock: 2,
      thumbnailUrl: `https://via.placeholder.com/100x150`,
      publicationDate: new Date(`2020-01-01`),
    });
  }
  return books;
}

export const Default = Template.bind({});
Default.args = {
  books: genBooks(30),
  onItemClick: (b) => {
    alert(b.title);
  },
};
