import { Box, Page, Section, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import { JsonBlock } from '../components/JsonBlock';

export type ThemeConstantDetailScreenProps = {
  name: string;
  value: unknown;
  beforeContent?: React.ReactNode;
};

export const ThemeConstantDetailScreen = ({ name, value, beforeContent }: ThemeConstantDetailScreenProps) => {
  const { text } = useTheme();
  const entries = typeof value === 'object' && value != null ? Object.entries(value) : [];

  return (
    <Page scrollable title={name} description={name} beforeContent={beforeContent}>
      <Section withPaddingY>
        <Box display="flex" gap={16}>
          {entries.length === 0 ? (
            <JsonBlock value={value} />
          ) : (
            entries.map(([entryName, entryValue]) => (
              <Box key={entryName} display="flex" gap={8}>
                <Typography style={text.Titres['H6 - XXS']}>{entryName}</Typography>
                <JsonBlock value={entryValue} />
              </Box>
            ))
          )}
        </Box>
      </Section>
    </Page>
  );
};
