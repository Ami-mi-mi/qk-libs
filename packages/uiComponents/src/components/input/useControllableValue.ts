import { useLatest, useMemoizedFn, useUpdate, useUpdateEffect } from 'ahooks';
import { useMemo, useRef } from 'react';

import type { SetStateAction } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
const isFunction = (value: unknown): value is Function => typeof value === 'function';

export interface Options<T> {
  defaultValue?: T;
  defaultValuePropName?: string;
  valuePropName?: string;
  trigger?: string;
}

export type Props = Record<string, any>;

export interface StandardProps<T> {
  value: T;
  defaultValue?: T;
  onChange: (val: T) => void;
}

function useControllableValue<T = any>(
  props: StandardProps<T>
): [T, (v: SetStateAction<T>) => void];
function useControllableValue<T = any>(
  props?: Props,
  options?: Options<T>
): [T, (v: SetStateAction<T>, ...args: any[]) => void];
function useControllableValue<T = any>(props: Props = {}, options: Options<T> = {}) {
  const {
    defaultValue,
    defaultValuePropName = 'defaultValue',
    valuePropName = 'value',
    trigger = 'onChange',
  } = options;

  const value = props[valuePropName] as T;
  // eslint-disable-next-line no-prototype-builtins
  const isControlled = props.hasOwnProperty(valuePropName);

  const initialValue = useMemo(() => {
    if (isControlled) {
      return value;
    }
    // eslint-disable-next-line no-prototype-builtins
    if (props.hasOwnProperty(defaultValuePropName)) {
      return props[defaultValuePropName] || defaultValue;
    }
    return defaultValue;
  }, [defaultValue, defaultValuePropName, isControlled, props, value]);

  const stateRef = useRef(initialValue);
  if (isControlled) {
    stateRef.current = value;
  }

  const update = useUpdate();

  useUpdateEffect(() => {
    // 当 defaultValue 改变时会导致 initialValue 不会及时更新
    if (!isControlled) {
      stateRef.current = initialValue;
      update();
    }
  }, [initialValue]);

  function setState(v: SetStateAction<T>, ...args: any[]) {
    const r = isFunction(v) ? v(stateRef.current) : v;

    if (!isControlled) {
      stateRef.current = r;
      update();
    }
    if (props[trigger]) {
      props[trigger](r, ...args);
    }
  }

  return [stateRef.current, useMemoizedFn(setState)] as const;
}

export default useControllableValue;
