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
      <Typography style={text['Corps de texte'].SM.SemiBold}>{label}</Typography>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={color.light.text['mention-grey']}
        style={{
          borderWidth: 1,
          borderColor: color.light.border['plain-grey'],
          borderRadius: radius('md'),
          paddingVertical: spacing('075'),
          paddingHorizontal: spacing('100'),
          backgroundColor: color.light.background['default-grey'],
          color: color.light.text['default-grey'],
        }}
      />
    </Box>
  );
};
