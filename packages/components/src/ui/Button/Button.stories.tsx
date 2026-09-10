import React from 'react';
import { Box } from '../../core';
import { Story } from '../../type';
import { Button } from './Button';
import { useStyles } from './Button.styles';
import { ButtonIcon } from './ButtonIcon';

export default {
  title: 'Button',
  tags: ['ui'],
  experimental: false,
  figmaURL: 'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Composants?node-id=1002-548',
  description: 'Boutons de type Pressable (React Native) avec différentes tailles et variants.',
  component: Button,
  styleFn: useStyles,
} satisfies Story;

export const Sizes = () => (
  <Box display="flex" flexDirection="row" style={{ alignItems: 'flex-start' }} gap={4}>
    <Button variant="secondary" size="sm" title="Bouton sm" />
    <Button variant="secondary" size="md" title="Bouton md" />
    <Button variant="secondary" size="lg" title="Bouton lg" />
  </Box>
);

export const Primary = () => (
  <Box display="flex" flexDirection="row" gap={4}>
    <Button variant="primary" title="Bouton primary" />
    <Button variant="primary" title="Disabled" disabled />
  </Box>
);

export const Secondary = () => (
  <Box display="flex" flexDirection="row" gap={4}>
    <Button variant="secondary" title="Bouton secondary" />
    <Button variant="secondary" title="Disabled" disabled />
  </Box>
);

export const Tertiary = () => (
  <Box display="flex" flexDirection="row" gap={4}>
    <Button variant="tertiary" title="Bouton tertiary" />
    <Button variant="tertiary" title="Disabled" disabled />
  </Box>
);

export const Danger = () => (
  <Box display="flex" flexDirection="row" gap={4}>
    <Button variant="danger" title="Bouton danger" />
    <Button variant="danger" title="Disabled" disabled />
  </Box>
);

/** @deprecated Préférer les variants `primary`, `secondary` ou `tertiary`. */
export const Link = () => (
  <Box display="flex" flexDirection="row" gap={4}>
    <Button variant="link" title="Bouton link" />
    <Button variant="link" title="Disabled" disabled />
    <Button variant="link" title="Disabled" disabled startIcon="Pen" />
  </Box>
);

export const Icons = () => (
  <Box display="flex" flexDirection="row" gap={4}>
    <Button variant="primary" title="Start Icon" startIcon="Plus" />
    <Button variant="primary" title="End Icon" endIcon="Plus" />
    <Button variant="primary" title="End Icon" endIcon="Plus" />
    <ButtonIcon variant="primary" icon="CircleUser" />
    <ButtonIcon variant="primary" icon="CircleUser" />
  </Box>
);

/** Sans `title`, le bouton passe en mode icône seule (padding carré, pas de texte). */
export const IconOnly = () => (
  <Box display="flex" flexDirection="row" gap={4} style={{ alignItems: 'center' }}>
    <Button variant="tertiary" size="sm" startIcon="MoreHorizontal" accessibilityLabel="Plus d'actions" />
    <Button variant="tertiary" size="md" startIcon="MoreHorizontal" accessibilityLabel="Plus d'actions" />
    <Button variant="tertiary" size="lg" startIcon="MoreHorizontal" accessibilityLabel="Plus d'actions" />
    <Button variant="secondary" size="sm" startIcon="Trash" accessibilityLabel="Supprimer" />
    <Button variant="tertiary" size="sm" startIcon="MoreHorizontal" selected accessibilityLabel="Plus d'actions" />
  </Box>
);

export const FullWidth = () => <Button variant="primary" title="Full Width" fullWidth />;

export const Selected = () => (
  <Box display="flex" flexDirection="row" gap={4}>
    <Button variant="secondary" title="Selected" selected />
  </Box>
);

/** Utilisé quand le bouton est actif (ex : quand un menu est ouvert). */
export const Active = () => (
  <Box display="block">
    <Button variant="secondary" title="Active" active />
  </Box>
);

/**
 * Le spinner n'apparaît qu'après **1 000 ms** (`delay="long"`).
 *
 * Ce délai évite un clignotement visuel quand l'opération se termine rapidement :
 * si le serveur répond en moins d'une seconde, l'utilisateur ne voit jamais le spinner.
 * Au-delà, le spinner s'affiche pour signaler que l'attente va durer.
 *
 * Appuyez sur le bouton pour simuler une opération de 3 secondes.
 */
export const Loading = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handlePress = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return <Button variant="primary" title="Enregistrer" isLoading={isLoading} onPress={handlePress} />;
};

export * as Sources from './Button.stories.sources';
