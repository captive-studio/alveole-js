import { router } from 'expo-router';
import { Story } from '../../type/Story';
import { ButtonIcon } from '../Button/ButtonIcon';
import { ToolbarTop } from './ToolbarTop';
import { useStyles } from './ToolbarTop.styles';

export default {
  title: 'ToolbarTop',
  tags: ['ui'],
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
  <ToolbarTop
    title="Titre"
    sousTitre="Sous-titre"
    onNavigate={() => router.back()}
    navigationLabel="Revenir en arriere"
  />
);

export const SansAvatarEtAvecActions = () => (
  <ToolbarTop
    title="Titre"
    sousTitre="Sous-titre"
    onNavigate={console.log}
    navigationLabel="Revenir en arriere"
    actions={
      <ButtonIcon
        variant="tertiary"
        size="lg"
        iconSize="md"
        icon={'Plus'}
        accessibilityLabel="Ajouter"
        onPress={console.log}
      />
    }
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
    navigationLabel="Revenir en arriere"
    AvatarProps={{ src: 'https://picsum.photos/100/200' }}
    actions={
      <ButtonIcon
        variant="tertiary"
        size="lg"
        iconSize="md"
        icon={'Plus'}
        accessibilityLabel="Ajouter"
        onPress={console.log}
      />
    }
  />
);

export const AvecPlusieursActions = () => (
  <ToolbarTop
    title="Titre"
    sousTitre="Sous-titre"
    onNavigate={console.log}
    navigationLabel="Revenir en arriere"
    AvatarProps={{ src: 'https://picsum.photos/100/200' }}
    actions={
      <>
        <ButtonIcon
          variant="tertiary"
          size="lg"
          iconSize="md"
          icon={'Plus'}
          accessibilityLabel="Ajouter"
          onPress={console.log}
        />
        <ButtonIcon
          variant="tertiary"
          size="lg"
          iconSize="md"
          icon={'Download'}
          accessibilityLabel="Telecharger"
          onPress={console.log}
        />
      </>
    }
  />
);

export const AvecTitreEtSansSousTitre = () => (
  <ToolbarTop
    title="Titre"
    onNavigate={console.log}
    navigationLabel="Revenir en arriere"
    AvatarProps={{ src: 'https://picsum.photos/100/200' }}
    actions={
      <>
        <ButtonIcon
          variant="tertiary"
          size="lg"
          iconSize="md"
          icon={'Plus'}
          accessibilityLabel="Ajouter"
          onPress={console.log}
        />
        <ButtonIcon
          variant="tertiary"
          size="lg"
          iconSize="md"
          icon={'Download'}
          accessibilityLabel="Telecharger"
          onPress={console.log}
        />
      </>
    }
  />
);

/**
 * En règle générale, `withBorder` est appliqué dynamiquement au scroll :
 * la bordure apparaît quand on a scrollé et disparaît en haut de la page.
 */
export const AvecBorder = () => <ToolbarTop title="Titre" sousTitre="Sous-titre" withBorder />;

export const CompactLarge = () => <ToolbarTop title="Titre compact large" variant="compactLarge" />;

export const Large = () => (
  <ToolbarTop
    title="Titre large"
    variant="large"
    onNavigate={console.log}
    navigationLabel="Revenir en arriere"
    sousTitre="Sous-titre"
  />
);

export * as Sources from './ToolbarTop.stories.sources';
