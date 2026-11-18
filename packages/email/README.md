# @alveole/email

Composants de mail transactionnel au style d'Alvéole, sur [react-email](https://react.email) : mêmes jetons (couleurs, typographie, rayons, tailles de bouton) que `@alveole/components`, rendus en styles inline pour les clients mail.

```tsx
import { Button, Card, EmailLayout, Heading, Typography, renderEmail, renderEmailText, v, when } from '@alveole/email';

const Invitation = () => (
  <EmailLayout preview={`Rejoignez ${v('organisation')}`} logo={{ src: v('logo_url'), alt: 'Captive' }}>
    <Heading as="h1">Bienvenue</Heading>
    <Card>
      <Typography>
        {when('invite_par', <strong>{v('invite_par')} vous invite</strong>, 'Vous êtes invité·e')}
      </Typography>
      <Button variant="primary" title="Rejoindre" href={v('url')} />
    </Card>
  </EmailLayout>
);

renderEmail(<Invitation />); // HTML, variables et conditions en ERB (<%= @url %>)
renderEmailText(<Invitation />); // version texte
```

Peer deps : `@alveole/theme`, `react`, `react-dom`.
