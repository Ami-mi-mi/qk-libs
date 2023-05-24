import classNames from 'classnames';
import React from 'react';

import { InputItem, InputItemProps } from '../InputItem';
import './index.scss';

const MAILS = ['gmail.com', 'hotmail.com', 'yahoo.com', 'aol.com', 'outlook.com'] as Array<string>;

const classPrefix = 'qk-emailInput';

type Props = Omit<InputItemProps, 'onChange'> & {
  suffixs?: string[];
  onChange?: (e: string) => void;
  value?: string;
  classNameSuffix?: string;
};

export default React.forwardRef(function EmailInput(props: Props, ref: React.Ref<any>) {
  const { suffixs = MAILS, onChange, value, classNameSuffix, ...others } = props;
  const [fix, setFix] = React.useState(false);
  const [suffixArray, setSuffixArray] = React.useState<string[] | null>(MAILS);

  function handleChange(val: string) {
    setFix(!!val);
    let arr = null;
    if (val.indexOf('@') < 0) {
      arr = suffixs.map((v) => {
        if (val.endsWith('@')) return `${val}${v}`;
        return `${val}@${v}`;
      });
    }

    setSuffixArray(arr);
    onChange?.(val);
  }

  function handleSelct(value: any, e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    onChange?.(value);
    setFix(false);
  }

  function renderSuffix() {
    if (!fix || !suffixArray) return null;

    return (
      <div className={classNames(`${classPrefix}-row-box`, classNameSuffix)}>
        {suffixArray.map((item) => {
          return (
            <div
              className={`${classPrefix}-row-box-item`}
              key={item}
              onClick={(e) => handleSelct(item, e)}
            >
              {item}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`${classPrefix}-row`}>
      <InputItem
        maxLength={50}
        value={value}
        ref={ref}
        onChange={handleChange}
        {...others}
        onBlur={(e: any) => {
          setTimeout(() => {
            setFix(false);
            props.onBlur?.(e);
          }, 20);
        }}
      />
      {renderSuffix()}
    </div>
  );
});
