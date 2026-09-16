import { Box, Page, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import { JsonBlock } from '../components/JsonBlock';
import { PageTitle } from '../components/PageTitle';
import { ScreenZone } from '../components/ScreenZone';

export type ThemeConstantDetailScreenProps = {
  name: string;
  value: unknown;
  beforeContent?: React.ReactNode;
  sidebar?: React.ReactNode;
  footerContent?: React.ReactNode;
};

export const ThemeConstantDetailScreen = ({
  name,
  value,
  beforeContent,
  sidebar,
  footerContent,
}: ThemeConstantDetailScreenProps) => {
  const { grilles, text } = useTheme();
  const entries = typeof value === 'object' && value != null ? Object.entries(value) : [];

  return (
    <Page
      scrollable
      title={name}
      description={name}
      sidebar={sidebar}
      beforeContent={beforeContent}
      footerContent={footerContent}
    >
      <ScreenZone largeur={grilles['12 colonnes']}>
        <PageTitle title={name} />
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
      </ScreenZone>
    </Page>
  );
};
