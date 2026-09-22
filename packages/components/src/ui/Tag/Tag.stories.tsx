import { Box } from '../../core/Box';
import { Story } from '../../type';
import { Tag } from './Tag';
import { useStyles } from './Tag.styles';

export default {
  title: 'Tag',
  tags: ['ui'],
  experimental: false,
  figmaURL: 'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Alveole---Composants?node-id=1002-8509',
  description:
    "Étiquette grise et descriptive. `selected` marque un tag actif, `closable` et `onClose` ajoutent une croix de suppression, et `icon` place une icône avant le libellé. Le survol fonce le libellé sans toucher la bordure ; c'est la sélection qui fonce la bordure, indépendamment du survol (ADR 0020). Le survol ne s'applique qu'aux étiquettes manipulables : une étiquette sans `closable` ni `interactive` est descriptive et reste inerte (ADR 0019). `selected` ne décrit qu'un état.",
  component: Tag,
  styleFn: useStyles,
} satisfies Story;

export const Sizes = () => (
  <Box display="flex" flexDirection="row" gap={24} flexWrap="wrap">
    <Tag size="sm">Tag sm</Tag>
    <Tag size="md">Tag md</Tag>
  </Box>
);

export const Selection = () => (
  <Box display="flex" flexDirection="column" gap={16}>
    {(['sm', 'md'] as const).map(size => (
      <Box key={size} display="flex" flexDirection="row" gap={24} flexWrap="wrap">
        <Tag size={size}>Descriptive, inerte</Tag>
        <Tag size={size} interactive>
          Au repos, dans un groupe
        </Tag>
        <Tag size={size} interactive selected>
          Sélectionné
        </Tag>
        <Tag size={size} selected closable onClose={() => {}}>
          Sélectionné et fermable
        </Tag>
      </Box>
    ))}
  </Box>
);

export const Fermable = () => (
  <Box display="flex" flexDirection="row" gap={24} flexWrap="wrap">
    <Tag size="sm" closable onClose={() => {}}>
      Fermable sm
    </Tag>
    <Tag size="md" closable onClose={() => {}}>
      Fermable md
    </Tag>
    <Tag size="md" closable selected onClose={() => {}}>
      Fermable et sélectionné
    </Tag>
  </Box>
);

export const AvecIcone = () => (
  <Box display="flex" flexDirection="row" gap={24} flexWrap="wrap">
    <Tag size="sm" icon="Check">
      Validé
    </Tag>
    <Tag size="md" icon="Clock">
      En attente
    </Tag>
    <Tag size="md" icon="Tag" closable onClose={() => {}}>
      Icône et croix
    </Tag>
    <Tag size="md" icon="Tag" closable selected onClose={() => {}}>
      Tout à la fois
    </Tag>
  </Box>
);

export const LibelleLong = () => (
  <Box display="flex" flexDirection="row" gap={24} style={{ maxWidth: 260 }}>
    <Tag size="md" closable onClose={() => {}}>
      Un libellé beaucoup trop long pour la place disponible
    </Tag>
  </Box>
);

export * as Sources from './Tag.stories.sources';
