import { AnchorHeading, Box, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import { EcranDeCatalogue } from '../components/EcranDeCatalogue';
import { JsonBlock } from '../components/JsonBlock';
import { ETAPES_D_INSTALLATION, type EtapeDInstallation } from './installation';

const EtapeDInstallationSection = ({ titre, paragraphes, extraits = [] }: EtapeDInstallation) => {
  const { text } = useTheme();

  return (
    <Box display="flex" gap={8} mb={'400'}>
      <AnchorHeading style={text.Titres['H4 - SM']}>{titre}</AnchorHeading>
      {paragraphes.map(paragraphe => (
        <Typography key={paragraphe} style={text['Corps de texte'].MD.Regular}>
          {paragraphe}
        </Typography>
      ))}
      {extraits.map(({ langage, fichier, source }) => (
        <Box key={source} display="flex" gap={4}>
          {fichier ? <Typography style={text['Corps de texte'].SM.Bold}>{fichier}</Typography> : null}
          <JsonBlock language={langage} value={source} />
        </Box>
      ))}
    </Box>
  );
};

export type InstallationPageProps = {
  beforeContent?: React.ReactNode;
  sidebar?: React.ReactNode;
  footerContent?: React.ReactNode;
};

export const InstallationPage = ({ beforeContent, sidebar, footerContent }: InstallationPageProps) => {
  return (
    <EcranDeCatalogue
      title="Installation"
      description="Installer et configurer Alveole dans une application Expo"
      sidebar={sidebar}
      beforeContent={beforeContent}
      footerContent={footerContent}
      sommaire={ETAPES_D_INSTALLATION.map(({ titre }) => titre)}
    >
      <Box display="flex" gap={0}>
        {ETAPES_D_INSTALLATION.map(etape => (
          <EtapeDInstallationSection key={etape.titre} {...etape} />
        ))}
      </Box>
    </EcranDeCatalogue>
  );
};
