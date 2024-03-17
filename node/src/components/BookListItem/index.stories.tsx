// BookListItem/index.stories.tsx
import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import BookListItem, { BookListItemProps } from "./index";

export default {
  title: "Molecules/BookListItem",
  component: BookListItem,
} as Meta;

const Template: Story<BookListItemProps> = (args) => <BookListItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  book: {
    id: 1,
    title: "Example Book Titldksafdajfkjkdasfjkladsjfkadskfjkdlase",
    isbn: "123-4567890123",
    publisher: "Example Publisherlkdajflkajd;fjdasjfadsjfjadskljl",
    stock: 3,
    thumbnailUrl: "https://via.placeholder.com/100x150",
    publicationDate: "2020-01-01 00:00:00",
  },
  isSimple: false,
  onClick: () => alert("click!"),
};
