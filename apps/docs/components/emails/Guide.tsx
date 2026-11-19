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
    texte: 'Un mail est un composant React : ses données arrivent en props, comme pour un écran.',
    code: `import { Button, EmailLayout, Heading, Typography } from '@alveole/email';

export const Invitation = ({ organisation, url }: { organisation: string; url: string }) => (
  <EmailLayout preview={\`Rejoignez \${organisation}\`}>
    <Heading as="h1">Rejoignez {organisation}</Heading>
    <Typography>Vous êtes invité·e à rejoindre {organisation}.</Typography>
    <Button variant="primary" title="Rejoindre" href={url} />
  </EmailLayout>
);`,
    langage: 'tsx',
  },
  {
    titre: 'Rendre le HTML et le texte',
    texte:
      'renderEmail donne le HTML du mail, styles inline, et renderEmailText sa version texte. Les pages Composants et Exemples de cette rubrique en sont rendues, en largeur bureau ou mobile.',
    code: `import { renderEmail, renderEmailText } from '@alveole/email';

const html = renderEmail(<Invitation organisation="Acme" url="https://exemple.test" />);
const texte = renderEmailText(<Invitation organisation="Acme" url="https://exemple.test" />);`,
    langage: 'tsx',
  },
  {
    titre: 'Brancher un moteur de gabarit',
    texte:
      'Le paquet ne produit ni ERB ni autre gabarit. Pour qu’un serveur remplisse le mail à l’envoi, l’application passe des marqueurs en props, puis les convertit dans le HTML rendu, par exemple en <%= @organisation %> pour un mailer Rails.',
    code: `const html = renderEmail(<Invitation organisation="{{organisation}}" url="{{url}}" />)
  .replace(/\\{\\{(\\w+)\\}\\}/g, '<%= @$1 %>');`,
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
