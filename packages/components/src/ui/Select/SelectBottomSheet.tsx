import React from 'react';
import { InteractionManager, LayoutChangeEvent, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import { Sheet as TamaguiSheet } from 'tamagui';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { BottomSheet } from '../BottomSheet';
import { Button } from '../Button';
import { TextInputElement } from '../FormControl';
import { TextField } from '../TextField';
import type { SelectOption } from './Select.types';
import { SelectItem } from './SelectItem';
import { SELECT_ROW_HEIGHT, useStyles } from './SelectList.styles';
import { textesDuPanneau } from './selectReglages';
import { useSelectOptions } from './useSelectOptions';

export type SelectBottomSheetProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  options: SelectOption[];
  /** Toujours un tableau : `Select` normalise le mono en zéro ou une valeur. */
  values: string[];
  multiple?: boolean;
  onSelect: (value: string) => void;
  onClear: () => void;
  clearable?: boolean;
  clearLabel?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  query: string;
  onQueryChange: (query: string) => void;
  localFilter?: boolean;
  creatable?: boolean;
  onCreate?: (query: string) => void;
  createLabel?: (query: string) => string;
  loading?: boolean;
  loadingMessage?: string;
  emptyMessage?: string;
};

/** Part de la hauteur d'écran au-delà de laquelle la liste défile. */
const MAX_HEIGHT_RATIO = 0.7;

export const SelectBottomSheet = (props: SelectBottomSheetProps) => {
  const {
    open,
    setOpen,
    title,
    options,
    values,
    multiple,
    onSelect,
    onClear,
    clearable,
    searchable,
    query,
    onQueryChange,
    localFilter,
    creatable,
    onCreate,
    loading,
  } = props;

  const { clearLabel, searchPlaceholder, loadingMessage, emptyMessage, createLabel } = textesDuPanneau(props);

  const styles = useStyles();
  const { height } = useWindowDimensions();

  const scrollRef = React.useRef<ScrollView>(null);
  const searchRef = React.useRef<TextInputElement>(null);
  const hasScrolledToSelection = React.useRef(false);

  const { rows, canCreate } = useSelectOptions({ options, query, localFilter, creatable });

  // Le contenu du sheet est démonté à la fermeture : les `onLayout` se rejouent
  // à chaque ouverture, il faut donc réarmer le défilement automatique. Un
  // changement de recherche ne le réarme pas, sinon la liste sauterait à chaque frappe.
  React.useEffect(() => {
    if (!open) hasScrolledToSelection.current = false;
  }, [open]);

  // Le focus n'est pris qu'une fois l'animation d'ouverture terminée : pendant
  // celle-ci le champ n'est pas encore mesuré et le clavier se referme aussitôt.
  React.useEffect(() => {
    if (!open || !searchable) return;
    const task = InteractionManager.runAfterInteractions(() => searchRef.current?.focus());
    return () => task.cancel();
  }, [open, searchable]);

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

  // En multi le panneau reste ouvert : la sélection se construit par touches
  // successives et se valide par le bouton de l'en-tête.
  const handleSelect = (value: string) => {
    onSelect(value);
    if (!multiple) setOpen(false);
  };

  const handleClear = () => {
    onClear();
    if (!multiple) setOpen(false);
  };

  const handleCreate = () => {
    onCreate?.(query.trim());
    onQueryChange('');
    if (!multiple) setOpen(false);
  };

  return (
    <BottomSheet
      open={open}
      setOpen={setOpen}
      title={title}
      fitContent
      moveOnKeyboardChange={searchable}
      action={
        multiple ? (
          <Button testID="select-validate" title="Valider" size="sm" variant="primary" onPress={() => setOpen(false)} />
        ) : undefined
      }
    >
      {searchable && (
        <Box pl="2W" pr="2W" pb="1W">
          <TextField
            ref={searchRef}
            testID="select-search"
            label=""
            accessibilityLabel="Rechercher"
            value={query}
            onChangeText={onQueryChange}
            placeholder={searchPlaceholder}
          />
        </Box>
      )}

      <TamaguiSheet.ScrollView
        ref={scrollRef}
        keyboardShouldPersistTaps="handled"
        style={{ maxHeight: height * MAX_HEIGHT_RATIO }}
      >
        {canCreate && (
          <Pressable testID="select-create" accessibilityRole="button" onPress={handleCreate}>
            <SelectItem label={createLabel(query.trim())} icon="Plus" />
          </Pressable>
        )}

        {clearable && values.length > 0 && (
          <Pressable testID="select-clear" accessibilityRole="button" onPress={handleClear}>
            <SelectItem label={clearLabel} icon="X" />
          </Pressable>
        )}

        {rows.map(({ option, groupHeader }) => {
          const isSelected = values.includes(option.value);

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
                <SelectItem
                  label={option.label}
                  icon={option.icon}
                  selected={isSelected}
                  disabled={option.disabled}
                  multiple={multiple}
                />
              </Pressable>
            </React.Fragment>
          );
        })}

        {rows.length === 0 && !canCreate && (
          <Typography style={styles.emptyMessage}>{loading ? loadingMessage : emptyMessage}</Typography>
        )}
      </TamaguiSheet.ScrollView>
    </BottomSheet>
  );
};
