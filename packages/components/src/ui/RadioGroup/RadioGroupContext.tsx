import React from 'react';

export type RadioGroupCtx = {
  value?: string;
  disabled?: boolean;
  onChange?: (v: string) => void;
};

export const RadioGroupContext = React.createContext<RadioGroupCtx>({});
export const useRadioGroup = () => React.useContext(RadioGroupContext);
