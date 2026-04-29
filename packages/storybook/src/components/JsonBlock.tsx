import { Box, Highlight, HighlightProps } from '@alveole/components';

export type JsonBlockProps = {
  value: unknown;
  language?: HighlightProps['language'];
};

export const JsonBlock = ({ value, language = 'json' }: JsonBlockProps) => {
  return (
    <Box mt={'1,5V'} width={'100%'}>
      <Highlight language={language}>{typeof value === 'string' ? value : JSON.stringify(value, null, 2)}</Highlight>
    </Box>
  );
};
