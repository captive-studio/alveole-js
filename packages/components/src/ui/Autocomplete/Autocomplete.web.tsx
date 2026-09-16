import React from 'react';
import ReactSelect from 'react-select';
import { Box } from '../../core/Box';
import { useStyles } from './Autocomplete.styles';
import { AutocompleteProps } from './Autocomplete.types';
import { AutocompleteFrame } from './AutocompleteFrame';
import { useSelectComponents } from './selectComponents';
import { pourReactSelect } from './selectOptions';
import { useDebouncedSearch } from './useDebouncedSearch';
import { useSelectChange } from './useSelectChange';
import { useSelectStyles } from './useSelectStyles';
import { useSyncedSelection } from './useSyncedSelection';

export * from './Autocomplete.types';

export const Autocomplete = React.forwardRef<any, AutocompleteProps>(function Select(props, ref) {
  const {
    value,
    disabledFilterSearch,
    label,
    labelRight,
    hint,
    error,
    success,
    placeholder,
    disabled,
    isMulti,
    isSearchable,
    onChange,
    onSearchChange,
  } = props;

  const styles = useStyles();

  const [selectedOptions, setSelectedOptions] = useSyncedSelection(value);
  // ReactSelect tient lui-meme le texte saisi : seul le rappel differe nous interesse ici.
  const [, setSearchValue] = useDebouncedSearch(onSearchChange);

  const isGrouped = props.options.length > 0 && 'group' in props.options[0];

  // Sans `useMemo` : le compilateur React s'en charge, et le faire a la main l'en empeche.
  const options = pourReactSelect(props.options, selectedOptions, isGrouped);

  const selectStyles = useSelectStyles(isMulti);
  const { MultiValueRemove, DropdownIndicator } = useSelectComponents();

  const surChangement = useSelectChange({ isMulti, poser: setSelectedOptions, onChange, value });

  return (
    <AutocompleteFrame
      label={label}
      labelRight={labelRight}
      hint={hint}
      error={error}
      success={success}
      disabled={disabled}
      style={styles.select}
    >
      <Box tag="form-control-select-input" style={styles.inputContainer}>
        <Box style={{ ...(disabled ? styles.inputDisabled : {}) }}>
          <ReactSelect
            ref={ref}
            aria-label={label}
            value={selectedOptions}
            styles={selectStyles}
            isMulti
            placeholder={placeholder}
            options={options}
            filterOption={disabledFilterSearch ? () => true : undefined}
            isSearchable={isSearchable}
            onInputChange={inputValue => setSearchValue(inputValue)}
            noOptionsMessage={() => 'Aucun résultat'}
            onChange={surChangement}
            isDisabled={disabled}
            components={{ DropdownIndicator, MultiValueRemove }}
          />
        </Box>
      </Box>
    </AutocompleteFrame>
  );
});
