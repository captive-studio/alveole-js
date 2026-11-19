# @alveole/email

Composants de mail transactionnel au style d'Alvéole, sur [react-email](https://react.email) : mêmes jetons (couleurs, typographie, rayons, tailles de bouton) que `@alveole/components`, rendus en styles inline pour les clients mail.

```tsx
import { Button, Card, EmailLayout, Heading, Typography, renderEmail, renderEmailText } from '@alveole/email';

const Invitation = ({ organisation, url }: { organisation: string; url: string }) => (
  <EmailLayout preview={`Rejoignez ${organisation}`}>
    <Heading as="h1">Bienvenue</Heading>
    <Card>
      <Typography>Vous êtes invité·e à rejoindre {organisation}.</Typography>
      <Button variant="primary" title="Rejoindre" href={url} />
    </Card>
  </EmailLayout>
);

renderEmail(<Invitation organisation="Acme" url="https://exemple.test" />); // HTML
renderEmailText(<Invitation organisation="Acme" url="https://exemple.test" />); // version texte
```

Le paquet ne produit que du HTML et du texte. Brancher un moteur de gabarit (ERB, Handlebars…) revient à l'application : passer des marqueurs en props, puis les convertir dans la sortie.

Peer deps : `@alveole/theme`, `react`, `react-dom`.
