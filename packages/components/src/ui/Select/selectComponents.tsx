import { useTheme } from '@alveole/theme';
import {
  ClearIndicatorProps,
  components,
  DropdownIndicatorProps,
  GroupBase,
  MultiValueProps,
  OptionProps,
  SingleValueProps,
} from 'react-select';
import { LucideIcon } from '../LucideIcon';
import type { SelectOption } from './Select.types';
import { SelectItem } from './SelectItem';
import { SelectTag } from './SelectTag';

type Group = GroupBase<SelectOption>;

export type SelectComponentsParams = {
  multiple: boolean;
  disabled?: boolean;
  /** Absent quand le champ est désactivé : les puces perdent alors leur croix. */
  onRemoveValue?: (value: string) => void;
};

/**
 * Les pièces de react-select que le design system remplace. Elles vivent hors du
 * composant pour le garder sous le cliquet de complexité, et parce qu'elles ne
 * dépendent que de trois paramètres.
 */
export const useSelectComponents = ({ multiple, disabled, onRemoveValue }: SelectComponentsParams) => {
  const { color } = useTheme();

  const Option = (optionProps: OptionProps<SelectOption, boolean, Group>) => (
    <components.Option {...optionProps}>
      <SelectItem
        label={optionProps.data.label}
        icon={optionProps.data.icon}
        selected={optionProps.isSelected}
        highlighted={optionProps.isFocused}
        disabled={optionProps.isDisabled}
        multiple={multiple}
      />
    </components.Option>
  );

  const SingleValue = (singleValueProps: SingleValueProps<SelectOption, boolean, Group>) => (
    <components.SingleValue {...singleValueProps}>
      <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {singleValueProps.data.icon && (
          <LucideIcon size="sm" name={singleValueProps.data.icon} color={color.light.text['default-grey']} />
        )}
        {singleValueProps.data.label}
      </span>
    </components.SingleValue>
  );

  const MultiValue = (multiValueProps: MultiValueProps<SelectOption, boolean, Group>) => (
    <components.MultiValue {...multiValueProps}>
      <SelectTag
        label={multiValueProps.data.label}
        icon={multiValueProps.data.icon}
        onRemove={onRemoveValue && (() => onRemoveValue(multiValueProps.data.value))}
      />
    </components.MultiValue>
  );

  // La croix reste `aria-hidden`, comme react-select la pose : c'est un raccourci
  // à la souris, l'effacement au clavier passe par Retour arrière. La nommer
  // exigerait un rôle, donc un vrai bouton — ce que ce conteneur n'est pas.
  const ClearIndicator = (indicatorProps: ClearIndicatorProps<SelectOption, boolean, Group>) => (
    <components.ClearIndicator {...indicatorProps}>
      <LucideIcon name="X" size="sm" color={color.light.text['default-grey']} />
    </components.ClearIndicator>
  );

  const DropdownIndicator = (indicatorProps: DropdownIndicatorProps<SelectOption, boolean, Group>) => (
    <components.DropdownIndicator {...indicatorProps}>
      <LucideIcon
        name="ChevronDown"
        size="sm"
        color={disabled ? color.light.text['disabled-grey'] : color.light.text['default-grey']}
      />
    </components.DropdownIndicator>
  );

  // `MultiValueRemove` est neutralisé : la croix appartient à SelectTag.
  return { Option, SingleValue, MultiValue, MultiValueRemove: () => null, ClearIndicator, DropdownIndicator };
};
