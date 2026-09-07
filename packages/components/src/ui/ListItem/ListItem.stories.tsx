import { useState } from 'react';
import { Story } from '../../type/Story';
import { ButtonIcon } from '../Button';
import { ListItem } from './ListItem';
import { useStyles } from './ListItem.styles';

export default {
  title: 'ListItem',
  tags: ['ui'],
  experimental: false,
  figmaURL: 'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Composants?node-id=1002-558',
  shortDescription: 'Permet d’afficher les données d’une ressource.',
  description: `Permet d’afficher les données d’une ressource.

Il est recommandé d’utiliser les \`ListItem\` au sein d’une [ResourceList](/components/ResourceList) plutôt que de manière isolée.`,
  component: ListItem,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => (
  <ListItem
    title="Titre"
    description="Description"
    onPress={() => {
      window.alert('click !');
    }}
  />
);

export const WithTrailing = () => (
  <ListItem
    title="Titre"
    description="Description"
    trailing={() => <ButtonIcon variant="tertiary" icon="CircleX" onPress={() => console.log('remove')} />}
    onPress={() => {
      window.alert('click !');
    }}
  />
);

/**
 * Le spinner remplace l'icône de trailing et s'affiche immédiatement
 * (pas de délai) car le chargement porte sur l'item lui-même, pas sur
 * une action utilisateur déclenchée par un bouton.
 */
export const WithLoading = () => (
  <ListItem
    title="Titre"
    description="Description"
    loading={true}
    onPress={() => {
      window.alert('click !');
    }}
  />
);

export const WithoutSeparator = () => (
  <ListItem
    title="Titre"
    description="Description"
    showSeparateur={false}
    onPress={() => {
      window.alert('click !');
    }}
  />
);

export const WithIcon = () => (
  <ListItem
    title="Titre"
    description="Description"
    IconProps={{ name: 'Settings', color: 'primary' }}
    onPress={() => {
      window.alert('click !');
    }}
  />
);

export const WithAvatar = () => (
  <ListItem
    title="Titre"
    description="Description"
    AvatarProps={{
      fallbackText: 'Jean Pierre',
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    }}
    onPress={() => {
      window.alert('click !');
    }}
  />
);

export const WithPreviewImage = () => (
  <ListItem
    title="Titre"
    description="Description"
    preview_url="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
    onPress={() => {
      window.alert('click !');
    }}
  />
);

export const ItemRadio = () => {
  const [value, setValue] = useState<string>();

  return (
    <ListItem
      title="Titre"
      description="Description"
      RadioProps={{
        value: 'tutu',
        checked: value === 'tutu',
        onChange: v => setValue(v),
      }}
    />
  );
};

export const ItemRadioMultiple = () => {
  const [value, setValue] = useState<string>();

  return (
    <ListItem
      title="Titre"
      description="Description"
      RadioProps={{
        value: 'tutu',
        checked: value === 'tutu',
        onChange: v => setValue(v),
        multiple: true,
      }}
    />
  );
};

export const ItemRadioWithIcon = () => {
  const [value, setValue] = useState<string>();

  return (
    <ListItem
      title="Titre"
      description="Description"
      IconProps={{ name: 'Settings' }}
      RadioProps={{
        value: 'tutu',
        checked: value === 'tutu',
        onChange: v => setValue(v),
      }}
    />
  );
};

/** Sans prop `onPress`, l’effet de hover n’apparaît pas. */
export const withoutHover = () => <ListItem title="Titre" description="Description" />;

export * as Sources from './ListItem.stories.sources';
