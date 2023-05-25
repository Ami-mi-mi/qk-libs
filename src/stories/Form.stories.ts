/*
 * @Author: aixiaoli
 * @Email: xiaoli.ai@quarkintl.com
 * @Description: 功能或页面描述
 * @Date: 2023-05-24 14:19:14
 * @LastEditors: aixiaoli
 * @LastEditTime: 2023-05-25 09:45:03
 */
import type { Meta, StoryObj } from '@storybook/react';

import { FormUseDemo } from '@quark-base-plugin/core';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Example/Form',
  component: FormUseDemo,
  tags: ['autodocs'],
  argTypes: {
    
  },
} satisfies Meta<typeof FormUseDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const FormElement: Story = {
  args: {
    formItemData: {
        name: 'name',
        label: '姓名',
        mode: 'horizontal',
        type: 'input',
        required: '姓名不能为空',
    },
    InputItemData: {
        placeholder: '请输入姓名'
    }
  },
};

