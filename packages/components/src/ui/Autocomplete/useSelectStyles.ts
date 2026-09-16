import { useTheme } from '@alveole/theme';
import { GroupBase, StylesConfig } from 'react-select';
import { useStyles } from './Autocomplete.styles';
import { AutocompleteOption } from './Autocomplete.types';

/**
 * Traduit les styles du systeme de design vers la forme que `react-select` attend.
 *
 * La bibliotheque ne se style pas par feuille CSS mais par une fonction par partie, chacune
 * recevant les styles qu'elle aurait pris par defaut. Ce pont est donc long par nature et sans
 * decision a prendre : le sortir du composant laisse voir ce qui, chez lui, en contient.
 */
export const useSelectStyles = (isMulti: boolean | undefined) => {
  const styles = useStyles();
  const { color, spacing } = useTheme();

  const selectStyles: StylesConfig<AutocompleteOption, true, GroupBase<AutocompleteOption>> = {
    control: (s, p) => ({
      ...s,
      ...styles.control,
      ...(p.isDisabled ? styles.controlDisabled : {}),
      boxShadow: 'none',
      outline: p.isFocused ? `2px solid ${color.light.system.focus}` : 'none',
      outlineOffset: 2,
      ':hover': { borderColor: styles.control.borderColor },
    }),
    multiValue: (s, p) => ({
      ...s,
      ...styles.multiValue,
      ...(p.isDisabled ? styles.multiValueDisabled : {}),
      ...(isMulti !== false ? {} : { padding: 0, margin: 0 }),
      ...(isMulti !== false ? {} : { backgroundColor: 'transparent', fontSize: 16 }),
    }),
    multiValueLabel: s => ({ ...s, fontSize: 14 }),
    multiValueRemove: (s, p) => ({
      ...s,
      ':hover': styles.multiValueRemoveHover,
      ...(p.isDisabled ? styles.multiValueRemoveDisabled : {}),
      ...(isMulti !== false ? {} : { display: 'none' }),
    }),
    dropdownIndicator: (s, p) => ({
      ...s,
      ...styles.dropdownIndicator,
      ...(p.isDisabled ? styles.dropdownIndicatorDisabled : {}),
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    placeholder: s => ({ ...s, color: color.light.text['mention-grey'] }),
    clearIndicator: s => ({ ...s, ...styles.clearIndicator }),
    valueContainer: s => ({
      ...s,
      ...(isMulti !== false ? { padding: '0 8px' } : {}),
    }),
    group: s => ({ ...s, paddingTop: 0, paddingBottom: 0 }),
    groupHeading: () => ({
      backgroundColor: color.light.background['disabled-grey'],
      padding: `${spacing('050')}px ${spacing('100')}px`,
      fontSize: 11,
      fontWeight: 600,
      color: color.light.text['default-grey'],
      textTransform: 'uppercase' as const,
      marginBottom: 0,
      letterSpacing: 0.5,
    }),
  };

  return selectStyles;
};
