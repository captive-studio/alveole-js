import { useTheme } from '@alveole/theme';
import React from 'react';
import { Platform, Pressable, ScrollView } from 'react-native';
import { Box } from '../../core/Box';
import type { Story } from '../../type/Story';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { ActionMenu } from './ActionMenu';

export default {
  title: 'ActionMenu',
  tags: ['ui'],
  experimental: false,
  figmaURL: 'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Composants?node-id=1002-547',
  description:
    "Menu contextuel affichant une liste d'actions sous forme de liste de liens. Utilise le composant [Popover](https://alveole.captive.fr/components/Popover) pour faire apparaître le menu.",
  shortDescription: "Menu contextuel affichant une liste d'actions sous forme de liste de liens.",
  component: ActionMenu,
  webOnly: true,
  styleFn: () => '',
} satisfies Story;

export const Default = () => {
  const alignments = [
    'top',
    'right',
    'bottom',
    'left',
    'top-start',
    'top-end',
    'right-start',
    'right-end',
    'bottom-start',
    'bottom-end',
    'left-start',
    'left-end',
  ] as const;

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap="1W"
      flexDirection="row"
      width="100%"
      style={{ justifyContent: 'center', alignItems: 'center' }}
    >
      {alignments.map(alignment => (
        <ActionMenu
          key={alignment}
          placement={alignment}
          renderTrigger={() => <Button variant="secondary" title={alignment} />}
        >
          <ActionMenu.Item title="Contenu de l'action menu" icon="Settings" selected />
          <ActionMenu.Item title="Contenu de l'action menu" icon="Copy" />
          <ActionMenu.Item title="Contenu de l'action menu" icon="Trash" />
        </ActionMenu>
      ))}
    </Box>
  );
};

type FilterId = 'epic' | 'type' | 'filtresRapides';

type Filter = { id: FilterId; title: string; options: string[]; multi?: boolean };

// Un menu de filtre isolé : il dérive son affichage (libellé du bouton, options cochées) de la
// sélection reçue, sans connaître la forme du state parent. L'extraire de Filters évite de mêler
// gestion d'état et rendu dans une même fonction et supprime la logique dupliquée entre options.
const FilterMenu = ({
  filter,
  isOpen,
  onOpenChange,
  selection,
  onToggle,
}: {
  filter: Filter;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selection: string | string[] | undefined;
  onToggle: (option: string) => void;
}) => {
  const selectedValues = Array.isArray(selection) ? selection : selection != null ? [selection] : [];
  const hasSelection = selectedValues.length > 0;

  return (
    <ActionMenu
      placement="bottom-start"
      scrollable={false}
      open={isOpen}
      setOpen={onOpenChange}
      renderTrigger={() => (
        <Button
          variant="secondary"
          title={filter.multi ? filter.title : (selectedValues[0] ?? filter.title)}
          endIcon="ChevronDown"
          size="sm"
          selected={hasSelection}
          expanded={isOpen}
        />
      )}
    >
      {filter.options.map(option => (
        <ActionMenu.Item
          key={option}
          title={option}
          selected={selectedValues.includes(option)}
          onPress={() => onToggle(option)}
        />
      ))}
    </ActionMenu>
  );
};

export const Filters = () => {
  const filters: Filter[] = [
    { id: 'epic', title: 'Epic', options: ['Refonte design', 'Onboarding', 'Facturation'] },
    { id: 'type', title: 'Type', options: ['Bug', 'Story', 'Tâche'] },
    {
      id: 'filtresRapides',
      title: 'Filtres rapides',
      options: ['Assigné à moi', 'En cours', 'En retard'],
      multi: true,
    },
  ];

  const [openId, setOpenId] = React.useState<FilterId | null>(null);
  const [singleSelected, setSingleSelected] = React.useState<Partial<Record<FilterId, string>>>({});
  const [multiSelected, setMultiSelected] = React.useState<Partial<Record<FilterId, string[]>>>({});

  const toggle = (filter: Filter, option: string) => {
    if (filter.multi) {
      setMultiSelected(prev => {
        const current = prev[filter.id] ?? [];
        return {
          ...prev,
          [filter.id]: current.includes(option) ? current.filter(o => o !== option) : [...current, option],
        };
      });
    } else {
      setSingleSelected(prev => ({
        ...prev,
        [filter.id]: prev[filter.id] === option ? undefined : option,
      }));
      setOpenId(null);
    }
  };

  return (
    <ScrollView
      horizontal
      nestedScrollEnabled
      directionalLockEnabled={Platform.OS === 'ios'}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ flexDirection: 'row', gap: 8, paddingHorizontal: 16 }}
    >
      {filters.map(filter => (
        <FilterMenu
          key={filter.id}
          filter={filter}
          isOpen={openId === filter.id}
          onOpenChange={open => setOpenId(open ? filter.id : null)}
          selection={filter.multi ? multiSelected[filter.id] : singleSelected[filter.id]}
          onToggle={option => toggle(filter, option)}
        />
      ))}
    </ScrollView>
  );
};

export const AvatarMenu = () => {
  const { color, radius } = useTheme();

  return (
    <Box style={{ display: 'flex', alignItems: 'center', height: 200 }}>
      <ActionMenu
        placement="bottom-end"
        renderTrigger={({ open }) => (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Menu du compte"
            style={{
              borderRadius: radius('sm'),
              outlineWidth: open ? 1 : 0,
              outlineStyle: 'solid',
              outlineColor: color.light.system.focus,
              backgroundColor: open ? `${color.light.system.focus}1A` : 'transparent',
            }}
          >
            <Avatar size="md" src="https://www.loremfaces.net/96/id/1.jpg" fallbackText="Clément Prod'homme" />
          </Pressable>
        )}
      >
        <ActionMenu.Item title="Mon profil" icon="User" />
        <ActionMenu.Item title="Paramètres" icon="Settings" />
        <ActionMenu.Item title="Aide" icon="Info" />
        <ActionMenu.Item title="Déconnexion" icon="LogOut" />
      </ActionMenu>
    </Box>
  );
};

export * as Sources from './ActionMenu.stories.sources';
