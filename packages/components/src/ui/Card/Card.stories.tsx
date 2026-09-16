import { Box } from '../../core/Box';
import { Story } from '../../type';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { LucideIcon } from '../LucideIcon';
import { Card } from './Card';
import { useStyles } from './CardSection.styles';

export default {
  title: 'Card',
  tags: ['ui'],
  experimental: false,
  figmaURL: 'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Alveole---Composants?node-id=2196-918&m=dev',
  description: 'Carte avec header, section et actions. Composant de type Box.',
  component: Card,
  styleFn: useStyles,
} satisfies Story;

export const card = () => {
  return (
    <Box style={{ width: '100%', maxWidth: 400 }}>
      <Card>
        <Card.Header
          titre="Titre lorem"
          sousTitre="Sous-titre"
          image={<Avatar size="md" fallbackText="M" />}
          badge={
            <Badge variant="success" size="sm">
              PRÉSENT
            </Badge>
          }
        />
        <Card.Section titre="Titre section" titreIcone="Calendar" description="Description" />
        <Card.Section titre="Titre section" titreIcone="Calendar" description="Description" />
        <Card.Actions>
          <Button variant="secondary" title="Libellé" size="sm" />
          <Button variant="primary" title="Libellé" size="sm" />
        </Card.Actions>
      </Card>
    </Box>
  );
};

export const cardDisabled = () => {
  return (
    <Box style={{ width: '100%', maxWidth: 400 }}>
      <Card>
        <Card.Header
          variant="disabled"
          titre="Titre lorem"
          sousTitre="Sous-titre"
          image={<Avatar size="md" src="https://picsum.photos/100/100" fallbackText="M" />}
          badge={
            <Badge variant="default" size="sm">
              PRÉSENT
            </Badge>
          }
        />
        <Card.Section variant="disabled" titre="Titre section" titreIcone="Calendar" description="Description" />
        <Card.Section variant="disabled" titre="Titre section" titreIcone="Calendar" description="Description" />
        <Card.Actions>
          <Button variant="secondary" title="Libellé" size="sm" disabled />
          <Button variant="primary" title="Libellé" size="sm" disabled />
        </Card.Actions>
      </Card>
    </Box>
  );
};

export const cardWithMedia = () => {
  return (
    <Box style={{ width: '100%', maxWidth: 400 }}>
      <Card>
        <Card.Media>
          <img src="https://picsum.photos/400/200" alt="" style={{ width: '100%', display: 'block' }} />
        </Card.Media>
        <Card.Header
          titre="Titre lorem"
          sousTitre="Sous-titre"
          image={<Avatar size="md" fallbackText="M" />}
          badge={
            <Badge variant="success" size="sm">
              PRÉSENT
            </Badge>
          }
        />
        <Card.Section titre="Titre section" titreIcone="Calendar" description="Description" />
        <Card.Section titre="Titre section" titreIcone="Calendar" description="Description" />
        <Card.Actions>
          <Button variant="secondary" title="Libellé" size="sm" />
          <Button variant="primary" title="Libellé" size="sm" />
        </Card.Actions>
      </Card>
    </Box>
  );
};

export const cardWithMediaDisabled = () => {
  return (
    <Box style={{ width: '100%', maxWidth: 400 }}>
      <Card>
        <Card.Media variant="disabled">
          <img src="https://picsum.photos/400/200" alt="" style={{ width: '100%', display: 'block' }} />
        </Card.Media>
        <Card.Header
          variant="disabled"
          titre="Titre lorem"
          sousTitre="Sous-titre"
          image={<Avatar size="md" fallbackText="M" />}
          badge={
            <Badge variant="default" size="sm">
              PRÉSENT
            </Badge>
          }
        />
        <Card.Section variant="disabled" titre="Titre section" titreIcone="Calendar" description="Description" />
        <Card.Section variant="disabled" titre="Titre section" titreIcone="Calendar" description="Description" />
        <Card.Actions>
          <Button variant="secondary" title="Libellé" size="sm" disabled />
          <Button variant="primary" title="Libellé" size="sm" disabled />
        </Card.Actions>
      </Card>
    </Box>
  );
};

export const cardSection = () => {
  return (
    <Card.Section
      titre="Titre de la carte"
      description="Description de la carte"
      titreIcone="Image"
      descriptionIcone="Image"
    />
  );
};

export const cardSectionDisabled = () => {
  return (
    <Card.Section
      variant="disabled"
      titre="Titre de la carte"
      description="Description de la carte"
      titreIcone="Image"
      descriptionIcone="Image"
    />
  );
};

export const cardSectionWithLink = () => {
  return (
    <Card.Section
      titre="Titre de la carte"
      description="Description de la carte"
      descriptionLink="/"
      titreIcone="Image"
      descriptionIcone="Image"
    />
  );
};

export const cardHeader = () => {
  return (
    <Box display="flex" flexDirection="column" gap="100">
      <Card.Header
        titre="Titre lorem"
        sousTitre="Sous-titre"
        image={<Avatar size="md" fallbackText="M" />}
        badge={
          <Badge variant="success" size="sm">
            PRÉSENT
          </Badge>
        }
      />

      <Card.Header titre="Titre lorem" sousTitre="Sous-titre" image={<LucideIcon name="Image" size="md" />} />
    </Box>
  );
};

export const cardHeaderDisabled = () => {
  return (
    <Card.Header
      variant="disabled"
      titre="Titre lorem"
      sousTitre="Sous-titre"
      image={<Avatar size="md" fallbackText="M" />}
      badge={
        <Badge variant="default" size="sm">
          PRÉSENT
        </Badge>
      }
    />
  );
};

/** Privilégier l'utilisation de bouton en taille SM, avec le bouton primary toujours à droite. */
export const cardActions = () => {
  return (
    <Card.Actions>
      <Button variant="secondary" title="Action" size="sm" />
      <Button variant="primary" title="Action" size="sm" />
    </Card.Actions>
  );
};

export * as Sources from './Card.stories.sources';
