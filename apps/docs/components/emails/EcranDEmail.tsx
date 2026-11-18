import { Box, Button, Heading, Page, Typography } from '@alveole/components';
import { renderSample } from '@alveole/email';
import { JsonBlock } from '@alveole/storybook';
import { CustomPalette, Spacings } from '@alveole/theme';
import React from 'react';
import { Platform } from 'react-native';
import { DocFooter } from '../uiKitNavigation';
import type { DemoDEmail } from './demos';
import { sourcesDesEmails } from './sources.generated';

const LARGEURS = { bureau: 640, mobile: 375 };

/** Force le mode choisi : le `prefers-color-scheme` d'une iframe suit celui du systeme. */
const enMode = (html: string, sombre: boolean) =>
  html.replace('@media (prefers-color-scheme: dark)', sombre ? '@media all' : '@media not all');

/** Le mail rendu par `@alveole/email` avec ses donnees d'exemple, en mode clair ou sombre, large ou etroit. */
const Apercu = ({ demo }: { demo: DemoDEmail }) => {
  const [sombre, setSombre] = React.useState(false);
  const [largeur, setLargeur] = React.useState<keyof typeof LARGEURS>('bureau');
  const html = React.useMemo(() => renderSample(<demo.mail />, demo.exemple), [demo]);

  if (Platform.OS !== 'web') {
    return <Typography>L’aperçu d’un mail n’est disponible que sur le web.</Typography>;
  }

  return (
    <Box display="flex" gap="2W">
      <Box display="flex" flexDirection="row" gap="4W" flexWrap="wrap" style={{ justifyContent: 'space-between' }}>
        <Box display="flex" flexDirection="row" gap="1W" role="group" aria-label="Mode">
          <Button
            variant="secondary"
            size="sm"
            title="Clair"
            leading="Sun"
            selected={!sombre}
            onPress={() => setSombre(false)}
          />
          <Button
            variant="secondary"
            size="sm"
            title="Sombre"
            leading="Moon"
            selected={sombre}
            onPress={() => setSombre(true)}
          />
        </Box>
        <Box display="flex" flexDirection="row" gap="1W" role="group" aria-label="Largeur">
          <Button
            variant="secondary"
            size="sm"
            title="Bureau"
            leading="Monitor"
            selected={largeur === 'bureau'}
            onPress={() => setLargeur('bureau')}
          />
          <Button
            variant="secondary"
            size="sm"
            title="Mobile"
            leading="Smartphone"
            selected={largeur === 'mobile'}
            onPress={() => setLargeur('mobile')}
          />
        </Box>
      </Box>
      <iframe
        title={`Aperçu du mail ${demo.titre}`}
        srcDoc={enMode(html, sombre)}
        style={{
          width: LARGEURS[largeur],
          maxWidth: '100%',
          height: '80vh',
          border: `1px solid ${CustomPalette.light.border['default-grey']}`,
        }}
      />
    </Box>
  );
};

export const EcranDEmail = ({ demo }: { demo: DemoDEmail }) => (
  <Page scrollable title={demo.titre} description={demo.description} footerContent={<DocFooter />}>
    <Box display="flex" gap="4W" style={{ padding: Spacings['3W'] }}>
      <Heading as="h1">{demo.titre}</Heading>
      <Typography>{demo.description}</Typography>
      <Apercu demo={demo} />
      <Heading as="h2">Code</Heading>
      <JsonBlock language="tsx" value={sourcesDesEmails[demo.nom] ?? ''} />
    </Box>
  </Page>
);
