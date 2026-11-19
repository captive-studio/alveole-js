import { AnchorHeading, Box, Heading, Page, Typography } from '@alveole/components';
import { EmailLayout } from '@alveole/email';
import { JsonBlock } from '@alveole/storybook';
import { Spacings, useTheme } from '@alveole/theme';
import type React from 'react';
import { DocFooter } from '../uiKitNavigation';
import { Apercu } from './Apercu';
import { COMPOSANTS_D_EMAIL } from './composants';
import { DEMOS_D_EMAILS } from './demos';
import { sourcesDesEmails } from './sources.generated';

type Section = { titre: string; description: string; apercu: React.ReactElement; source?: string };

const Ecran = ({ titre, description, sections }: { titre: string; description: string; sections: Section[] }) => {
  const { text } = useTheme();
  return (
    <Page scrollable title={titre} description={description} footerContent={<DocFooter />}>
      <Box display="flex" gap="8W" style={{ padding: Spacings['3W'] }}>
        <Box display="flex" gap="1W">
          <Heading as="h1">{titre}</Heading>
          <Typography>{description}</Typography>
        </Box>
        {sections.map(section => (
          <Box key={section.titre} display="flex" gap="2W">
            <AnchorHeading style={text.Titres['H4 - SM']}>{section.titre}</AnchorHeading>
            <Typography>{section.description}</Typography>
            {section.apercu}
            <JsonBlock language="tsx" value={section.source ?? ''} />
          </Box>
        ))}
      </Box>
    </Page>
  );
};

export const EcranDesExemples = () => (
  <Ecran
    titre="Exemples"
    description="Des mails complets écrits avec @alveole/email."
    sections={DEMOS_D_EMAILS.map(({ nom, titre, description, Exemple }) => ({
      titre,
      description,
      apercu: <Apercu titre={titre} mail={<Exemple />} />,
      source: sourcesDesEmails[`demos/${nom}`],
    }))}
  />
);

export const EcranDesComposants = () => (
  <Ecran
    titre="Composants"
    description="Les composants de @alveole/email, au style d’Alvéole. Chacun est rendu dans EmailLayout."
    sections={COMPOSANTS_D_EMAIL.map(({ nom, description, Exemple, complet }) => ({
      titre: nom,
      description,
      apercu: (
        <Apercu
          titre={nom}
          mail={
            complet ? (
              <Exemple />
            ) : (
              <EmailLayout>
                <Exemple />
              </EmailLayout>
            )
          }
        />
      ),
      source: sourcesDesEmails[`composants/${nom}`],
    }))}
  />
);
