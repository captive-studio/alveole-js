import { Button, EmailLayout, Heading, Typography, v, when } from '@alveole/email';

export const exemple = {
  organisation: 'Acme',
  invite_par: 'Camille Martin',
  url: 'https://exemple.test/invitation',
  logo_url: 'https://picsum.photos/seed/captive/64',
};

export const Invitation = () => (
  <EmailLayout preview={`Rejoignez ${v('organisation')} sur Captive`} logo={{ src: v('logo_url'), alt: 'Captive' }}>
    <Heading as="h1">Rejoignez {v('organisation')}</Heading>
    <Typography>
      {when(
        'invite_par',
        <>
          <strong>{v('invite_par')}</strong> vous invite
        </>,
        'Vous êtes invité·e',
      )}{' '}
      à rejoindre l’organisation {v('organisation')} sur Captive.
    </Typography>
    <Button variant="primary" size="lg" title={`Rejoindre ${v('organisation')}`} href={v('url')} />
    <Typography ton="discret">Ce lien expire dans 7 jours.</Typography>
  </EmailLayout>
);
