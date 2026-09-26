import type { GroupBase, Props as ReactSelectProps } from 'react-select';
import type { SelectOption, SelectProps } from './Select.types';
import { emitSelectChange } from './selectValue';

type Group = GroupBase<SelectOption>;

export type SelectFieldPropsParams = {
  props: SelectProps;
  multiple: boolean;
  /** Options retenues, dans l'ordre de `value`. */
  selectedOptions: SelectOption[];
  /** Options proposées, déjà regroupées pour react-select. */
  groupedOptions: SelectOption[] | Group[];
  styles: ReactSelectProps<SelectOption, boolean, Group>['styles'];
  components: ReactSelectProps<SelectOption, boolean, Group>['components'];
  onSearch: (query: string) => void;
  loadingMessage: string;
  emptyMessage: string;
};

/**
 * Traduit les props du design system en configuration react-select. Extrait du
 * composant pour le garder sous le cliquet de complexité : c'est ici que se
 * concentrent tous les défauts et tous les branchements du mode.
 */
export const selectFieldProps = (params: SelectFieldPropsParams): ReactSelectProps<SelectOption, boolean, Group> => {
  const { props, multiple, selectedOptions, groupedOptions, styles, components, onSearch } = params;
  const { placeholder, clearable, disabled, searchable, localFilter, loading, onFocus, onBlur } = props;

  return {
    value: multiple ? selectedOptions : (selectedOptions[0] ?? null),
    options: groupedOptions,
    styles,
    components,
    placeholder: placeholder ?? '',
    isMulti: multiple,
    isSearchable: searchable ?? false,
    isClearable: clearable,
    isDisabled: disabled,
    isLoading: loading,
    isOptionDisabled: option => option.disabled === true,
    closeMenuOnSelect: !multiple,
    // Les options déjà retenues restent listées, comme dans le bottom sheet.
    hideSelectedOptions: false,
    filterOption: localFilter === false ? () => true : undefined,
    loadingMessage: () => params.loadingMessage,
    noOptionsMessage: () => params.emptyMessage,
    // Le garde écarte les réinitialisations émises à la fermeture du menu, qui
    // relanceraient une recherche distante avec une saisie vide.
    onInputChange: (input, meta) => {
      if (meta.action === 'input-change') onSearch(input);
    },
    onFocus: () => onFocus?.(),
    onBlur: () => onBlur?.(),
    onChange: selected => {
      const retenues = Array.isArray(selected) ? selected : selected ? [selected as SelectOption] : [];
      emitSelectChange(
        props,
        retenues.map(option => option.value),
      );
    },
  };
};
