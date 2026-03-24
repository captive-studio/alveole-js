import { Box, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';

export type JsonBlockProps = {
  value: unknown;
};

export const JsonBlock = ({ value }: JsonBlockProps) => {
  const { text, color, radius } = useTheme();

  return (
    <Box
      backgroundColor={color.light.background['alt-grey']}
      borderColor={color.light.border['plain-grey']}
      borderRadius={radius('md')}
      borderWidth={1}
      p={'100'}
      width={'100%'}
    >
      <Typography
        style={[
          text['Corps de texte'].SM.Regular,
          {
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap',
          },
        ]}
      >
        {typeof value === 'string' ? value : JSON.stringify(value, null, 2)}
      </Typography>
    </Box>
  );
};
