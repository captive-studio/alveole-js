import React from 'react';
import { Box } from '../../core/Box';
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

/**
 * Les quatre variants, du plus au moins appuyé.
 *
 * - `primary` : l'action principale. **Une seule par zone**.
 * - `secondary` : les actions courantes, celles qu'on pose à côté de la principale.
 * - `tertiary` : les actions discrètes, dans une barre d'outils ou une ligne de tableau.
 * - `danger` : une action destructrice, réservée à la confirmation finale.
 */
export const Variants = () => (
  <Box display="flex" flexDirection="row" gap={24}>
    <Button variant="primary" title="Primary" />
    <Button variant="secondary" title="Secondary" />
    <Button variant="tertiary" title="Tertiary" />
    <Button variant="danger" title="Danger" />
  </Box>
);

/** `md` par défaut. `sm` pour les zones denses, `lg` pour une action qu'on veut mettre en avant. */
export const Sizes = () => (
  <Box display="flex" flexDirection="row" style={{ alignItems: 'center' }} gap={24}>
    <Button variant="secondary" size="sm" title="Bouton sm" />
    <Button variant="secondary" size="md" title="Bouton md" />
    <Button variant="secondary" size="lg" title="Bouton lg" />
  </Box>
);

/**
 * - `disabled` : l'action n'est pas disponible. Le bouton ne répond plus ni au clic ni au clavier.
 * - `selected` : le bouton fait partie d'un groupe et c'est lui qui est choisi.
 * - `expanded` : le bouton commande un menu ou un panneau actuellement déplié. Il pose aussi
 *   l'état accessible correspondant, ce que `selected` ne fait pas.
 */
export const States = () => (
  <Box display="flex" flexDirection="row" gap={24}>
    <Button variant="secondary" title="Normal" />
    <Button variant="secondary" title="Disabled" disabled />
    <Button variant="secondary" title="Selected" selected />
    <Button variant="secondary" title="Expanded" expanded />
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

/** `startIcon` place l'icône avant le libellé, `endIcon` après. Les deux peuvent coexister. */
export const Icons = () => (
  <Box display="flex" flexDirection="row" gap={24}>
    <Button variant="secondary" title="Ajouter" startIcon="Plus" />
    <Button variant="secondary" title="Exporter" endIcon="Download" />
    <Button variant="secondary" title="Filtres" startIcon="Plus" endIcon="ChevronDown" />
  </Box>
);

/**
 * Sans `title`, le bouton passe en mode icône seule : il devient carré, à la hauteur de son
 * cran de contrôle (28, 32 ou 40 px selon la taille).
 *
 * `ButtonIcon` produit exactement la même géométrie, mesure faite. Ce qui le distingue tient
 * entièrement à son API :
 *
 * - il rend `accessibilityLabel` **obligatoire**, là où `Button` le laisse facultatif ;
 * - il accepte `iconSize`, pour dissocier la taille de l'icône de celle du bouton ;
 * - il n'accepte que `primary`, `secondary` et `tertiary` : pas de `danger`.
 *
 * Dans les deux cas `accessibilityLabel` est la seule chose qui décrit l'action.
 */
export const IconOnly = () => (
  <Box display="flex" flexDirection="row" gap={24} style={{ alignItems: 'center' }}>
    <Button variant="tertiary" size="sm" startIcon="MoreHorizontal" accessibilityLabel="Plus d'actions" />
    <Button variant="tertiary" size="md" startIcon="MoreHorizontal" accessibilityLabel="Plus d'actions" />
    <Button variant="tertiary" size="lg" startIcon="MoreHorizontal" accessibilityLabel="Plus d'actions" />
    <Button variant="secondary" size="md" startIcon="Trash" accessibilityLabel="Supprimer" />
    <ButtonIcon variant="secondary" size="md" icon="CircleUser" accessibilityLabel="Voir le profil" />
    <ButtonIcon variant="tertiary" size="md" icon="CircleUser" iconSize="xs" accessibilityLabel="Voir le profil" />
  </Box>
);

/** Le bouton remplit la largeur de son parent, au lieu de s'ajuster à son contenu. */
export const FullWidth = () => <Button variant="primary" title="Full Width" fullWidth />;

export * as Sources from './Button.stories.sources';
