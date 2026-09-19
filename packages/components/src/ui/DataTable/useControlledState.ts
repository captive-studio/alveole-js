import React from 'react';

/**
 * État contrôlé si `controlledValue` est fourni (jamais `undefined`), sinon géré en interne.
 * Utilisé deux fois à l'identique dans `DataTable` (sélection, tri) : extrait pour éviter la
 * duplication du même arbitrage contrôlé/non contrôlé.
 */
export const useControlledState = <T>(
  controlledValue: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
): [T, (value: T) => void] => {
  const [internalValue, setInternalValue] = React.useState<T>(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const setValue = (next: T) => {
    onChange?.(next);
    if (controlledValue === undefined) setInternalValue(next);
  };

  return [value, setValue];
};
