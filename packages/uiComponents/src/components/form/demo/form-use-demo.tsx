/*
 * @Author: aixiaoli
 * @Email: xiaoli.ai@quarkintl.com
 * @Description: 功能或页面描述
 * @Date: 2023-05-24 16:59:54
 * @LastEditors: aixiaoli
 * @LastEditTime: 2023-05-25 09:43:47
 */
import { useForm, FormItemWrapper } from '@quark-base-plugin/core/src/components/form';
import { InputItem, InputItemProps } from '../../input/InputItem';

export const FormUseDemo = ({
  formItemData,
  InputItemData,
}: {
  formItemData: any;
  InputItemData: InputItemProps;
}) => {
  const { Form, FormItem } = useForm({
    shouldFocusError: true,
    renderComponent: FormItemWrapper,
  });
  return (
    <div
      style={{ width: '200px', background: 'rgb(250, 251, 252)', height: 'auto', padding: '50px' }}
    >
      <Form>
        <FormItem {...formItemData}>
          <InputItem {...InputItemData} />
        </FormItem>
      </Form>
    </div>
  );
};
