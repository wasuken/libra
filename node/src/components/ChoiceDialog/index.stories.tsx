// ChoiceDialog.stories.tsx
import React from "react";
import { Story, Meta } from "@storybook/react";
import ChoiceDialog from "./index";

export default {
  title: "Templates/ChoiceDialog",
  component: ChoiceDialog,
} as Meta;

const Template: Story = (args) => <ChoiceDialog {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  message: "Do you want to continue?",
  choice1Label: "Option 1",
  choice2Label: "Option 2",
  onChoice1: () => alert("Option 1 selected"),
  onChoice2: () => alert("Option 2 selected"),
  onClose: () => alert("Cancelled"),
};
