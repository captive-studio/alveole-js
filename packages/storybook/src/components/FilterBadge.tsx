import { Box, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import { Pressable } from 'react-native';

export type FilterBadgeProps = {
  active: boolean;
  label: string;
  onPress: () => void;
};

export const FilterBadge = ({ active, label, onPress }: FilterBadgeProps) => {
  const { color, radius, text, spacing } = useTheme();

  return (
    <Pressable onPress={onPress}>
      <Box
        borderColor={active ? color.light.border['action-low-primary'] : color.light.border['default-grey']}
        borderRadius={radius('full')}
        borderWidth={1}
        p={'000'}
        style={{
          backgroundColor: active ? color.light.background['contrast-info'] : color.light.background['default-grey'],
          paddingLeft: spacing('1W'),
          paddingRight: spacing('1W'),
          paddingTop: spacing('0,5V'),
          paddingBottom: spacing('0,5V'),
        }}
      >
        <Typography
          style={[
            text['Corps de texte'].XS.CapsBold,
            {
              color: active ? color.light.text['default-info'] : color.light.text['default-grey'],
            },
          ]}
        >
          {label}
        </Typography>
      </Box>
    </Pressable>
  );
};
