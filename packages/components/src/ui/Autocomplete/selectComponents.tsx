import { useTheme } from '@alveole/theme';
import { components } from 'react-select';
import { LucideIcon } from '../LucideIcon';

/**
 * Remplace les deux icones de `react-select` par celles du systeme de design.
 *
 * La bibliotheque les rend en SVG inline avec ses propres traces : sans ce remplacement, la
 * croix et le chevron du champ web seraient les seules icones de tout le catalogue a ne pas
 * venir de la meme famille que les autres.
 */
export const useSelectComponents = () => {
  const { color } = useTheme();

  // `any` : `react-select` ne publie pas le type des props qu'il passe a ses propres parties.
  const MultiValueRemove = (props: any) => (
    <components.MultiValueRemove {...props}>
      <LucideIcon name="X" size="xs" color={color.light.text['default-grey']} />
    </components.MultiValueRemove>
  );

  const DropdownIndicator = (props: any) => (
    <components.DropdownIndicator {...props}>
      <LucideIcon
        name="ChevronDown"
        size="sm"
        color={props.isDisabled ? color.light.text['disabled-grey'] : color.light.text['default-grey']}
      />
    </components.DropdownIndicator>
  );

  return { MultiValueRemove, DropdownIndicator };
};
