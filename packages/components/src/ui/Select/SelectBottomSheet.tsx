import React from 'react';
import { LayoutChangeEvent, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import { Sheet as TamaguiSheet } from 'tamagui';
import { Typography } from '../../core/Typography';
import { BottomSheet } from '../BottomSheet';
import type { SelectOption } from './Select.types';
import { SelectItem } from './SelectItem';
import { SELECT_ROW_HEIGHT, useStyles } from './SelectList.styles';

export type SelectBottomSheetProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  options: SelectOption[];
  value: string | null;
  onSelect: (value: string | null) => void;
  clearable?: boolean;
  clearLabel?: string;
};

/** Part de la hauteur d'écran au-delà de laquelle la liste défile. */
const MAX_HEIGHT_RATIO = 0.7;

export const SelectBottomSheet = (props: SelectBottomSheetProps) => {
  const {
    open,
    setOpen,
    title,
    options,
    value,
    onSelect,
    clearable = false,
    clearLabel = 'Effacer la sélection',
  } = props;

  const styles = useStyles();
  const { height } = useWindowDimensions();

  const scrollRef = React.useRef<ScrollView>(null);
  const hasScrolledToSelection = React.useRef(false);

  // Le contenu du sheet est démonté à la fermeture : les `onLayout` se rejouent
  // à chaque ouverture, il faut donc réarmer le défilement automatique.
  React.useEffect(() => {
    if (!open) hasScrolledToSelection.current = false;
  }, [open]);

  // Déclenché par la mise en page de l'option sélectionnée uniquement : à ce
  // moment sa position est connue, alors qu'elle ne l'est pas à la première
  // frame à cause de l'animation d'ouverture du sheet.
  const handleSelectedLayout = (event: LayoutChangeEvent) => {
    if (hasScrolledToSelection.current) return;
    hasScrolledToSelection.current = true;

    const { y } = event.nativeEvent.layout;
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ y: Math.max(0, y - 2 * SELECT_ROW_HEIGHT), animated: false });
    });
  };

  const handleSelect = (nextValue: string | null) => {
    onSelect(nextValue);
    setOpen(false);
  };

  // Un en-tête n'est rendu qu'au premier élément d'une suite d'options de même groupe.
  const rows = React.useMemo(
    () =>
      options.map((option, index) => ({
        option,
        groupHeader: option.group && option.group !== options[index - 1]?.group ? option.group : undefined,
      })),
    [options],
  );

  return (
    <BottomSheet open={open} setOpen={setOpen} title={title} fitContent>
      <TamaguiSheet.ScrollView ref={scrollRef} style={{ maxHeight: height * MAX_HEIGHT_RATIO }}>
        {clearable && value != null && (
          <Pressable testID="select-clear" accessibilityRole="button" onPress={() => handleSelect(null)}>
            <SelectItem label={clearLabel} icon="X" />
          </Pressable>
        )}

        {rows.map(({ option, groupHeader }) => {
          const isSelected = option.value === value;

          return (
            <React.Fragment key={option.value}>
              {groupHeader && <Typography style={styles.groupHeader}>{groupHeader}</Typography>}

              <Pressable
                testID={`select-option-${option.value}`}
                accessibilityRole="button"
                accessibilityState={{ disabled: Boolean(option.disabled), selected: isSelected }}
                disabled={option.disabled}
                onPress={() => handleSelect(option.value)}
                onLayout={isSelected ? handleSelectedLayout : undefined}
              >
                <SelectItem label={option.label} icon={option.icon} selected={isSelected} disabled={option.disabled} />
              </Pressable>
            </React.Fragment>
          );
        })}

        {options.length === 0 && <Typography style={styles.emptyMessage}>Aucune option</Typography>}
      </TamaguiSheet.ScrollView>
    </BottomSheet>
  );
};
