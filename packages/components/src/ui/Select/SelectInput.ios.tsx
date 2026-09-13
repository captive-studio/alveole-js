import { Picker } from '@react-native-picker/picker';
import React, { useCallback, useState } from 'react';
import { Keyboard, Modal, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box } from '../../core/Box';
import { Button } from '../Button';
import { TextInput } from '../FormControl';
import { LucideIcon } from '../LucideIcon';
import { NativePicker } from './NativePicker';
import type { SelectInputProps } from './SelectInput';

export const SelectInput = React.forwardRef<Picker<string | number | object>, SelectInputProps>(
  function SelectInput(props, ref) {
    const { value, placeholder, options, onChange, disabled, ...pickerProps } = props;
    const { bottom } = useSafeAreaInsets();

    const [model, setModel] = useState(value);
    const [open, setOpen] = useState(false);

    const handleOpenModal = () => {
      if (Keyboard.isVisible()) Keyboard.dismiss();
      if (!disabled) setOpen(true);
    };

    const handleCancel = useCallback(() => {
      setModel(value);
      setOpen(false);
    }, [value]);

    const handleValidate = useCallback(() => {
      onChange?.(model);
      setOpen(false);
    }, [model, onChange]);

    const selectedOption = React.useMemo(
      () => options.find((opt: { value: string | null }) => opt.value === value),
      [options, value],
    );

    return (
      <>
        <Modal visible={open} transparent animationType="slide" onRequestClose={handleCancel}>
          <View style={StyleSheet.absoluteFill}>
            <Box onPress={handleCancel} style={{ flex: 1 }} />
            <Box style={{ backgroundColor: '#FFFFFF', paddingBottom: bottom }}>
              <NativePicker
                ref={ref}
                {...pickerProps}
                value={model ?? null}
                placeholder={placeholder}
                options={options}
                onChange={setModel}
                disabled={false}
                style={{ flex: 1 }}
              />
              <Box style={{ paddingBottom: 8, paddingHorizontal: 12, flexDirection: 'row', gap: 12 }}>
                <Button variant="tertiary" title="Annuler" onPress={handleCancel} />
                <Button variant="primary" title="Valider" onPress={handleValidate} />
              </Box>
            </Box>
          </View>
        </Modal>

        <TextInput
          readOnly
          placeholder={placeholder}
          value={selectedOption?.label || ''}
          disabled={disabled}
          endAdornment={
            <Box onPress={handleOpenModal} mt={'auto'} mb={'auto'} mr={'075'} p={'025'}>
              <LucideIcon name="ChevronDown" size="md" />
            </Box>
          }
          onPress={handleOpenModal}
        />
      </>
    );
  },
);
