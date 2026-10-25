import { Box, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import { Platform, TextInput, TextInputInstance } from 'react-native';

export type SearchFieldProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (value: string) => void;
  size?: 'sm' | 'md';
};

export const SearchField = ({ label, placeholder, value, onChangeText, size = 'md' }: SearchFieldProps) => {
  const { text, color, radius, spacingValue } = useTheme();
  const inputRef = React.useRef<TextInputInstance>(null);

  React.useEffect(() => {
    if (Platform.OS !== 'web') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Box display="flex" gap="1W">
      {label ? <Typography style={text['Corps de texte'].XS.CapsBold}>{label}</Typography> : null}
      <TextInput
        ref={inputRef}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={color.light.text['mention-grey']}
        autoCapitalize="none"
        autoCorrect={false}
        style={{
          borderWidth: 1,
          borderColor: color.light.border['default-grey'],
          borderRadius: radius('md'),
          paddingVertical: size === 'sm' ? spacingValue('1,5V') : spacingValue('1W'),
          paddingHorizontal: spacingValue('2W'),
          backgroundColor: color.light.background['default-grey'],
          color: color.light.text['default-grey'],
          ...(size === 'sm' ? text['Corps de texte'].SM.Regular : text['Corps de texte'].MD.Regular),
        }}
      />
    </Box>
  );
};
