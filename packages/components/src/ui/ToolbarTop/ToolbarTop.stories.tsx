import { ButtonIcon } from '../../core';
import { Story } from '../../type/Story';
import { useStyles } from './ToolbarTop.styles';
import { ToolbarTop } from './index';

export default {
  title: 'ToolbarTop',
  tags: ['Composant'],
  experimental: false,
  description: "Barre d'outils en haut de page avec titre, sous-titre optionnel, bouton retour et actions.",
  figmaURL:
    'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Alveole---Composants?node-id=1749-4674&t=baZKFA9BpkeQGeZm-4',
  component: ToolbarTop,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => <ToolbarTop title="Mon titre" />;

export const WithSubtitle = () => <ToolbarTop title="Mon titre" subtitle="Un sous-titre optionnel" />;

export const WithBackground = () => (
  <ToolbarTop title="Page avec fond" subtitle="Le fond utilise la couleur par défaut" background />
);

export const WithBackButton = () => (
  <ToolbarTop
    title="Page détails"
    subtitle="Avec bouton de retour"
    canGoBack
    onNavigateBack={() => console.log('Retour')}
  />
);

export const WithActions = () => (
  <ToolbarTop
    title="Page avec actions"
    actions={
      <>
        <ButtonIcon variant="tertiary" icon="Search" onPress={() => console.log('Recherche')} />
        <ButtonIcon variant="tertiary" icon="MoveVertical" onPress={() => console.log('Menu')} />
      </>
    }
  />
);

export const Full = () => (
  <ToolbarTop
    title="Tous les options"
    subtitle="Sous-titre avec fond et actions"
    background
    canGoBack
    onNavigateBack={() => console.log('Retour')}
    actions={<ButtonIcon variant="tertiary" icon="Share" onPress={() => console.log('Partager')} />}
  />
);

export const CompactLarge = () => <ToolbarTop title="Titre compact large" variant="compactLarge" />;
