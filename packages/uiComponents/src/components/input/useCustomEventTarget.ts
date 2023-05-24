import { useLatest } from 'ahooks';
import { useCallback } from 'react';

import useControllableValue from './useControllableValue';

// eslint-disable-next-line @typescript-eslint/ban-types
const isFunction = (value: unknown): value is Function => typeof value === 'function';

interface EventTarget<U> {
  target: {
    value: U;
  };
}

export interface Options<T, U> {
  initialValue?: T;
  transformer?: (value: U) => T;
  props: any;
}

function useCustomEventTarget<T, U = T>(options?: Options<T, U>) {
  const { initialValue, transformer, props } = options || {};
  const [value, setValue] = useControllableValue<T | undefined>(props, {
    defaultValue: initialValue,
  });
  const transformerRef = useLatest(transformer);

  const reset = useCallback(() => setValue(initialValue), []);

  const onChange = useCallback(
    (e: EventTarget<U>) => {
      const _value = e.target.value;
      if (isFunction(transformerRef.current)) {
        return setValue(transformerRef.current(_value));
      }
      // no transformer => U and T should be the same
      return setValue(_value as unknown as T);
    },
    [setValue, transformerRef]
  );

  return [
    value,
    {
      onChange,
      reset,
    },
  ] as const;
}

export default useCustomEventTarget;
