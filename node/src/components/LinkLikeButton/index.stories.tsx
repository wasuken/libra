import React from "react";
import { Story, Meta } from "@storybook/react";
import LinkLikeButton from "./index";
import "./index.module.css";

export default {
  title: "Atoms/LinkLikeButton",
  component: LinkLikeButton,
} as Meta;

const Template: Story<{ onClick: () => void; children: React.ReactNode }> = (
  args,
) => <LinkLikeButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Click Me",
  onClick: () => alert("Button clicked!"),
  isSimple: false,
};

export const WithCustomText = Template.bind({});
WithCustomText.args = {
  ...Default.args,
  children: "simple text",
  isSimple: true,
};
