import { Picker, PickerProps } from '@react-native-picker/picker';
import React from 'react';
import { SelectOption } from './Select.types';

export type NativePickerProps = Omit<PickerProps, 'value' | 'onValueChange' | 'enabled'> & {
  value: string | null;
  options: SelectOption[];
  onChange?: (value: string | null) => void;
  disabled?: boolean;
};

export const NativePicker = React.forwardRef<Picker<string | number | object>, NativePickerProps>(
  function NativePicker(props, ref) {
    const { value, options, onChange, disabled, style, ...pickerProps } = props;

    const pickerStylesProps = { themeVariant: 'light', style: style };

    const [model, setModel] = React.useState(value);

    const handleChange = (newValue?: string | number | object | null) => {
      const stringValue = newValue ? String(newValue).trim() : undefined;
      if (stringValue === '' || stringValue == null) {
        setModel(null);
        onChange?.(null);
      } else {
        onChange?.(stringValue);
        setModel(stringValue);
      }
    };

    return (
      <Picker
        ref={ref}
        selectedValue={model ?? ''}
        onValueChange={handleChange}
        enabled={!disabled}
        aria-disabled={disabled}
        {...pickerProps}
        {...pickerStylesProps}
      >
        {props.placeholder && <Picker.Item key={'select-item--undefined'} label={props.placeholder} value={''} />}

        {options.map((opt: SelectOption) => (
          <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
        ))}
      </Picker>
    );
  },
);
