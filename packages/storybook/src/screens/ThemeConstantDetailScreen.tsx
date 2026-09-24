import { Box, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import { EcranDeCatalogue } from '../components/EcranDeCatalogue';
import { JsonBlock } from '../components/JsonBlock';

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
  const { text } = useTheme();
  const entries = typeof value === 'object' && value != null ? Object.entries(value) : [];

  return (
    <EcranDeCatalogue
      title={name}
      description={name}
      sidebar={sidebar}
      beforeContent={beforeContent}
      footerContent={footerContent}
    >
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
    </EcranDeCatalogue>
  );
};
