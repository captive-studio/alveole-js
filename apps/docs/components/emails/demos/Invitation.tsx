import { Button, EmailLayout, Heading, Typography } from '@alveole/email';

type InvitationProps = { organisation: string; invitePar?: string; url: string; logo: string };

export const Invitation = ({ organisation, invitePar, url, logo }: InvitationProps) => (
  <EmailLayout preview={`Rejoignez ${organisation} sur Captive`} logo={{ src: logo, alt: 'Captive' }}>
    <Heading as="h1">Rejoignez {organisation}</Heading>
    <Typography>
      {invitePar ? (
        <>
          <strong>{invitePar}</strong> vous invite
        </>
      ) : (
        'Vous êtes invité·e'
      )}{' '}
      à rejoindre l’organisation {organisation} sur Captive.
    </Typography>
    <Button variant="primary" size="lg" title={`Rejoindre ${organisation}`} href={url} />
    <Typography ton="discret">Ce lien expire dans 7 jours.</Typography>
  </EmailLayout>
);

export const Exemple = () => (
  <Invitation
    organisation="Acme"
    invitePar="Camille Martin"
    url="https://exemple.test/invitation"
    logo="https://picsum.photos/seed/captive/64"
  />
);
