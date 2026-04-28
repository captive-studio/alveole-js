import { Story } from '../../type';
import { Button } from '../Button';
import { EmptyState } from './EmptyState';
import { useStyles } from './EmptyState.styles';

export default {
  title: 'Empty State',
  tags: ['ui'],
  experimental: false,
  description: "À utiliser quand une liste d'objet est vide",
  figmaURL:
    'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Alveole---Composants?node-id=1399-538&t=baZKFA9BpkeQGeZm-4',
  component: EmptyState,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => {
  return (
    <EmptyState
      title="Aucun élément pour l’instant"
      description="Ajoutez un premier élément pour commencer à travailler sur cette section."
    />
  );
};

export const WithIcon = () => {
  return (
    <EmptyState
      iconName="ClipboardList"
      title="Aucune donnée"
      description="Ajoutez un élément pour remplir ce tableau."
    />
  );
};

export const WithActions = () => {
  return (
    <EmptyState
      iconName="FilePlus"
      title="Vous n’avez aucun document"
      description="Créez un premier document ou importez-en un depuis votre ordinateur."
      actions={
        <>
          <Button title="Créer un document" variant="primary" />
          <Button title="Importer un fichier" variant="secondary" />
        </>
      }
    />
  );
};

export const WithCustomChildren = () => {
  return (
    <EmptyState iconName="File" description={'Vous n’avez aucun item'}>
      <Button title={'Button'} variant={'primary'} fullWidth />
      <Button title={'Secondary action link'} variant={'link'} />
    </EmptyState>
  );
};

export const WithFixHeight = () => {
  return (
    <EmptyState iconName="File" description={'Vous n’avez aucun item'} style={{ height: '600px' }}>
      <Button title={'Button'} variant={'primary'} />
      <Button title={'Secondary action link'} variant={'link'} />
    </EmptyState>
  );
};

export * as Sources from './EmptyState.stories.sources';
