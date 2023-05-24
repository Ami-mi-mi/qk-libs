import formatUtils from '@quark-base-plugin/utils/formatUtils';
import { useFocusWithin } from 'ahooks';
import classNames from 'classnames';
import clsx, { ClassValue } from 'clsx';
import React, { AriaAttributes, forwardRef, useImperativeHandle, useRef } from 'react';
import InputMask from 'react-input-mask';

import { CloseCircle } from './CloseCircle';
import useCustomEventTarget from './useCustomEventTarget';
import { moneyInputFormat } from './utils';

type NativeInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

function transformerFn(
  type: string | undefined,
  customTransformer?: ((value: string) => any) | undefined
) {
  if (customTransformer) {
    return customTransformer;
  }
  switch (type) {
    case 'number':
      return (val: string) => {
        const value = formatUtils.digits(val) + '';
        return value;
      };
    case 'digits':
      return (val: string) => formatUtils.digits(val) + '';
    case 'money':
      return (val: string) => {
        const digits = formatUtils.money2digits(val);
        return moneyInputFormat(digits);
      };
    case 'moneyInt':
      return (val: string) => {
        const digits = formatUtils.digits(val);
        return formatUtils.money(digits);
      };
    default:
      return (value: string) => value;
  }
}

export type InputItemRef = {
  clear: () => void;
  focus: () => void;
  blur: () => void;
  nativeElement: HTMLInputElement | null;
};

export type InputItemProps = {
  /**
   * 通过表单FormItem传递，单独使用时手动赋值
   */
  name?: string;
  /**
   * 默认值
   */
  defaultValue?: any;
  /**
   * input mask 使用文档 https://github.com/sanniassin/react-input-mask
   */
  mask?: string | (string | RegExp)[];
  value?: any;
  placeholder?: string;
  errors?: any;
  type?: 'number' | 'money' | string;
  ref?: any;
  className?: ClassValue;
  customRender?: (props: { isFocus: boolean; errors: any }) => React.ReactNode;
  onFocus?: any;
  onBlur?: any;
  onChange?: any;

  /**
   * 自定义限制输入字符
   */
  transformer?: ((value: string) => any) | undefined;

  readOnly?: boolean;
  clearable?: boolean;
  onlyShowClearWhenFocus?: boolean;

  onEnterPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
  min?: number;
  max?: number;

  disabled?: boolean;
  role?: string;

  /**
   * 自定义input左边的元素
   */
  prefixRender?: React.ReactNode;
  /**
   * 自定义input右边的元素
   */
  suffixRender?: React.ReactNode;
} & Pick<
  NativeInputProps,
  | 'maxLength'
  | 'minLength'
  | 'autoComplete'
  | 'autoFocus'
  | 'pattern'
  | 'inputMode'
  | 'type'
  | 'name'
  | 'onFocus'
  | 'onBlur'
  | 'autoCapitalize'
  | 'autoCorrect'
  | 'onKeyDown'
  | 'onKeyUp'
  | 'onCompositionStart'
  | 'onCompositionEnd'
  | 'onClick'
  | 'step'
> &
  AriaAttributes;

export const InputItem = forwardRef<InputItemRef, InputItemProps>(function InputItem(
  props: InputItemProps,
  ref
) {
  const {
    errors,
    // value: value2,
    defaultValue,
    type,
    name,
    // cRef,
    className,
    customRender,
    prefixRender,
    suffixRender,

    onlyShowClearWhenFocus = true,
  } = props;

  const nativeInputRef = useRef<HTMLInputElement>(null);
  const [value, { onChange, reset }] = useCustomEventTarget({
    initialValue: defaultValue || '',
    transformer: transformerFn(type, props.transformer),
    props,
  });

  useImperativeHandle(ref, () => ({
    clear: () => {
      reset();
    },
    focus: () => {
      nativeInputRef.current?.focus();
    },
    blur: () => {
      nativeInputRef.current?.blur();
    },
    get nativeElement() {
      return nativeInputRef.current;
    },
  }));
  // console.log('InputItem props');
  // console.log(props);

  // console.log('value');
  // console.log(value2);
  // console.log(value);

  const isFocus = useFocusWithin(() => document.getElementById(`qk-input-item-${name}`), {
    onFocus: () => {
      // props.onFocus?.(value);
      // console.log('onfocus', name);
    },
    onBlur: () => {
      // props.onBlur?.(value);
      // console.log('onblur', name);
    },
  });
  // className={className}
  // defaultValue={defaultValue}
  // type={type}

  const shouldShowClear = (() => {
    if (!props.clearable || !value || props.readOnly) return false;
    if (onlyShowClearWhenFocus) {
      return isFocus;
    } else {
      return true;
    }
  })();

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //@ts-ignore
    if (props.onEnterPress && (e.code === 'Enter' || e.keyCode === 13)) {
      props.onEnterPress(e);
    }
    props.onKeyDown?.(e);
  };

  return (
    <>
      <div
        id={`qk-input-${name}`}
        className={classNames('qk-input', { focused: isFocus }, { error: errors }, className)}
      >
        <>
          {prefixRender}
          {/* @ts-ignore */}
          <InputMask
            mask={props.mask}
            id={`qk-input-item-${name}`}
            // {...props}
            value={value || ''}
            className={clsx('qk-input-item')}
            ref={nativeInputRef}
            // defaultValue={defaultValue}
            onChange={(e: any) => {
              // props.onChange(e);
              onChange(e);
            }}
            onFocus={(e) => {
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              props.onBlur?.(e);
            }}
            placeholder={props.placeholder}
            disabled={props.disabled}
            readOnly={props.readOnly}
            maxLength={props.maxLength}
            minLength={props.minLength}
            max={props.max}
            min={props.min}
            autoComplete={props.autoComplete}
            // autoFocus={props.autoFocus}
            pattern={props.pattern}
            inputMode={props.inputMode}
            type={props.type}
            name={props.name}
            autoCapitalize={props.autoCapitalize}
            autoCorrect={props.autoCorrect}
            onKeyDown={handleKeydown}
            onKeyUp={props.onKeyUp}
            onCompositionStart={(e) => {
              props.onCompositionStart?.(e);
            }}
            onCompositionEnd={(e) => {
              props.onCompositionEnd?.(e);
            }}
            onClick={props.onClick}
            role={props.role}
            aria-valuenow={props['aria-valuenow']}
            aria-valuemax={props['aria-valuemax']}
            aria-valuemin={props['aria-valuemin']}
            aria-label={props['aria-label']}
          />
          {shouldShowClear && (
            <div
              className="qk-input-item-clear"
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onClick={() => {
                reset();
              }}
            >
              <CloseCircle />
            </div>
          )}
          {suffixRender}
        </>
      </div>
      {customRender
        ? customRender({ isFocus, errors })
        : errors && (
            <div className={'qk-input-error'}>
              {/* <img className={'qk-input-error-icon'} src={iconErrorAsset} alt="" /> */}
              <span className={'qk-input-error-text'}>{errors.message}</span>
            </div>
          )}
    </>
  );
});
