import { Box, Heading, Page, Typography } from '@alveole/components';
import { JsonBlock } from '@alveole/storybook';
import { Spacings } from '@alveole/theme';
import { DocFooter } from '../uiKitNavigation';

const ETAPES = [
  {
    titre: 'Installer',
    texte:
      '@alveole/email habille les composants de react-email avec les jetons d’Alvéole : mêmes couleurs, typographie et boutons que l’app, en styles inline.',
    code: 'pnpm add -E @alveole/email @alveole/theme react-dom',
    langage: 'bash',
  },
  {
    titre: 'Écrire un mail',
    texte:
      'Un mail est un composant React. v(nom) pose une variable fournie par le mailer, when(nom, a, b) la seule condition permise.',
    code: `import { Button, EmailLayout, Heading, Typography, v, when } from '@alveole/email';

export const Invitation = () => (
  <EmailLayout preview={\`Rejoignez \${v('organisation')}\`}>
    <Heading as="h1">Rejoignez {v('organisation')}</Heading>
    <Typography>{when('invite_par', <>{v('invite_par')} vous invite</>, 'Vous êtes invité·e')}</Typography>
    <Button variant="primary" title="Rejoindre" href={v('url')} />
  </EmailLayout>
);`,
    langage: 'tsx',
  },
  {
    titre: 'Générer les vues Rails',
    texte:
      'Chaque .tsx produit un .html.erb et un .text.erb : les variables deviennent <%= @nom %>, les conditions <% if @nom %>. Le mailer Rails n’a plus qu’à définir ses variables d’instance.',
    code: `import { renderEmail, renderEmailText } from '@alveole/email';

writeFileSync('app/views/invitation_mailer/invitation.html.erb', renderEmail(<Invitation />));
writeFileSync('app/views/invitation_mailer/invitation.text.erb', renderEmailText(<Invitation />));`,
    langage: 'tsx',
  },
  {
    titre: 'Prévisualiser',
    texte:
      'renderSample remplit le mail avec des données d’exemple, sans Rails. Les démonstrations de cette rubrique en sont rendues, en mode clair ou sombre et en largeur mobile.',
    code: "renderSample(<Invitation />, { organisation: 'Acme', invite_par: null, url: 'https://exemple.test' });",
    langage: 'tsx',
  },
] as const;

export const GuideDesEmails = () => (
  <Page
    scrollable
    title="Emails"
    description="Écrire des mails transactionnels avec @alveole/email"
    footerContent={<DocFooter />}
  >
    <Box display="flex" gap="4W" style={{ padding: Spacings['3W'] }}>
      <Heading as="h1">Emails</Heading>
      {ETAPES.map(({ titre, texte, code, langage }) => (
        <Box key={titre} display="flex" gap="1W">
          <Heading as="h2">{titre}</Heading>
          <Typography>{texte}</Typography>
          <JsonBlock language={langage} value={code} />
        </Box>
      ))}
    </Box>
  </Page>
);
