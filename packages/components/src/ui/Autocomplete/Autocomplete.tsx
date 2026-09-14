import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleProp,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Button, ButtonIcon } from '../Button';
import { Divider } from '../Divider';
import {
  FormControl,
  FormControlCaption,
  FormControlHint,
  FormControlHintProps,
  FormControlLabel,
  FormControlLabelProps,
  TextInputElement,
} from '../FormControl';
import { InputHeading } from '../InputHeading';
import { LucideIcon } from '../LucideIcon';
import { TextField } from '../TextField';
import { useStyles } from './Autocomplete.styles';
import { AutocompleteChip } from './AutocompleteChip';

type ChangeMeta = {
  added: AutocompleteOption[];
  removed: AutocompleteOption[];
  created: AutocompleteOption[];
};

export type AutocompleteOptionWithoutGroup = {
  value: string;
  label: string;
  __created?: boolean;
};
export type AutocompleteOptionWithGroup = {
  value: string;
  label: string;
  __created?: boolean;
  group: string;
};
export type AutocompleteOption = AutocompleteOptionWithoutGroup | AutocompleteOptionWithGroup;

export const isAutocompleteOptionWithGroup = (
  option: AutocompleteOption | undefined | null,
): option is AutocompleteOptionWithGroup => {
  return option != null && typeof option === 'object' && 'group' in option && typeof option.group === 'string';
};
export const isAutocompleteOptionWithGroupArray = (
  options: AutocompleteOption[],
): options is AutocompleteOptionWithGroup[] => {
  return options.every(isAutocompleteOptionWithGroup);
};

export type AutocompleteProps = React.ComponentProps<typeof FormControlLabel> &
  FormControlLabelProps &
  FormControlHintProps &
  React.ComponentProps<typeof FormControlCaption> & {
    value?: AutocompleteOption[];
    options: AutocompleteOptionWithoutGroup[] | AutocompleteOptionWithGroup[];
    placeholder?: string;
    isMulti?: boolean;
    allowEmpty?: boolean;
    isSearchable?: boolean;
    autoFocus?: boolean;
    disabledSearch?: boolean;
    disabledFilterSearch?: boolean;
    onChange?: (value: AutocompleteOption[], meta?: ChangeMeta) => void;
    onSearchChange?: (value: string) => void;
    allowCreate?: boolean;
    onCreateOption?: (created: AutocompleteOption) => void;
    createOptionLabel?: (input: string) => string;
    createOptionValue?: (input: string) => string;
  };

function useDebouncedCallback<T extends (...args: any[]) => void>(cb: T, delay = 250) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  return useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => cb(...args), delay);
    },
    [cb, delay],
  );
}

export const Autocomplete = (props: AutocompleteProps) => {
  const {
    value,
    options,
    placeholder = 'Sélectionner…',
    isMulti = true,
    disabledFilterSearch,
    disabledSearch,
    disabled,
    label,
    labelRight,
    hint,
    error,
    success,
    allowEmpty = true,
    autoFocus = true,
    onChange,
    onSearchChange,
    allowCreate = false,
    onCreateOption,
    createOptionLabel = (input: string) => `Ajouter « ${input} »`,
    createOptionValue = (input: string) => input,
  } = props;

  const styles = useStyles();
  const { top, bottom } = useSafeAreaInsets();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<AutocompleteOption[]>(value ?? []);
  const [syncedValueKey, setSyncedValueKey] = useState(() => value?.map(o => o.value).join('|') ?? '');
  const searchRef = React.useRef<TextInputElement>(null);
  const debouncedOnSearchChange = useDebouncedCallback((text: string) => onSearchChange?.(text), 500);

  const selectedIndexByValue = useMemo(() => {
    const map = new Map<string, number>();
    selected.forEach((o, i) => map.set(o.value, i));
    return map;
  }, [selected]);

  const hasExactLabel = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return options.some(o => o.label.toLowerCase() === q) || selected.some(o => o.label.toLowerCase() === q);
  }, [options, selected, query]);

  const filteredOptions = useMemo(() => {
    const base = options ?? [];
    const filtered =
      disabledFilterSearch || query.trim().length === 0
        ? base
        : base.filter(o => o.label.toLowerCase().includes(query.toLowerCase()));
    if (isMulti && isAutocompleteOptionWithGroup(filtered[0])) return filtered;
    const selInList = filtered.filter(o => selectedIndexByValue.has(o.value));
    const diff = filtered.filter(o => !selectedIndexByValue.has(o.value));
    return [...selInList, ...diff];
  }, [options, query, disabledFilterSearch, selectedIndexByValue, isMulti]);

  const byValue = (arr: AutocompleteOption[]) => {
    const map = new Map<string, AutocompleteOption>();
    arr.forEach(o => map.set(o.value, o));
    return map;
  };

  const makeMeta = (prev: AutocompleteOption[], next: AutocompleteOption[]): ChangeMeta => {
    const prevMap = byValue(prev);
    const nextMap = byValue(next);
    const added = next.filter(o => !prevMap.has(o.value));
    const removed = prev.filter(o => !nextMap.has(o.value));
    const created = added.filter(o => o.__created);
    return { added, removed, created };
  };

  const commit = (next: AutocompleteOption[]) => {
    setSelected(next);
    const meta = makeMeta(selected, next);
    onChange?.(next, meta);
  };

  const toggleOption = (opt: AutocompleteOption) => {
    if (!isMulti) {
      commit([opt]);
      setOpen(false);
      return;
    }
    const exists = selectedIndexByValue.has(opt.value);
    const next = exists ? selected.filter(o => o.value !== opt.value) : [...selected, opt];
    commit(next);
  };

  const onPressInput = () => {
    if (disabled) return;
    setQuery('');
    setOpen(true);
    if (autoFocus) setTimeout(() => searchRef.current?.focus(), 250);
  };

  const handleSearchChange = (text: string) => {
    setQuery(text);
    debouncedOnSearchChange(text);
  };

  const handleCreateFromQuery = () => {
    const label = query.trim();
    if (!label) return;
    const created: AutocompleteOption = {
      value: createOptionValue(label),
      label,
      __created: true,
    };
    const next = isMulti ? [...selected, created] : [created];
    commit(next);
    onCreateOption?.(created);
    if (!isMulti) setOpen(false);
    setQuery('');
  };

  const { width } = useWindowDimensions();

  const renderChipConstrained = (opt: AutocompleteOption) => (
    <AutocompleteChip
      key={opt.value}
      isMulti={isMulti}
      label={opt.label}
      onToggle={() => toggleOption(opt)}
      maxWidth={Math.round(width * 0.65)}
    />
  );

  const currentValueKey = value?.map(o => o.value).join('|') ?? '';
  if (syncedValueKey !== currentValueKey) {
    setSyncedValueKey(currentValueKey);
    setSelected(value ?? []);
  }

  return (
    <FormControl>
      <InputHeading>
        {!!label && (
          <FormControlLabel labelRight={labelRight} label={label} disabled={disabled} error={error} success={success} />
        )}
        {!!hint && <FormControlHint hint={hint} disabled={disabled} />}
      </InputHeading>

      <Pressable accessibilityRole="button" onPress={onPressInput} disabled={disabled} style={styles.input}>
        <Box style={styles.inputInner}>
          {selected.length === 0 ? (
            <Typography style={styles.inputPlaceholder}>{placeholder}</Typography>
          ) : (
            <Box display="flex" flexDirection="row" gap={'050'} flexWrap="wrap">
              {selected.map(renderChipConstrained)}
            </Box>
          )}

          <LucideIcon name="ChevronDown" size="sm" style={styles.autocompleteIcon} />
        </Box>
      </Pressable>

      {(error || success) && <FormControlCaption error={error} success={success} />}

      <Modal visible={open} animationType="fade" transparent onRequestClose={() => setOpen(false)}>
        <KeyboardAvoidingView
          behavior={Platform.select({ ios: 'padding', android: undefined })}
          style={{ ...styles.modalOverlay, flex: 1, paddingTop: top }}
        >
          <Box style={{ ...styles.modalContent }}>
            <Box tag="modal-header" style={styles.modalHeader}>
              <Typography style={styles.nativeLabel}>{label ?? 'Sélection'}</Typography>
              <Box ml={'auto'} mr="100">
                <ButtonIcon icon="Check" variant="primary" onPress={() => setOpen(false)} />
              </Box>
            </Box>

            <Divider mt={'050'} mb={'050'} />

            {!isMulti && (
              <Box pl="100" pr="100">
                {selected.length > 0 && (
                  <Box mt={'auto'}>
                    <Box display="flex" pl={'100'} flexDirection="row" gap={'050'}>
                      <LucideIcon name="Check" size="md" style={{ margin: 'auto' }} />
                      <Typography mr={48} mt={4} style={styles.nativeSimpleValue}>
                        {selected[0]?.label}
                      </Typography>
                    </Box>

                    {allowEmpty && (
                      <>
                        <Box display="flex" flexDirection="row" justify={'flex-end'} mt={'050'}>
                          <Button
                            noPadding
                            title="Effacer"
                            size="md"
                            variant="tertiary"
                            endIcon={'Trash'}
                            onPress={() => commit([])}
                          />
                        </Box>
                        {disabledSearch && <Divider mt={'050'} />}
                      </>
                    )}
                  </Box>
                )}
              </Box>
            )}

            {!disabledSearch && (
              <Box pl="100" pr="100" pb="100">
                <TextField
                  ref={searchRef}
                  label=""
                  value={query}
                  onChangeText={handleSearchChange}
                  placeholder={placeholder ?? 'Rechercher…'}
                  editable={!disabledFilterSearch}
                />
              </Box>
            )}

            {allowCreate && query.trim().length > 0 && !hasExactLabel && (
              <Pressable
                accessibilityRole="button"
                onPress={handleCreateFromQuery}
                style={styles.nativeItem as StyleProp<ViewStyle>}
              >
                <Box display="flex" flexDirection="row" gap={'050'}>
                  <LucideIcon name="Plus" size="md" />
                  <Typography style={styles.nativeItemTextNew}>{createOptionLabel(query.trim())}</Typography>
                </Box>
              </Pressable>
            )}

            {filteredOptions.length === 0 ? (
              allowCreate && query.trim().length > 0 && !hasExactLabel ? null : (
                <Box pl="100" pr="100">
                  <Typography>Aucun résultat</Typography>
                </Box>
              )
            ) : (
              <FlashList
                data={filteredOptions}
                keyExtractor={item => item.value}
                keyboardShouldPersistTaps="handled"
                ItemSeparatorComponent={Divider}
                contentContainerStyle={{ paddingBottom: bottom }}
                renderItem={({ item, index }) => {
                  const isSelected = selectedIndexByValue.has(item.value);
                  const prevItem = filteredOptions[index - 1];
                  const showGroupHeader =
                    isAutocompleteOptionWithGroup(item) &&
                    (!isAutocompleteOptionWithGroup(prevItem) || prevItem.group !== item.group);
                  return (
                    <>
                      {showGroupHeader && <Typography style={styles.groupHeader}>{item.group}</Typography>}
                      <Pressable
                        accessibilityRole="button"
                        onPress={() => toggleOption(item)}
                        style={{
                          ...(styles.nativeItem as ViewStyle),
                          backgroundColor: isSelected
                            ? styles.nativeItemSelected.backgroundColor
                            : styles.nativeItem.backgroundColor,
                        }}
                      >
                        <Box display="flex" flexDirection="row" justify="space-between">
                          <Typography style={styles.nativeItemText}>{item.label}</Typography>
                          {isSelected && <LucideIcon name="Check" size="sm" />}
                        </Box>
                      </Pressable>
                    </>
                  );
                }}
              />
            )}
          </Box>
        </KeyboardAvoidingView>
      </Modal>
    </FormControl>
  );
};
