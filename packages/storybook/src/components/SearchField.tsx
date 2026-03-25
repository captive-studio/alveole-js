import { Box, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import { TextInput } from 'react-native';

export type SearchFieldProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (value: string) => void;
};

export const SearchField = ({ label, placeholder, value, onChangeText }: SearchFieldProps) => {
  const { text, color, radius, spacing } = useTheme();

  return (
    <Box display="flex" gap={8}>
      <Typography style={text['Corps de texte'].XS.CapsBold}>{label}</Typography>
      <TextInput
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
          paddingVertical: spacing('1W'),
          paddingHorizontal: spacing('2W'),
          backgroundColor: color.light.background['default-grey'],
          color: color.light.text['default-grey'],
          ...text['Corps de texte'].MD.Regular,
        }}
      />
    </Box>
  );
};
