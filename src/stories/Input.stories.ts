/*
 * @Author: aixiaoli
 * @Email: xiaoli.ai@quarkintl.com
 * @Description: 功能或页面描述
 * @Date: 2023-05-24 14:19:14
 * @LastEditors: aixiaoli
 * @LastEditTime: 2023-05-24 17:34:35
 */
import type { Meta, StoryObj } from '@storybook/react';

import { InputUseDemo, InputItem } from '@quark-base-plugin/core';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Example/InputItem',
  component: InputUseDemo,
  tags: ['autodocs'],
  argTypes: {
    
  },
} satisfies Meta<typeof InputUseDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const InputNumber: Story = {
  args: {
    type: 'number',
    placeholder: 'xxx'
  },
};

