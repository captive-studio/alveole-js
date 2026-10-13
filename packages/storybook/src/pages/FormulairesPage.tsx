import { AnchorHeading, Box, MarkdownDescription } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import { EcranDeCatalogue } from '../components/EcranDeCatalogue';
import { JsonBlock } from '../components/JsonBlock';
import { SECTIONS_DE_FORMULAIRES, type SectionDeFormulaires } from './formulaires';
import { Anatomie, Clavier, Fichiers, FormulaireDeBase, Sources, Validation } from './formulaires.stories';

const DEMOS = { Anatomie, Clavier, Fichiers, FormulaireDeBase, Validation };

const SectionDeFormulairesView = ({ titre, markdown, demo }: SectionDeFormulaires) => {
  const { text } = useTheme();
  const Demo = demo ? DEMOS[demo] : null;

  return (
    <Box display="flex" gap={8} mb={'400'}>
      <AnchorHeading style={text.Titres['H4 - SM']}>{titre}</AnchorHeading>
      <MarkdownDescription>{markdown}</MarkdownDescription>
      {demo && Demo ? (
        <Box display="flex" gap={8}>
          <Demo />
          <JsonBlock language="tsx" value={Sources.storySources[demo]()} />
        </Box>
      ) : null}
    </Box>
  );
};

export type FormulairesPageProps = {
  beforeContent?: React.ReactNode;
  sidebar?: React.ReactNode;
  footerContent?: React.ReactNode;
};

export const FormulairesPage = ({ beforeContent, sidebar, footerContent }: FormulairesPageProps) => {
  return (
    <EcranDeCatalogue
      title="Formulaires"
      description="Construire un formulaire avec les champs Alveole"
      sidebar={sidebar}
      beforeContent={beforeContent}
      footerContent={footerContent}
      sommaire={SECTIONS_DE_FORMULAIRES.map(({ titre }) => titre)}
    >
      <Box display="flex" gap={0}>
        {SECTIONS_DE_FORMULAIRES.map(section => (
          <SectionDeFormulairesView key={section.titre} {...section} />
        ))}
      </Box>
    </EcranDeCatalogue>
  );
};
