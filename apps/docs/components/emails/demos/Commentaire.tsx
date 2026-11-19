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
} from '@alveole/email';
import { Spacings } from '@alveole/theme';

type CommentaireProps = {
  organisation: string;
  auteur: string;
  avatar: string;
  commentaire: string;
  capture: string;
  url: string;
  desabonnement: string;
  logo: string;
};

const PiedDePage = ({ desabonnement }: { desabonnement: string }) => (
  <>
    <Section style={{ textAlign: 'center', marginTop: 32 }}>
      <A href={desabonnement}>Désactiver les notifications de commentaires pour cette app</A>
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

export const Commentaire = (p: CommentaireProps) => (
  <EmailLayout
    preview={`${p.auteur} : ${p.commentaire}`}
    logo={{ src: p.logo, alt: 'Captive' }}
    footer={<PiedDePage desabonnement={p.desabonnement} />}
  >
    <Typography ton="discret">{p.organisation}</Typography>
    <Heading as="h1">{p.auteur} a laissé un commentaire</Heading>
    <Card media={<img src={p.capture} width={240} alt="" />}>
      <Row>
        <Column style={{ width: Spacings['6W'], verticalAlign: 'top' }}>
          <Avatar size="md" src={p.avatar} fallbackText={p.auteur} />
        </Column>
        <Column>
          <Typography ton="fort">{p.auteur}</Typography>
          <Typography>{p.commentaire}</Typography>
        </Column>
      </Row>
      <Button variant="secondary" fullWidth title="Voir dans le dashboard" href={p.url} />
    </Card>
  </EmailLayout>
);

export const Exemple = () => (
  <Commentaire
    organisation="Acme"
    auteur="Camille Martin"
    avatar="https://i.pravatar.cc/96?img=5"
    commentaire="Le bouton d’envoi passe sous le clavier sur iPhone SE."
    capture="https://picsum.photos/seed/alveole/480/300"
    url="https://exemple.test/commentaires/42"
    desabonnement="https://exemple.test/notifications"
    logo="https://picsum.photos/seed/captive/64"
  />
);
