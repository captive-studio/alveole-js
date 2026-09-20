import type { StylesConfig } from 'react-select';
import type { SelectMultipleOption } from './SelectMultiple';
import type { useStyles } from './SelectMultiple.styles';
import { selectMultipleControlStyle } from './selectMultipleControlStyle';

/**
 * La feuille de style que react-select attend. C'est une donnee, pas du rendu : la garder dans
 * le corps du composant en occupait la moitie et la recreait a chaque rendu.
 */
export const selectMultipleStylesConfig = (
  styles: ReturnType<typeof useStyles>,
  couleurs: { placeholder: string },
  caption: { error?: string; success?: string },
): StylesConfig<SelectMultipleOption, true> => ({
  control: (s, p) => ({
    ...s,
    ...selectMultipleControlStyle(styles, {
      isDisabled: p.isDisabled,
      isFocused: p.isFocused,
      error: caption.error,
      success: caption.success,
    }),
  }),
  valueContainer: s => ({ ...s, ...styles.valueContainer, padding: '0 8px' }),
  placeholder: s => ({ ...s, color: couleurs.placeholder }),
  multiValue: (s, p) => ({ ...s, ...styles.multiValue, ...(p.isDisabled ? styles.multiValueDisabled : {}) }),
  multiValueRemove: (s, p) => ({
    ...s,
    ':hover': styles.multiValueRemoveHover,
    ...(p.isDisabled ? styles.multiValueRemoveDisabled : {}),
  }),
  dropdownIndicator: s => ({ ...s, ...styles.dropdownIndicator }),
  indicatorSeparator: () => ({ display: 'none' }),
  clearIndicator: s => ({ ...s, ...styles.clearIndicator }),
});
