/*
 * @Author: aixiaoli
 * @Email: xiaoli.ai@quarkintl.com
 * @Description: 功能或页面描述
 * @Date: 2023-05-24 16:59:54
 * @LastEditors: aixiaoli
 * @LastEditTime: 2023-05-24 17:56:09
 */
import { useForm, FormItemWrapper } from '@quark-base-plugin/core/src/components/form';
import { InputItem, InputItemProps } from '../InputItem';

export const InputUseDemo = (props: InputItemProps) => {
  const { Form, FormItem } = useForm({
    shouldFocusError: true,
    renderComponent: FormItemWrapper,
  });
  return (
    <div
      style={{ width: '200px', background: 'rgb(250, 251, 252)', height: 'auto', padding: '50px' }}
    >
      <Form>
        <FormItem name="xxx" label="bbb" mode="horizontal" type="input">
          <InputItem {...props} />
        </FormItem>
      </Form>
    </div>
  );
};
