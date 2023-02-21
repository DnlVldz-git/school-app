import React from 'react';

type InitialState = boolean | (() => boolean);

/**
 * React hook to manage boolean (on - off) states
 *
 * @param initialState the initial boolean state value
 */
const useBoolean = (initialState: InitialState = false) => {
  const [value, setValue] = React.useState<boolean>(initialState);

  const on = React.useCallback(() => {
    setValue(true);
  }, []);

  const off = React.useCallback(() => {
    setValue(false);
  }, []);

  const toggle = React.useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, { on, off, toggle }] as const;
};

export default useBoolean;
