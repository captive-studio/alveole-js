import React from 'react';
import { useFieldLabel } from '../FormControl/FieldId';
import type { SelectProps, SelectRef } from './Select.types';
import { SelectBottomSheet } from './SelectBottomSheet';
import { SelectTrigger } from './SelectTrigger';
import { emitSelectChange, toSelectedValues, toggleSelectedValue } from './selectValue';
import { usePanneauSelect } from './usePanneauSelect';

export const Select = React.forwardRef<SelectRef, SelectProps>(function Select(props, ref) {
  const { options, placeholder, sheetTitle, disabled, error, success } = props;

  // `multiple`, `value` et `onChange` ne sont jamais déstructurés : l'union
  // n'est discriminée que sur l'objet `props` entier.
  const values = toSelectedValues(props);

  const label = useFieldLabel();
  const panneau = usePanneauSelect(props, ref);

  // L'ordre suit celui de `value`, pas celui d'`options` : c'est la sélection
  // que l'appelant a construite.
  const selectedOptions = values
    .map(value => options.find(option => option.value === value))
    .filter(option => option != null);

  const publier = (suivantes: string[]) => emitSelectChange(props, suivantes);

  return (
    <>
      <SelectTrigger
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        error={error}
        success={success}
        open={panneau.open}
        multiple={props.multiple}
        selectedOptions={selectedOptions}
        onPress={panneau.ouvrir}
        onRemoveValue={disabled ? undefined : value => publier(values.filter(retenue => retenue !== value))}
      />

      <SelectBottomSheet
        {...props}
        open={panneau.open}
        setOpen={panneau.setOpen}
        title={sheetTitle ?? label ?? ''}
        values={values}
        multiple={props.multiple}
        onSelect={value => publier(toggleSelectedValue(props, value))}
        onClear={() => publier([])}
        query={panneau.query}
        onQueryChange={panneau.onQueryChange}
        onCreate={props.onCreateOption}
      />
    </>
  );
});
