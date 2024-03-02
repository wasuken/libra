// BookInfoModal/index.stories.tsx
import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import BookInfoModal, { BookInfoModalProps } from "./index";

export default {
  title: "Templates/BookInfoModal",
  component: BookInfoModal,
} as Meta;

const Template: Story<BookInfoModalProps> = (args) => (
  <BookInfoModal {...args} />
);

export const OpenModal = Template.bind({});
OpenModal.args = {
  isOpen: true,
  onClose: () => console.log("Modal closed"),
};
