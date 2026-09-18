import { useTheme } from '@alveole/theme';
import React from 'react';
import { Keyboard, Pressable, StyleProp, ViewStyle } from 'react-native';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { FormControl, FormControlCaption, FormControlHint, FormControlLabel } from '../FormControl';
import { fieldBorderState } from '../FormControl/fieldBorderState';
import { InputHeading } from '../InputHeading';
import { LucideIcon } from '../LucideIcon';
import { useStyles } from './Select.styles';
import type { SelectProps, SelectRef } from './Select.types';
import { SelectBottomSheet } from './SelectBottomSheet';
import { SelectTag } from './SelectTag';
import { emitSelectChange, toSelectedValues, toggleSelectedValue } from './selectValue';
import { useDebouncedCallback } from './useDebouncedCallback';

/** Nombre de puces affichées avant de résumer le reste par « +N ». */
const MAX_VISIBLE_TAGS = 3;

export const Select = React.forwardRef<SelectRef, SelectProps>(function Select(props, ref) {
  const {
    label,
    labelRight,
    hint,
    error,
    success,
    disabled,
    options,
    placeholder,
    sheetTitle,
    clearable,
    searchable,
    searchPlaceholder,
    onSearchChange,
    localFilter,
    creatable,
    onCreateOption,
    createLabel,
    loading,
    loadingMessage,
    emptyMessage,
    onBlur,
    onFocus,
  } = props;

  // `multiple`, `value` et `onChange` ne sont jamais déstructurés : l'union
  // n'est discriminée que sur l'objet `props` entier.
  const values = toSelectedValues(props);

  const styles = useStyles();
  const { color } = useTheme();

  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');

  const debouncedSearchChange = useDebouncedCallback((text: string) => onSearchChange?.(text));

  // L'ordre suit celui de `value`, pas celui d'`options` : c'est la sélection
  // que l'appelant a construite.
  const selectedOptions = values
    .map(value => options.find(option => option.value === value))
    .filter(option => option != null);

  const openSheet = React.useCallback(() => {
    if (disabled) return;
    if (Keyboard.isVisible()) Keyboard.dismiss();
    setQuery('');
    setOpen(true);
    onFocus?.();
  }, [disabled, onFocus]);

  const closeSheet = React.useCallback(() => {
    setOpen(false);
    onBlur?.();
  }, [onBlur]);

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (nextOpen) openSheet();
      else closeSheet();
    },
    [closeSheet, openSheet],
  );

  React.useImperativeHandle(ref, () => ({ focus: openSheet, blur: closeSheet, open: openSheet, close: closeSheet }), [
    closeSheet,
    openSheet,
  ]);

  const handleQueryChange = (text: string) => {
    setQuery(text);
    debouncedSearchChange(text);
  };

  const removeValue = (value: string) =>
    emitSelectChange(
      props,
      values.filter(selected => selected !== value),
    );

  const iconColor = disabled ? color.light.text['disabled-grey'] : color.light.text['default-grey'];

  const visibleTags = selectedOptions.slice(0, MAX_VISIBLE_TAGS);
  const hiddenTagCount = selectedOptions.length - visibleTags.length;

  return (
    <FormControl style={styles.pickerContainer}>
      <InputHeading>
        {!!label && (
          <FormControlLabel labelRight={labelRight} label={label} disabled={disabled} error={error} success={success} />
        )}
        {!!hint && <FormControlHint hint={hint} disabled={disabled} />}
      </InputHeading>

      <Box tag="form-control-select-input" style={styles.inputContainer}>
        <Pressable
          testID="select-trigger"
          accessibilityRole="button"
          // Le lecteur d'écran annonce la sélection entière, que les puces résument.
          accessibilityLabel={
            selectedOptions.length > 0 ? `${label} : ${selectedOptions.map(o => o.label).join(', ')}` : label
          }
          accessibilityState={{ disabled: Boolean(disabled), expanded: open }}
          disabled={disabled}
          onPress={openSheet}
          // `makeStyles` produit des CSSProperties (spacing renvoie une CSS var sur web) :
          // le cast est le même que celui des autres champs, cf. FormControl/TextInput.
          style={
            {
              ...styles.inputInner,
              ...(props.multiple ? styles.inputInnerMultiple : {}),
              // Le panneau ouvert est l'etat actif du selecteur : c'est lui qui joue le
              // role du focus, et qui passe donc devant l'erreur et le succes.
              ...fieldBorderState(styles, { disabled, focus: open, error, success }),
            } as StyleProp<ViewStyle>
          }
        >
          {props.multiple ? (
            selectedOptions.length === 0 ? (
              <Typography style={{ ...styles.value, ...styles.valuePlaceholder }}>{placeholder ?? ''}</Typography>
            ) : (
              <Box style={styles.tagList}>
                {visibleTags.map(option => (
                  <SelectTag
                    key={option.value}
                    label={option.label}
                    icon={option.icon}
                    onRemove={disabled ? undefined : () => removeValue(option.value)}
                  />
                ))}
                {hiddenTagCount > 0 && <SelectTag label={`+${hiddenTagCount}`} />}
              </Box>
            )
          ) : (
            <>
              {selectedOptions[0]?.icon && <LucideIcon size="sm" name={selectedOptions[0].icon} color={iconColor} />}

              <Typography
                style={{
                  ...styles.value,
                  ...(selectedOptions[0] ? {} : styles.valuePlaceholder),
                  ...(disabled ? styles.valueDisabled : {}),
                }}
              >
                {selectedOptions[0]?.label ?? placeholder ?? ''}
              </Typography>
            </>
          )}

          <LucideIcon size="sm" name="ChevronDown" color={iconColor} />
        </Pressable>
      </Box>

      {(error || success) && <FormControlCaption error={error} success={success} />}

      <SelectBottomSheet
        open={open}
        setOpen={handleOpenChange}
        title={sheetTitle ?? label}
        options={options}
        values={values}
        multiple={props.multiple}
        onSelect={value => emitSelectChange(props, toggleSelectedValue(props, value))}
        onClear={() => emitSelectChange(props, [])}
        clearable={clearable}
        searchable={searchable}
        searchPlaceholder={searchPlaceholder}
        query={query}
        onQueryChange={handleQueryChange}
        localFilter={localFilter}
        creatable={creatable}
        onCreate={onCreateOption}
        createLabel={createLabel}
        loading={loading}
        loadingMessage={loadingMessage}
        emptyMessage={emptyMessage}
      />
    </FormControl>
  );
});
