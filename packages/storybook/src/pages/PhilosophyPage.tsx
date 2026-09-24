import { Box, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import { EcranDeCatalogue } from '../components/EcranDeCatalogue';
import { SECTIONS_DE_PHILOSOPHIE, type SectionDePhilosophie } from './philosophie';

const PhilosophySection = ({ titre, paragraphes }: SectionDePhilosophie) => {
  const { text } = useTheme();

  return (
    <Box display="flex" gap={8} mb={'400'}>
      <Typography style={text.Titres['H4 - SM']}>{titre}</Typography>
      {paragraphes.map(paragraphe => (
        <Typography key={paragraphe} style={text['Corps de texte'].MD.Regular}>
          {paragraphe}
        </Typography>
      ))}
    </Box>
  );
};

export type PhilosophyPageProps = {
  beforeContent?: React.ReactNode;
  sidebar?: React.ReactNode;
  footerContent?: React.ReactNode;
};

export const PhilosophyPage = ({ beforeContent, sidebar, footerContent }: PhilosophyPageProps) => {
  return (
    <EcranDeCatalogue
      title="Philosophie"
      description="Les principes qui guident Alveole"
      sidebar={sidebar}
      beforeContent={beforeContent}
      footerContent={footerContent}
    >
      <Box display="flex" gap={0} style={{ maxWidth: 720 }}>
        {SECTIONS_DE_PHILOSOPHIE.map(section => (
          <PhilosophySection key={section.titre} {...section} />
        ))}
      </Box>
    </EcranDeCatalogue>
  );
};
