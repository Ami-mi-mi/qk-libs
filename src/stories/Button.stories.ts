/*
 * @Author: aixiaoli
 * @Email: xiaoli.ai@quarkintl.com
 * @Description: 功能或页面描述
 * @Date: 2023-05-24 14:19:14
 * @LastEditors: aixiaoli
 * @LastEditTime: 2023-05-24 16:26:39
 */
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@quark-base-plugin/core';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    fill: 'solid',
    color: 'primary',
    children: 'Primary'
  },
};

export const Success: Story = {
  args: {
    fill: 'solid',
    color: 'success',
    children: 'sucess'
  },
};

// export const Large: Story = {
//   args: {
//     size: 'large',
//     label: 'Button',
//   },
// };

// export const Small: Story = {
//   args: {
//     size: 'small',
//     label: 'Button',
//   },
// };
