import { EmailLayout, Typography } from '@alveole/email';

export const Exemple = () => (
  <EmailLayout
    preview="Le texte affiché sous l’objet dans la boîte de réception"
    logo={{ src: 'https://picsum.photos/seed/captive/64', alt: 'Captive' }}
    footer={
      <Typography ton="discret" textAlign="center">
        Captive · dashboard.captive.dev
      </Typography>
    }
  >
    <Typography>Le contenu du mail, centré sur 560 px.</Typography>
  </EmailLayout>
);
