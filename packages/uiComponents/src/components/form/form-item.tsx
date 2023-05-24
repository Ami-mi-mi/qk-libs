import { useMemoizedFn } from 'ahooks';
import _ from 'lodash';
import React, { useState, useRef } from 'react';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';

import { FormItemWrapperProps } from './form-item-wrapper';

export type FormItemProps = {
  name: string;
  rule?: RegisterOptions;
  children?: any;
  required?: string | boolean | undefined;

  // item类型
  type?: string;
  label?: string | React.ReactNode;
  placeholder?: string;
  extraData?: any;
  disabled?: boolean;

  onClick?: (e?: any) => void;
  // onChange的时候，自定义转换成form表单的值
  valueTransformer?: (val: any) => any;
  mode?: string;

  /**
   * 单独定义某个 Item 的样式，默认无样式
   */
  renderComponent?: React.FC<FormItemWrapperProps>;
};

const FormItem = function ForItem(props: FormItemProps) {
  const {
    name,
    rule,
    required,
    children,
    valueTransformer,
    renderComponent,
    type,
    label,
    placeholder,
    extraData,
    disabled,
    mode = 'vertical',
  } = props;

  const {
    control,
    getValues,
    formState: { errors },
    clearErrors,
  } = useFormContext();

  const [focus, setFocus] = useState<boolean>(false);

  const handleClickItem = useMemoizedFn((e) => {
    if (childRef.current?.focus) {
      childRef.current.focus();
    }
    // 支持点击埋点
    props?.onClick?.(e);
  });

  const childRef = useRef<any>();

  const child = (
    <Controller
      //@ts-ignore
      name={name}
      control={control}
      // defaultValue={defaultValues?.[name]}
      rules={{ required, ...rule }}
      render={({ field }) => {
        return React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            ...child.props,
            ...field,
            // 对受控的方法 onBlur，onChange 做一次转换
            onBlur: (e: any) => {
              child.props?.onBlur?.(e);
              field.onBlur();
              setFocus(false);
            },
            onFocus: (e: any) => {
              child.props?.onFocus?.(e);
              setFocus(true);
              if (childRef.current.nativeElement) {
                childRef.current.nativeElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                });
              }
            },
            onChange: (e: any) => {
              const value = valueTransformer ? valueTransformer(e) : e;
              child.props?.onChange?.(value);
              field.onChange?.(value);
              if (type !== 'input') {
                setFocus(false);
              }
            },
            value: _.get(getValues(), name),
            ref: (e: any) => {
              childRef.current = e;
              field?.ref(e);
            },
            errors: _.get(errors, name),
          });
        });
      }}
    />
  );

  const Component = useMemoizedFn(renderComponent || (() => <></>));

  if (renderComponent) {
    const componentProps = {
      focus,
      setFocus,
      onClick: handleClickItem,
      rule,
      name,
      mode,
      value: _.get(getValues(), name),
      type,
      label,
      placeholder,
      extraData,
      disabled,
      required,
      errors: _.get(errors, name),
    } as FormItemWrapperProps;
    return <Component {...componentProps}>{child}</Component>;
  }
  return <>{child}</>;
};

export default FormItem;
