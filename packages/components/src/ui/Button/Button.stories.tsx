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
 * Les cinq variants, du plus au moins appuyé.
 *
 * - `primary` : l'action principale. **Une seule par zone**.
 * - `secondary` : les actions courantes, celles qu'on pose à côté de la principale.
 * - `tertiary` : les actions discrètes, dans une barre d'outils ou une ligne de tableau.
 * - `danger` : une action destructrice, réservée à la confirmation finale.
 * - `link` : une action qui se lit comme un lien, sans cadre ni fond. C'est ce que les
 *   applications utilisent pour rendre une valeur cliquable dans une fiche ou une carte.
 */
export const Variants = () => (
  <Box display="flex" flexDirection="row" gap={24}>
    <Button variant="primary" title="Primary" />
    <Button variant="secondary" title="Secondary" />
    <Button variant="tertiary" title="Tertiary" />
    <Button variant="danger" title="Danger" />
    <Button variant="link" title="Link" />
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
 * **Le spinner prend la place de quelque chose, il ne s'ajoute jamais** : le bouton garde donc
 * exactement sa largeur. S'il porte une icône, c'est elle que le spinner remplace, et le
 * libellé reste lisible. Sinon le spinner se centre et le libellé devient invisible sans
 * quitter le flux, pour continuer d'imposer sa largeur.
 *
 * Pendant toute l'attente - y compris avant que le spinner ne paraisse - le bouton cesse de
 * répondre : il sort du parcours au clavier et se déclare `aria-disabled`, pour qu'un second
 * appui ne relance pas l'opération. Son apparence, elle, reste celle du repos.
 *
 * Appuyez sur un bouton pour simuler une opération de 3 secondes.
 */
export const Loading = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handlePress = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <Box display="flex" flexDirection="row" gap={24}>
      <Button variant="primary" title="Enregistrer" isLoading={isLoading} onPress={handlePress} />
      <Button variant="secondary" title="Exporter" startIcon="Download" isLoading={isLoading} onPress={handlePress} />
    </Box>
  );
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

/**
 * Trois props retirent au bouton une partie de sa mise en forme, pour qu'il se fonde dans ce
 * qui l'entoure. Elles ne s'emploient pas isolément : elles servent trois motifs précis, qu'on
 * retrouve à l'identique dans les applications.
 *
 * - `leftAlign` aligne le contenu à gauche au lieu de le centrer. C'est le bouton d'action
 *   d'une ligne de tableau, qui doit s'aligner sur sa colonne.
 * - `borderNone` retire les arrondis, **et seulement eux** : la bordure reste. C'est le bouton
 *   de pied de barre latérale, qui doit s'aligner sur les entrées de la barre plutôt que
 *   flotter au-dessus d'elles. Son nom décrit donc mal ce qu'il fait.
 * - `noPadding` supprime le creux horizontal. C'est la valeur cliquable d'une fiche, qui doit
 *   commencer exactement là où commencerait le texte.
 *
 * Ces props décrivent un retrait, pas une intention : le kit ne nomme pas encore ces trois
 * motifs, et les applications les recomposent donc à la main à chaque fois.
 */
export const Layout = () => (
  <Box display="flex" gap={16} style={{ width: 240 }}>
    <Button variant="secondary" title="Par défaut" fullWidth />
    <Button variant="secondary" title="leftAlign" fullWidth leftAlign />
    <Button variant="secondary" title="borderNone" fullWidth borderNone />
    <Button variant="link" title="Par défaut" leftAlign fullWidth />
    <Button variant="link" title="noPadding" leftAlign fullWidth noPadding />
  </Box>
);

export * as Sources from './Button.stories.sources';
