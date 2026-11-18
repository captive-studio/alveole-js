import {
  A,
  Avatar,
  Button,
  Card,
  Column,
  Divider,
  EmailLayout,
  Heading,
  Row,
  Section,
  Typography,
  v,
} from '@alveole/email';
import { Spacings } from '@alveole/theme';

export const exemple = {
  organisation: 'Acme',
  auteur: 'Camille Martin',
  avatar_url: 'https://i.pravatar.cc/96?img=5',
  commentaire: 'Le bouton d’envoi passe sous le clavier sur iPhone SE.',
  capture_url: 'https://picsum.photos/seed/alveole/480/300',
  url: 'https://exemple.test/commentaires/42',
  desabonnement_url: 'https://exemple.test/notifications',
  logo_url: 'https://picsum.photos/seed/captive/64',
};

const PiedDePage = () => (
  <>
    <Section style={{ textAlign: 'center', marginTop: 32 }}>
      <A href={v('desabonnement_url')}>Désactiver les notifications de commentaires pour cette app</A>
    </Section>
    <Divider />
    <Typography textAlign="center">
      Suivez vos apps, déploiements et commentaires depuis votre téléphone avec l’application Captive.
    </Typography>
    <Row>
      <Column align="center">
        <A href="https://apps.apple.com">Captive pour iOS</A>
      </Column>
      <Column align="center">
        <A href="https://play.google.com">Captive pour Android</A>
      </Column>
    </Row>
    <Divider />
    <Typography ton="discret" textAlign="center">
      Captive héberge et opère vos applications web et mobiles.
    </Typography>
  </>
);

export const Commentaire = () => (
  <EmailLayout
    preview={`${v('auteur')} : ${v('commentaire')}`}
    logo={{ src: v('logo_url'), alt: 'Captive' }}
    footer={<PiedDePage />}
  >
    <Typography ton="discret">{v('organisation')}</Typography>
    <Heading as="h1">{v('auteur')} a laissé un commentaire</Heading>
    <Card media={<img src={v('capture_url')} width={240} alt="" />}>
      <Row>
        <Column style={{ width: Spacings['6W'], verticalAlign: 'top' }}>
          <Avatar size="md" src={v('avatar_url')} fallbackText={v('auteur')} />
        </Column>
        <Column>
          <Typography ton="fort">{v('auteur')}</Typography>
          <Typography>{v('commentaire')}</Typography>
        </Column>
      </Row>
      <Button variant="secondary" fullWidth title="Voir dans le dashboard" href={v('url')} />
    </Card>
  </EmailLayout>
);
