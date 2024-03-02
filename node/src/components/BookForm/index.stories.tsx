// BookForm/index.stories.tsx
import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import BookForm, { BookFormProps } from "./index";

export default {
  title: "Organizing/BookForm",
  component: BookForm,
} as Meta;

const Template: Story<BookFormProps> = (args) => <BookForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  initialBookData: {
    isbn: "9784591159224",
    title: "Sample Book Title",
    author: "Author Name",
    publicationDate: "2022-01-01",
    publisher: "Sample Publisher",
    stock: 10,
  },
  onSubmit: (updatedBookData) => console.log(updatedBookData),
};
