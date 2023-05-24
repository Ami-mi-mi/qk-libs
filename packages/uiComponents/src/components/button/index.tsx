import { Color } from '@ionic/core/dist/types/interface';
import { IonButton } from '@ionic/react';
import { IonicReactProps } from '@ionic/react/dist/types/components/IonicReactProps';
import clsx from 'clsx';
import React, { HTMLAttributes } from 'react';
import './index.scss';

import type { JSX } from '@ionic/core/components';

const classPrefix = `qk-button`;

type Props = IonicReactProps &
  Pick<
    JSX.IonButton,
    | 'disabled'
    | 'strong'
    | 'size'
    | 'fill'
    | 'mode'
    | 'expand'
    | 'onIonBlur'
    | 'onIonFocus'
    | 'type'
    | 'routerAnimation'
    | 'href'
    | 'rel'
    | 'target'
    | 'buttonType'
    | 'download'
    | 'shape'
  > &
  HTMLAttributes<HTMLIonButtonElement> & {
    className?: string;
    onAfterClick?: (val: any) => void;
    children: any;
    color?: Color | 'ghost' | 'clear';
  };

function isPromise(obj: unknown): obj is Promise<unknown> {
  return !!obj && typeof obj === 'object' && typeof (obj as any).then === 'function';
}

export default function Button(props: Props) {
  const { children, className, disabled, color, ...others } = props;
  return (
    <IonButton
      // color={'primary'}"
      expand="block"
      className={clsx(
        classPrefix,
        className,
        { 'qk-button-disabled': disabled },
        { 'qk-button-ghost': color === 'ghost' },
        { 'qk-button-clear': color === 'clear' }
      )}
      disabled={disabled}
      color={color}
      {...others}
      onClick={async (e) => {
        if (!props.onClick) return;

        const promise = props.onClick(e);
        if (isPromise(promise)) {
          // console.log('Button click isPromise');
          try {
            const result = await promise;
            props.onAfterClick?.(result ? 1 : 0);
            // console.log('onAfterClick');
            // console.log(result ? 1 : 0);
          } catch (e) {
            props.onAfterClick?.(0);
            throw e;
          }
        }
        // console.log('Button click');
        // console.log(others);
      }}
    >
      {children}
    </IonButton>
  );
}
