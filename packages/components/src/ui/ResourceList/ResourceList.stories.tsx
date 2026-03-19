import { Story } from '../../type/Story';
import { EmptyState } from '../EmptyState';
import { ListItem } from '../ListItem';
import { LucideIcon } from '../LucideIcon';
import { ResourceList, ResourceListDivider } from './ResourceList';
import { useStyles } from './ResourceList.styles';

export default {
  title: 'ResourceList',
  tags: ['Composant'],
  experimental: false,
  figmaURL:
    'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Alveole---Composants?node-id=1002-558&p=f&t=wo7HwL3p0McYL9ei-0',
  description: "Permet d’afficher une liste d'items avec un header et un footer",
  component: ResourceList,
  styleFn: useStyles,
} satisfies Story;

const exampleData = [
  { id: 'id_1', name: 'Joe Dalton', description: 'Peintre' },
  { id: 'id_2', name: 'Peter Parker', description: 'Peintre' },
  { id: 'id_3', name: 'John Snow', description: 'Peintre' },
];

const exampleDataWithPreview = [
  {
    id: 'id_1',
    name: 'Joe Dalton',
    description: 'Peintre',
    preview_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
  },
  {
    id: 'id_2',
    name: 'Peter Parker',
    description: 'Peintre',
    preview_url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
  },
  {
    id: 'id_3',
    name: 'John Snow',
    description: 'Peintre',
    preview_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400',
  },
];

export const Default = () => (
  <ResourceList
    data={exampleData}
    keyExtractor={item => item.id}
    renderItem={({ item, index }) => (
      <ListItem title={item.name} description={item.description} showSeparateur={index !== 0} />
    )}
    renderNoContent={() => <EmptyState title="Aucun élément" description="Cliquez sur le bouton" iconName="House" />}
  />
);

export const WithTitle = () => (
  <ResourceList
    titre="Titre de la liste"
    data={exampleData}
    keyExtractor={item => item.id}
    renderItem={({ item, index }) => (
      <ListItem title={item.name} description={item.description} showSeparateur={index !== 0} />
    )}
    renderNoContent={() => <EmptyState title="Aucun élément" description="Cliquez sur le bouton" iconName="House" />}
  />
);

export const WithIcon = () => (
  <ResourceList
    data={exampleData}
    keyExtractor={item => item.id}
    renderItem={({ item, index }) => (
      <ListItem
        title={item.name}
        description={item.description}
        IconProps={{ name: 'Settings' }}
        showSeparateur={index !== 0}
      />
    )}
    renderNoContent={() => <EmptyState title="Aucun élément" description="Cliquez sur le bouton" iconName="House" />}
  />
);

export const WithPreviewImageAndTrailing = () => (
  <ResourceList
    data={exampleDataWithPreview}
    keyExtractor={item => item.id}
    renderItem={({ item, index }) => (
      <ListItem
        title={item.name}
        description={item.description}
        preview_url={item.preview_url}
        trailing={() => <LucideIcon name="ChevronRight" size="sm" />}
        showSeparateur={index !== 0}
      />
    )}
    renderNoContent={() => <EmptyState title="Aucun élément" description="Cliquez sur le bouton" iconName="House" />}
  />
);

export const WithNoContent = () => (
  <ResourceList
    data={[] as typeof exampleData}
    keyExtractor={item => item.id}
    renderItem={({ item }) => <ListItem title={item.name} description={item.description} />}
    renderNoContent={() => <EmptyState title="Aucun élément" description="Cliquez sur le bouton" iconName="House" />}
  />
);

export const WithDivider = () => (
  <ResourceList
    data={exampleData}
    keyExtractor={item => item.id}
    renderItem={({ item, index }) => (
      <ListItem title={item.name} description={item.description} showSeparateur={index !== 0} />
    )}
    ItemSeparatorComponent={ResourceListDivider}
    renderNoContent={() => <EmptyState title="Aucun élément" description="Cliquez sur le bouton" iconName="House" />}
  />
);
