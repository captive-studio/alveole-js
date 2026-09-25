import { LayoutChangeEvent, Pressable } from 'react-native';
import { Typography } from '../../core/Typography';
import type { SelectOption } from './Select.types';
import { SelectItem } from './SelectItem';
import { useStyles } from './SelectList.styles';

export type SelectOptionRowProps = {
  option: SelectOption;
  /** Titre du groupe que cette option ouvre, quand elle en ouvre un. */
  groupHeader?: string;
  selected: boolean;
  multiple?: boolean;
  onPress: (value: string) => void;
  onSelectedLayout: (event: LayoutChangeEvent) => void;
};

/** Une ligne du panneau : son en-tete de groupe eventuel, et l'option pressable elle-meme. */
export const SelectOptionRow = ({
  option,
  groupHeader,
  selected,
  multiple,
  onPress,
  onSelectedLayout,
}: SelectOptionRowProps) => {
  const styles = useStyles();

  return (
    <>
      {groupHeader && <Typography style={styles.groupHeader}>{groupHeader}</Typography>}

      <Pressable
        testID={`select-option-${option.value}`}
        accessibilityRole={multiple ? 'checkbox' : 'button'}
        accessibilityState={
          multiple
            ? { disabled: Boolean(option.disabled), checked: selected }
            : { disabled: Boolean(option.disabled), selected }
        }
        disabled={option.disabled}
        onPress={() => onPress(option.value)}
        onLayout={selected ? onSelectedLayout : undefined}
      >
        <SelectItem
          label={option.label}
          icon={option.icon}
          selected={selected}
          disabled={option.disabled}
          multiple={multiple}
        />
      </Pressable>
    </>
  );
};
