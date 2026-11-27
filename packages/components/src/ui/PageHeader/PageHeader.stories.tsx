import { Spacings } from '@alveole/theme';
import React from 'react';
import { Box } from '../../core/Box';
import { Story } from '../../type/Story';
import { ActionMenu } from '../ActionMenu';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { TextInput } from '../FormControl';
import { LucideIcon } from '../LucideIcon';
import { PageHeader } from './PageHeader';
import { useStyles } from './PageHeader.styles';

export default {
  title: 'PageHeader',
  tags: ['ui'],
  experimental: false,
  figmaURL: 'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Alveole---Composants?node-id=1860-3740',
  description:
    'En-tête d’un écran d’application : fil d’Ariane, puis titre à gauche et actions à droite. ' +
    'Le titre est le h1 de la page, dans le registre applicatif : 24, comme Atlassian. Un site de ' +
    'documentation ou une vitrine se titrent dans un autre registre et n’empruntent pas ce composant.',
  component: PageHeader,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => <PageHeader title="Titre de la page" />;

export const WithActions = () => (
  <Box width="100%">
    <PageHeader
      title="Détail de la mission"
      actions={
        <>
          <Button variant="primary" title="Enregistrer" size="sm" onPress={() => {}} />
        </>
      }
    />
  </Box>
);

export const MobileWidth = () => (
  <Box width={375}>
    <PageHeader
      title="AD Poids Lourds - Application"
      actions={
        <>
          <Button variant="secondary" title="Modifier en masse" size="sm" onPress={() => {}} />
          <Button variant="primary" title="Ajouter une variable" size="sm" onPress={() => {}} />
        </>
      }
    />
  </Box>
);

const filtres = [
  { id: 'version', title: 'Version', options: ['v1.0', 'v1.1', 'v2.0'] },
  { id: 'epic', title: 'Epic', options: ['Refonte design', 'Onboarding', 'Facturation'] },
  { id: 'type', title: 'Type', options: ['Bug', 'Story', 'Tâche'] },
];

const FiltreMenu = (props: {
  filtre: (typeof filtres)[number];
  ouvert: boolean;
  setOuvert: (open: boolean) => void;
  choix?: string;
  choisir: (option: string) => void;
}) => (
  <ActionMenu
    placement="bottom-start"
    scrollable={false}
    open={props.ouvert}
    setOpen={props.setOuvert}
    renderTrigger={() => (
      <Button
        variant="secondary"
        title={props.choix ?? props.filtre.title}
        trailing="ChevronDown"
        size="sm"
        selected={props.choix != null}
        expanded={props.ouvert}
      />
    )}
  >
    {props.filtre.options.map(option => (
      <ActionMenu.Item
        key={option}
        title={option}
        selected={props.choix === option}
        onPress={() => props.choisir(option)}
      />
    ))}
  </ActionMenu>
);

export const WithFilters = () => {
  const [recherche, setRecherche] = React.useState('');
  const [ouvert, setOuvert] = React.useState<string | null>(null);
  const [choix, setChoix] = React.useState<Record<string, string | undefined>>({});

  return (
    <Box width="100%">
      <PageHeader
        title="Tableau"
        actions={<Button variant="primary" title="Créer" size="sm" onPress={() => {}} />}
        bottomBar={
          <>
            <Box width={240}>
              <TextInput
                value={recherche}
                onChangeText={setRecherche}
                placeholder="Rechercher"
                startAdornment={
                  <Box style={{ paddingLeft: Spacings['1W'] }}>
                    <LucideIcon name="Search" size="sm" />
                  </Box>
                }
              />
            </Box>
            <Box style={{ flexDirection: 'row' }}>
              {['Jean Dupont', 'Marie Curie', 'Ada Lovelace'].map((nom, i) => (
                <Avatar key={nom} size="sm" fallbackText={nom} style={{ marginLeft: i ? -4 : 0 }} />
              ))}
            </Box>
            {filtres.map(filtre => (
              <FiltreMenu
                key={filtre.id}
                filtre={filtre}
                ouvert={ouvert === filtre.id}
                setOuvert={open => setOuvert(open ? filtre.id : null)}
                choix={choix[filtre.id]}
                choisir={option => {
                  setChoix(prev => ({ ...prev, [filtre.id]: prev[filtre.id] === option ? undefined : option }));
                  setOuvert(null);
                }}
              />
            ))}
          </>
        }
      />
    </Box>
  );
};

export * as Sources from './PageHeader.stories.sources';
