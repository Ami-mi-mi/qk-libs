import { IonIcon } from '@ionic/react';
import clsx from 'clsx';
import { chevronForwardOutline, caretForwardOutline } from 'ionicons/icons';
import { RegisterOptions } from 'react-hook-form';

const classPrefix = 'DefaultFormItemWrapper';
const classPrefixLao = 'LaoFormItemWrapper';
import taggleBtn from './taggle-btn.png';

import './form-item-wrapper.scss';

/**
 * FormItem 样式属性，用来自定义 FormItem 的样式（默认无样式）
 */
export type FormItemWrapperProps = {
  // item点击事件，主要用来判断聚焦状态功能
  onClick: (e: any) => void;
  // 聚焦状态
  focus: boolean;
  // 表单name值
  name: string;
  // 校验规则
  rule?: RegisterOptions;
  // 必填规则 (同时传 rule 的话, rule里面的 required 会覆盖此值)
  required?: boolean;
  // 当前表单item的值
  value?: any;
  // item类型（复杂样式可以用类型来显示不同的样式）
  type?: string;
  // 标题
  label?: string;
  // placeholder
  placeholder?: string;
  // error
  errors?: any;
  // 其他数据，以上的数据不满足样式需求的话，可以将其他数据放在这里面
  extraData?: any;
  // 禁用状态
  disabled?: boolean;

  // 受控组件, InputItem, Picker 等
  children?: any;
  // label 与输入框的排列方式 水平/垂直['vertical', 'horizontal']
  mode?: string;
  // 当mode为horizontal时生效
  labelWidth?: number;
};

export const FormItemWrapper: React.FC<FormItemWrapperProps> = (props: FormItemWrapperProps) => {
  const {
    type,
    focus,
    // name,
    rule,
    errors,
    required,
    value,
    label,
    // placeholder,
    onClick,
    children,
    extraData,
    mode = 'vertical',
    labelWidth = 3,
  } = props;

  const hasDetail = type !== 'input' && type !== 'takePhoto' && type !== 'radio';

  const { icon } = extraData || {};

  if (type === 'fileUploader') {
    return (
      <div
        onClick={(e) => {
          if (onClick) {
            onClick(e);
          }
        }}
        className={clsx(`${classPrefixLao}`, { ['focused']: focus }, { ['error']: errors })}
        style={{ flexDirection: 'column', alignItems: 'flex-start' }}
      >
        <div
          className={clsx(
            `${classPrefixLao}-title`,
            { ['floating']: true },
            { ['focused']: focus },
            { ['error']: errors }
          )}
        >
          {label}
          {label && (rule || required) && <span className={`${classPrefixLao}-required`}>*</span>}
          {label && (rule || required) && <span>&nbsp;&nbsp;</span>}
        </div>
        <div className={`${classPrefixLao}-input`} style={{ width: '100%' }}>
          {children}
        </div>
        {icon}
      </div>
    );
  }

  return (
    <div
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
      }}
      className={clsx(`${classPrefixLao}`, { ['focused']: focus }, { ['error']: errors })}
    >
      {label && mode === 'vertical' && (
        <div
          className={clsx(
            `${classPrefixLao}-title`,
            { ['floating']: !!focus || !!value },
            { ['focused']: focus }
          )}
        >
          {label && required && <span className={`${classPrefixLao}-required`}>*</span>}
          {label}
        </div>
      )}
      <div
        className={clsx(
          {
            [`${classPrefixLao}-input-container`]: type !== 'takePhoto' && type !== 'radio',
            [`${classPrefixLao}-input-container-padding`]:
              type !== 'takePhoto' && type !== 'radio' && type !== 'customer',
            [`${classPrefixLao}-takephoto-container`]: type === 'takePhoto',
            [`${classPrefixLao}-radio-container`]: type === 'radio',
          },
          {
            ['is-error']: errors && type !== 'takePhoto',
            [`${classPrefixLao}-horizontal-margin-bottom`]: mode === 'horizontal',
          }
        )}
      >
        <div
          className={clsx(`${classPrefixLao}-input`, {
            [`${classPrefixLao}-mode-horizontal`]: mode === 'horizontal',
          })}
        >
          {label && mode === 'horizontal' && (
            <span
              className={clsx(`${classPrefixLao}-mode-horizontal-label`, {
                [`${classPrefixLao}-mode-horizontal-font-16`]: type === 'customer',
              })}
              style={{ width: `${labelWidth}rem` }}
            >
              {label}
            </span>
          )}
          {children}
        </div>
        {hasDetail && <img src={taggleBtn} className="w-[24px]" alt="toggleBtn" />}
      </div>
      {errors?.message && <div className={`${classPrefixLao}-error-message`}>{errors.message}</div>}
    </div>
  );
};

export const DefaultFormItemWrapper: React.FC<FormItemWrapperProps> = (
  props: FormItemWrapperProps
) => {
  const {
    type,
    focus,
    // name,
    rule,
    errors,
    required,
    value,
    label,
    // placeholder,
    onClick,
    children,
    extraData,
  } = props;

  const hasDetail = type !== 'input' && type !== 'takePhoto';

  const { icon } = extraData || {};

  if (type === 'fileUploader') {
    return (
      <div
        onClick={(e) => {
          if (onClick) {
            onClick(e);
          }
        }}
        className={clsx(`${classPrefix}`, { ['focused']: focus }, { ['error']: errors })}
        style={{ flexDirection: 'column', alignItems: 'flex-start' }}
      >
        <div
          className={clsx(
            `${classPrefix}-title`,
            { ['floating']: true },
            { ['focused']: focus },
            { ['error']: errors }
          )}
        >
          {label}
          {label && (rule || required) && <span className={`${classPrefix}-required`}>*</span>}
          {label && (rule || required) && <span>&nbsp;&nbsp;</span>}
        </div>
        <div className={`${classPrefix}-input`} style={{ width: '100%' }}>
          {children}
        </div>
        {icon}
      </div>
    );
  }

  return (
    <div
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
      }}
      className={clsx(
        `${classPrefix}`,
        { [`${classPrefix}-takePhoto`]: type === 'takePhoto' },
        { ['focused']: focus },
        { ['error']: errors }
      )}
    >
      {label && (
        <div
          className={clsx(
            `${classPrefix}-title`,
            { ['floating']: !!focus || !!value },
            { ['focused']: focus },
            { ['error']: errors }
          )}
        >
          {label}
          {label && (rule || required) && <span className={`${classPrefix}-required`}>*</span>}
          {label && (rule || required) && <span>&nbsp;&nbsp;</span>}
        </div>
      )}
      <div className={`${classPrefix}-input`}>{children}</div>
      {hasDetail && (
        <IonIcon icon={chevronForwardOutline} className={`${classPrefix}-rightArrow`} />
      )}
      {icon}
    </div>
  );
};

export const NoStyleFormItemWrapper: React.FC<FormItemWrapperProps> = (
  props: FormItemWrapperProps
) => {
  const { children } = props;
  return <>{children}</>;
};
