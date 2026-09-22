import type { GroupBase, StylesConfig } from 'react-select';
import type { useStyles as useSelectStyles } from './Select.styles';
import type { SelectOption } from './Select.types';
import { selectControlStyle } from './selectControlStyle';
import { SELECT_ROW_HEIGHT, type useStyles as useListStyles } from './SelectList.styles';

type Group = GroupBase<SelectOption>;

/**
 * La feuille de style que react-select attend. C'est une donnee, pas du rendu : la garder dans
 * le corps du composant en occupait le tiers et la recreait a chaque frappe.
 *
 * Elle neutralise systematiquement ce que la bibliotheque poserait par-dessus nos composants :
 * le fond des puces appartient a l'etiquette, l'espacement des options a SelectItem.
 */
export const selectStylesConfig = (
  selectStyles: ReturnType<typeof useSelectStyles>,
  listStyles: ReturnType<typeof useListStyles>,
  caption: { error?: string; success?: string },
): StylesConfig<SelectOption, boolean, Group> => ({
  control: (base, state) => ({
    ...base,
    ...selectControlStyle(selectStyles, {
      isDisabled: state.isDisabled,
      isFocused: state.isFocused,
      error: caption.error,
      success: caption.success,
    }),
  }),
  valueContainer: base => ({ ...base, padding: 0, gap: 4, flexWrap: 'wrap' }),
  singleValue: base => ({ ...base, ...selectStyles.value, margin: 0 }),
  // La puce porte son propre fond : react-select ne doit pas le doubler.
  multiValue: () => ({ display: 'flex', margin: 0, padding: 0, backgroundColor: 'transparent' }),
  placeholder: base => ({ ...base, ...selectStyles.value, ...selectStyles.valuePlaceholder, margin: 0 }),
  input: base => ({ ...base, margin: 0, padding: 0 }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: base => ({ ...base, padding: 0 }),
  clearIndicator: base => ({ ...base, padding: 0 }),
  menu: base => ({ ...base, ...listStyles.panel, marginTop: 4, overflow: 'hidden' }),
  menuList: base => ({ ...base, padding: 0, maxHeight: SELECT_ROW_HEIGHT * 9 }),
  // Le fond et l'espacement appartiennent à SelectItem : react-select ne doit pas les doubler.
  option: () => ({ padding: 0, backgroundColor: 'transparent' }),
  group: base => ({ ...base, paddingTop: 0, paddingBottom: 0 }),
  groupHeading: () => ({ ...listStyles.groupHeader, marginBottom: 0 }),
  noOptionsMessage: base => ({ ...base, ...listStyles.emptyMessage }),
  loadingMessage: base => ({ ...base, ...listStyles.emptyMessage }),
});
