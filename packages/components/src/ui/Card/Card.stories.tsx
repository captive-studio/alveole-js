import { Box, Typography } from '../../core';
import { Story } from '../../type';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { LucideIcon } from '../LucideIcon';
import { Card } from './Card';
import { useStyles } from './CardSection.styles';

export default {
  title: 'Card',
  tags: ['Kit'],
  experimental: false,
  figmaURL: 'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Alveole---Composants?node-id=2196-918&m=dev',
  description: 'Carte avec header, section et actions. Composant de type Box.',
  component: Card,
  styleFn: useStyles,
} satisfies Story;

export const card = () => {
  return (
    <Card>
      <Card.Header
        titre="Titre de la carte"
        sousTitre="Sous-titre de la carte"
        image={<Avatar size="md" fallbackText="M" />}
      />
      <Card.Section titre="Titre de la carte" titreIcone="Calendar" description="Description de la carte" />
      <Card.Section titre="Titre de la carte" titreIcone="Calendar" description="Description de la carte" />
      <Card.Actions>
        <Button variant="secondary" title="Action" size="sm" />
        <Button variant="primary" title="Action" size="sm" />
      </Card.Actions>
    </Card>
  );
};

export const cardDisabled = () => {
  return (
    <Card>
      <Card.Header
        variant="disabled"
        titre="Titre de la carte"
        sousTitre="Sous-titre de la carte"
        image={<LucideIcon name="Settings" size="md" />}
      />
      <Card.Section
        variant="disabled"
        titre="Titre de la carte"
        titreIcone="Calendar"
        description="Description de la carte"
      />
      <Card.Section
        variant="disabled"
        titre="Titre de la carte"
        titreIcone="Calendar"
        description="Description de la carte"
      />
      <Card.Actions>
        <Button variant="secondary" title="Action" size="sm" disabled />
        <Button variant="primary" title="Action" size="sm" disabled />
      </Card.Actions>
    </Card>
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

export const cardHeader = () => {
  return (
    <Box display="flex" flexDirection="column" gap="100">
      <Card.Header
        titre="Titre de la carte"
        sousTitre="Sous-titre de la carte"
        image={<Avatar size="md" fallbackText="M" />}
      />

      <Card.Header
        titre="Titre de la carte"
        sousTitre="Sous-titre de la carte"
        image={<LucideIcon name="Image" size="md" />}
      />
    </Box>
  );
};

export const cardHeaderDisabled = () => {
  return (
    <Card.Header
      variant="disabled"
      titre="Titre de la carte"
      sousTitre="Sous-titre de la carte"
      image={<Avatar size="md" fallbackText="M" />}
    />
  );
};

export const cardActions = () => {
  return (
    <Box display="flex" flexDirection="column" gap="100">
      <Typography>
        Privilégier l&apos;utilisation de bouton en taille SM, avec le bouton primary toujours à droite.
      </Typography>
      <Card.Actions>
        <Button variant="secondary" title="Action" size="sm" />
        <Button variant="primary" title="Action" size="sm" />
      </Card.Actions>
    </Box>
  );
};
