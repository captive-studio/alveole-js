import React from 'react';
import { FormControlCaption, FormControlHintProps, FormControlLabel, FormControlLabelProps } from '../FormControl';

export type ChangeMeta = {
  added: AutocompleteOption[];
  removed: AutocompleteOption[];
  created: AutocompleteOption[];
};

export type AutocompleteOptionWithoutGroup = {
  value: string;
  label: string;
  __created?: boolean;
};
export type AutocompleteOptionWithGroup = {
  value: string;
  label: string;
  __created?: boolean;
  group: string;
};
export type AutocompleteOption = AutocompleteOptionWithoutGroup | AutocompleteOptionWithGroup;

export const isAutocompleteOptionWithGroup = (
  option: AutocompleteOption | undefined | null,
): option is AutocompleteOptionWithGroup => {
  return option != null && typeof option === 'object' && 'group' in option && typeof option.group === 'string';
};
export const isAutocompleteOptionWithGroupArray = (
  options: AutocompleteOption[],
): options is AutocompleteOptionWithGroup[] => {
  return options.every(isAutocompleteOptionWithGroup);
};

export type AutocompleteProps = React.ComponentProps<typeof FormControlLabel> &
  FormControlLabelProps &
  FormControlHintProps &
  React.ComponentProps<typeof FormControlCaption> & {
    value?: AutocompleteOption[];
    options: AutocompleteOptionWithoutGroup[] | AutocompleteOptionWithGroup[];
    placeholder?: string;
    isMulti?: boolean;
    allowEmpty?: boolean;
    isSearchable?: boolean;
    autoFocus?: boolean;
    disabledSearch?: boolean;
    disabledFilterSearch?: boolean;
    onChange?: (value: AutocompleteOption[], meta?: ChangeMeta) => void;
    onSearchChange?: (value: string) => void;
    allowCreate?: boolean;
    onCreateOption?: (created: AutocompleteOption) => void;
    createOptionLabel?: (input: string) => string;
    createOptionValue?: (input: string) => string;
  };
