// This file is generated. Do not edit manually.
// Source: src/ui/Card/Card.stories.tsx

export const card = () =>
  'export const card = () => {\n  return (\n    <Card>\n      <Card.Header\n        titre="Titre de la carte"\n        sousTitre="Sous-titre de la carte"\n        image={<Avatar size="md" fallbackText="M" />}\n      />\n      <Card.Section titre="Titre de la carte" titreIcone="Calendar" description="Description de la carte" />\n      <Card.Section titre="Titre de la carte" titreIcone="Calendar" description="Description de la carte" />\n      <Card.Actions>\n        <Button variant="secondary" title="Action" size="sm" />\n        <Button variant="primary" title="Action" size="sm" />\n      </Card.Actions>\n    </Card>\n  );\n};';

export const cardDisabled = () =>
  'export const cardDisabled = () => {\n  return (\n    <Card>\n      <Card.Header\n        variant="disabled"\n        titre="Titre de la carte"\n        sousTitre="Sous-titre de la carte"\n        image={<LucideIcon name="Settings" size="md" />}\n      />\n      <Card.Section\n        variant="disabled"\n        titre="Titre de la carte"\n        titreIcone="Calendar"\n        description="Description de la carte"\n      />\n      <Card.Section\n        variant="disabled"\n        titre="Titre de la carte"\n        titreIcone="Calendar"\n        description="Description de la carte"\n      />\n      <Card.Actions>\n        <Button variant="secondary" title="Action" size="sm" disabled />\n        <Button variant="primary" title="Action" size="sm" disabled />\n      </Card.Actions>\n    </Card>\n  );\n};';

export const cardSection = () =>
  'export const cardSection = () => {\n  return (\n    <Card.Section\n      titre="Titre de la carte"\n      description="Description de la carte"\n      titreIcone="Image"\n      descriptionIcone="Image"\n    />\n  );\n};';

export const cardSectionDisabled = () =>
  'export const cardSectionDisabled = () => {\n  return (\n    <Card.Section\n      variant="disabled"\n      titre="Titre de la carte"\n      description="Description de la carte"\n      titreIcone="Image"\n      descriptionIcone="Image"\n    />\n  );\n};';

export const cardHeader = () =>
  'export const cardHeader = () => {\n  return (\n    <Box display="flex" flexDirection="column" gap="100">\n      <Card.Header\n        titre="Titre de la carte"\n        sousTitre="Sous-titre de la carte"\n        image={<Avatar size="md" fallbackText="M" />}\n      />\n\n      <Card.Header\n        titre="Titre de la carte"\n        sousTitre="Sous-titre de la carte"\n        image={<LucideIcon name="Image" size="md" />}\n      />\n    </Box>\n  );\n};';

export const cardHeaderDisabled = () =>
  'export const cardHeaderDisabled = () => {\n  return (\n    <Card.Header\n      variant="disabled"\n      titre="Titre de la carte"\n      sousTitre="Sous-titre de la carte"\n      image={<Avatar size="md" fallbackText="M" />}\n    />\n  );\n};';

export const cardActions = () =>
  'export const cardActions = () => {\n  return (\n    <Box display="flex" flexDirection="column" gap="100">\n      <Typography>\n        Privilégier l&apos;utilisation de bouton en taille SM, avec le bouton primary toujours à droite.\n      </Typography>\n      <Card.Actions>\n        <Button variant="secondary" title="Action" size="sm" />\n        <Button variant="primary" title="Action" size="sm" />\n      </Card.Actions>\n    </Box>\n  );\n};';

export const storySources = {
  card,
  cardDisabled,
  cardSection,
  cardSectionDisabled,
  cardHeader,
  cardHeaderDisabled,
  cardActions,
} as const;

export type StorySourceName = keyof typeof storySources;
