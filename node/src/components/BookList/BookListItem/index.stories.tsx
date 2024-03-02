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
    title: "Example Book Title",
    isbn: "123-4567890123",
    publisher: "Example Publisher",
    stock: 3,
    thumbnail_url: "https://via.placeholder.com/100x150",
    publication_date: new Date("2020-01-01"),
  },
  isSimple: false,
  onClick: () => alert("click!"),
};
