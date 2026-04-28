import { router } from 'expo-router';
import { Typography } from '../../core';
import { Story } from '../../type/Story';
import { ButtonIcon } from '../Button/ButtonIcon';
import { ToolbarTop } from './ToolbarTop';
import { useStyles } from './ToolbarTop.styles';

export default {
  title: 'ToolbarTop',
  tags: ['Composant'],
  experimental: false,
  figmaURL:
    'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Alveole---Composants?node-id=1749-4674&t=qyctNCnE5tT5rKRk-4',
  description:
    "La ToolbarTop est un composant de navigation et d'action. A utiliser uniquement sur Mobile. Elle dispose de 3 variantes : default, large et compactLarge.",
  mobileOnly: true,
  component: ToolbarTop,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => <ToolbarTop title="Titre" sousTitre="Sous-titre" />;

export const AvecRetourArriere = () => (
  <ToolbarTop title="Titre" sousTitre="Sous-titre" onNavigate={() => router.back()} />
);

export const SansAvatarEtAvecActions = () => (
  <ToolbarTop
    title="Titre"
    sousTitre="Sous-titre"
    onNavigate={console.log}
    actions={<ButtonIcon variant="tertiary" size="lg" iconSize="md" icon={'Plus'} onPress={console.log} />}
  />
);

export const AvecAvatarSansActions = () => (
  <ToolbarTop title="Titre" sousTitre="Sous-titre" AvatarProps={{ src: 'https://picsum.photos/100/200' }} />
);

export const AvecAvatarEtActions = () => (
  <ToolbarTop
    title="Titre"
    sousTitre="Sous-titre"
    onNavigate={console.log}
    AvatarProps={{ src: 'https://picsum.photos/100/200' }}
    actions={<ButtonIcon variant="tertiary" size="lg" iconSize="md" icon={'Plus'} onPress={console.log} />}
  />
);

export const AvecPlusieursActions = () => (
  <ToolbarTop
    title="Titre"
    sousTitre="Sous-titre"
    onNavigate={console.log}
    AvatarProps={{ src: 'https://picsum.photos/100/200' }}
    actions={
      <>
        <ButtonIcon variant="tertiary" size="lg" iconSize="md" icon={'Plus'} onPress={console.log} />
        <ButtonIcon variant="tertiary" size="lg" iconSize="md" icon={'Download'} onPress={console.log} />
      </>
    }
  />
);

export const AvecTitreEtSansSousTitre = () => (
  <ToolbarTop
    title="Titre"
    onNavigate={console.log}
    AvatarProps={{ src: 'https://picsum.photos/100/200' }}
    actions={
      <>
        <ButtonIcon variant="tertiary" size="lg" iconSize="md" icon={'Plus'} onPress={console.log} />
        <ButtonIcon variant="tertiary" size="lg" iconSize="md" icon={'Download'} onPress={console.log} />
      </>
    }
  />
);

export const AvecBorder = () => (
  <>
    <Typography>
      En règle général, on applique la propriété `withBorder` sur la ToolbarTop pour ajouter une bordure seulement quand
      on a scroll dans la page. Si on retourne en haut de la page, la bordure disparaît.
    </Typography>
    <ToolbarTop title="Titre" sousTitre="Sous-titre" withBorder />
  </>
);

export const CompactLarge = () => <ToolbarTop title="Titre compact large" variant="compactLarge" />;

export const Large = () => (
  <ToolbarTop title="Titre large" variant="large" onNavigate={console.log} sousTitre="Sous-titre" />
);

export * as Sources from './ToolbarTop.stories.sources';
