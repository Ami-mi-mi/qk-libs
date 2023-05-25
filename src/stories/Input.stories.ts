/*
 * @Author: aixiaoli
 * @Email: xiaoli.ai@quarkintl.com
 * @Description: 功能或页面描述
 * @Date: 2023-05-25 09:47:19
 * @LastEditors: aixiaoli
 * @LastEditTime: 2023-05-25 10:03:39
 */
import type { Meta, StoryObj } from '@storybook/react';
import { InputItem } from '@quark-base-plugin/core';

const meta = {
    title: 'Example/Input',
    component: InputItem,
    tags: ['autodocs'],
  } satisfies Meta<typeof InputItem>;
  
  export default meta;
  type Story = StoryObj<typeof meta>;
  
  // More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
  export const InputNumber: Story = {
    args: {
        placeholder: '请输入（单独使用input没有背景和边框样式，配合 Form、FormItem 使用可选择样式类型）'
    },
  };