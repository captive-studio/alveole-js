import { Box, Card, Page, Section, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import { Pressable, useWindowDimensions } from 'react-native';

export type ThemeConstantsScreenProps = {
  constants: Record<string, unknown>;
  title?: string;
  description?: string;
  onSelectConstant?: (entry: { name: string; value: unknown }) => void;
};

export const ThemeConstantsScreen = ({
  constants,
  title = 'UI Kit - Constants',
  description = 'Theme constants',
  onSelectConstant,
}: ThemeConstantsScreenProps) => {
  const { text } = useTheme();
  const { width } = useWindowDimensions();
  const columns = width >= 1200 ? 3 : width >= 768 ? 2 : 1;

  const entries = React.useMemo(
    () =>
      Object.entries(constants)
        .filter(([, value]) => typeof value === 'object' && value != null)
        .sort((left, right) => left[0].localeCompare(right[0])),
    [constants],
  );

  return (
    <Page scrollable title={title} description={description}>
      <Section withPaddingY>
        <Box display="flex" flexDirection="row" flexWrap="wrap" gap={16}>
          {entries.map(([name, value]) => (
            <Box key={name} width={columns === 1 ? '100%' : columns === 2 ? '48%' : '31%'}>
              <Pressable onPress={onSelectConstant ? () => onSelectConstant({ name, value }) : undefined}>
                <Card>
                  <Card.Section p={'100'}>
                    <Typography style={text.Titres['H5 - XS']}>{name}</Typography>
                  </Card.Section>
                </Card>
              </Pressable>
            </Box>
          ))}
        </Box>
      </Section>
    </Page>
  );
};
