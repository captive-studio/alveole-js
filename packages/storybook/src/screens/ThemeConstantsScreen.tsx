import { Box, Card, Page, PageHeader, Section, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import { Pressable, useWindowDimensions } from 'react-native';
import { screenContent } from '../styles';
import { getConstantEntries } from '../utils';

export type ThemeConstantsScreenProps = {
  constants: Record<string, unknown>;
  title?: string;
  description?: string;
  beforeContent?: React.ReactNode;
  sidebar?: React.ReactNode;
  footerContent?: React.ReactNode;
  onSelectConstant?: (entry: { name: string; value: unknown }) => void;
};

export const ThemeConstantsScreen = ({
  constants,
  title = 'UI Kit - Constants',
  description = 'Theme constants',
  beforeContent,
  sidebar,
  footerContent,
  onSelectConstant,
}: ThemeConstantsScreenProps) => {
  const { text } = useTheme();
  const { width } = useWindowDimensions();
  const columns = width >= 1200 ? 3 : width >= 768 ? 2 : 1;

  const entries = React.useMemo(() => getConstantEntries(constants), [constants]);

  return (
    <Page
      scrollable
      title={title}
      description={description}
      sidebar={sidebar}
      beforeContent={beforeContent}
      footerContent={footerContent}
    >
      <Box {...screenContent}>
        <Section withPaddingY={false}>
          <PageHeader title={title} />
        </Section>
        <Section withPaddingY={false}>
          <Box display="flex" flexDirection="row" flexWrap="wrap" gap={16}>
            {entries.map(([name, value]) => (
              <Box key={name} width={columns === 1 ? '100%' : columns === 2 ? '48%' : '31%'}>
                <Pressable
                  accessibilityRole="button"
                  onPress={onSelectConstant ? () => onSelectConstant({ name, value }) : undefined}
                >
                  <Card>
                    <Box p={'100'}>
                      <Typography style={text.Titres['H5 - XS']}>{name}</Typography>
                    </Box>
                  </Card>
                </Pressable>
              </Box>
            ))}
          </Box>
        </Section>
      </Box>
    </Page>
  );
};
