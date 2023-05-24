import { useMemoizedFn } from 'ahooks';
import React from 'react';
import { FieldValues, useForm as useHookForm, FormProvider } from 'react-hook-form';

import Item, { FormItemProps } from './form-item';

import type { FormItemWrapperProps } from './form-item-wrapper';
import type { DeepPartial, FieldErrors } from 'react-hook-form';

export type UseFormProps<T extends FieldValues> = {
  /**
   * 表单数据默认值，可以使用异步获取
   */
  defaultValues?: DeepPartial<T> | (() => Promise<T>) | undefined;
  /**
   * 验证错误是否聚焦
   */
  shouldFocusError?: boolean;
  /**
   * 校验模式，默认onSubmit时校验
   */
  mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all';

  /**
   * 提交表单且数据验证成功后触发
   */
  onFinish?: (data: T) => void;
  /**
   * 提交表单且数据验证失败后触发
   */
  onFinishFailed?: (errors: FieldErrors) => void;

  /**
   * 统一定制渲染item样式的组件，如需单独定义某个 Item 的样式，向 FormItem 传递 renderComponent
   */
  renderComponent?: React.FC<FormItemWrapperProps>;
};

export type FormProps = {
  children: any;
};

export function useForm<T extends FieldValues = FieldValues>(props: UseFormProps<T>) {
  const {
    defaultValues,
    mode = 'onSubmit',
    shouldFocusError,

    onFinish,
    onFinishFailed,

    renderComponent: formRenderComponent,
  } = props;

  const form = useHookForm<T>({
    defaultValues,
    shouldFocusError,
    mode,
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const values = form.watch();

  // console.log('Object.keys(errors): ', Object.keys(errors));
  // console.log('errors: ', errors);

  const getErrorMessageInfo = useMemoizedFn(() => {
    const [name] = Object.keys(errors);
    if (!name) {
      return undefined;
    }
    let error = errors[name];
    let { type, message } = error || {};

    const nameArray = name.split('.');
    if (nameArray.length > 1) {
      const [formKey, index, feldName] = nameArray;
      const errorArray = errors[formKey] as any;
      if (errors && errorArray && errorArray[index]) {
        error = errorArray[index][feldName];
        type = error?.type;
        message = error?.message;
      }
    } else if (error instanceof Array) {
      const firstError = error.find((v) => !!v);
      const [key] = Object.keys(firstError);
      message = firstError[key].message;
    }
    if (!message) {
      switch (type) {
        case 'required':
          message = `${name} is required`;
          break;
        default:
          message = 'ກະລຸນາໃສ່ຂໍ້ມູນທີ່ຖືກຕ້ອງ';
      }
    }
    return message;
  });

  const FormItem = useMemoizedFn((props: FormItemProps) => {
    return <Item renderComponent={formRenderComponent} {...props} />;
  });

  const Form = useMemoizedFn(({ children }: FormProps) => {
    const onValid = (data: any) => {
      onFinish?.(data);
    };
    const onInvalid = (errors: FieldErrors) => {
      onFinishFailed?.(errors);
    };
    return (
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onValid, onInvalid)}>{children}</form>
      </FormProvider>
    );
  });

  return {
    Form,
    FormItem,
    values,
    errors,
    getErrorMessageInfo,
    formRef: form,
  };
}
