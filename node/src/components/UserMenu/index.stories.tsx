// src/components/UserMenu/index.stories.tsx
import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import UserMenu, { UserMenuProps } from "./index";

export default {
  title: "Molecules/UserMenu",
  component: UserMenu,
} as Meta;

const Template: Story<UserMenuProps> = (args) => <UserMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
  buttons: [
    {
      text: "test1",
      buttonType: "white",
      onClick: () => alert("test1"),
    },
    {
      text: "test2",
      buttonType: "red",
      onClick: () => alert("test2"),
    },
  ],
};
