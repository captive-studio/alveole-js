import { AnchorHeading, Box, MarkdownDescription } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import { EcranDeCatalogue } from '../components/EcranDeCatalogue';
import { INTRODUCTION_DE_MIGRATION_V2, SECTIONS_DE_MIGRATION_V2, type SectionDeMigration } from './migrationV2';

const SectionDeMigrationV2 = ({ titre, markdown }: SectionDeMigration) => {
  const { text } = useTheme();

  return (
    <Box display="flex" gap={8} mb={'400'}>
      <AnchorHeading style={text.Titres['H4 - SM']}>{titre}</AnchorHeading>
      <MarkdownDescription>{markdown}</MarkdownDescription>
    </Box>
  );
};

export type MigrationV2PageProps = {
  beforeContent?: React.ReactNode;
  sidebar?: React.ReactNode;
  footerContent?: React.ReactNode;
};

export const MigrationV2Page = ({ beforeContent, sidebar, footerContent }: MigrationV2PageProps) => {
  return (
    <EcranDeCatalogue
      title="Migration v2"
      description="Migrer une application d'Alveole 1.x vers 2.0"
      sidebar={sidebar}
      beforeContent={beforeContent}
      footerContent={footerContent}
      sommaire={SECTIONS_DE_MIGRATION_V2.map(({ titre }) => titre)}
    >
      <Box display="flex" gap={0}>
        <Box mb={'400'}>
          <MarkdownDescription>{INTRODUCTION_DE_MIGRATION_V2}</MarkdownDescription>
        </Box>
        {SECTIONS_DE_MIGRATION_V2.map(section => (
          <SectionDeMigrationV2 key={section.titre} {...section} />
        ))}
      </Box>
    </EcranDeCatalogue>
  );
};
