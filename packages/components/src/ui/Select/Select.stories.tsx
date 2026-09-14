import { useState } from 'react';
import { Box } from '../../core/Box';
import { Story } from '../../type';
import { Select } from './Select';
import { useStyles } from './Select.styles';
import type { SelectOption } from './Select.types';

export default {
  title: 'Select',
  tags: ['ui'],
  experimental: false,
  figmaURL: 'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Alveole---Composants?node-id=3663-520',
  description: [
    "Sélecteur mono-valeur avec label, hint et états d'erreur/succès.",
    '',
    'Le panneau est rendu par le design system sur les deux plateformes : liste déroulante au clavier sur web,',
    'bottom sheet sur mobile. Chaque option peut porter une icône, et l’option sélectionnée est signalée par un',
    'indicateur vertical. Les options partageant un même `group` sont regroupées sous un en-tête.',
  ].join('\n'),
  component: Select,
  styleFn: useStyles,
} satisfies Story;

const OPTIONS: SelectOption[] = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];

const ICON_OPTIONS: SelectOption[] = [
  { label: 'Document', value: 'document', icon: 'File' },
  { label: 'Contact', value: 'contact', icon: 'User' },
  { label: 'Échéance', value: 'echeance', icon: 'Clock' },
  { label: 'Dossier', value: 'dossier', icon: 'Folder' },
];

const GROUPED_OPTIONS: SelectOption[] = [
  { label: 'Bail commercial', value: 'bail-commercial', group: 'Contrats' },
  { label: 'Bail habitation', value: 'bail-habitation', group: 'Contrats' },
  { label: 'Quittance', value: 'quittance', group: 'Documents' },
  { label: 'État des lieux', value: 'edl', group: 'Documents' },
];

const LONG_OPTIONS: SelectOption[] = Array.from({ length: 60 }, (_, index) => ({
  label: `Option ${index + 1}`,
  value: `option-${index + 1}`,
}));

export const Default = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Box display="flex" flexDirection="column" gap={24}>
      <Select label="Sélection" placeholder="Choisir..." options={OPTIONS} value={value} onChange={setValue} />
    </Box>
  );
};

export const States = () => (
  <Box display="flex" flexDirection="column" gap={24}>
    <Select label="Avec valeur" options={OPTIONS} value="b" />
    <Select label="Erreur" options={OPTIONS} value={null} error="Ce champ est requis" />
    <Select label="Succès" options={OPTIONS} value="a" success="Valide" />
    <Select label="Désactivé" options={OPTIONS} value="a" disabled />
  </Box>
);

export const WithIcons = () => {
  const [value, setValue] = useState<string | null>('contact');
  return (
    <Box display="flex" flexDirection="column" gap={24}>
      <Select label="Type de ressource" options={ICON_OPTIONS} value={value} onChange={setValue} />
    </Box>
  );
};

export const Grouped = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Box display="flex" flexDirection="column" gap={24}>
      <Select
        label="Type de document"
        placeholder="Tous les types"
        options={GROUPED_OPTIONS}
        value={value}
        onChange={setValue}
      />
    </Box>
  );
};

export const LongList = () => {
  const [value, setValue] = useState<string | null>('option-42');
  return (
    <Box display="flex" flexDirection="column" gap={24}>
      <Select label="Liste défilante" options={LONG_OPTIONS} value={value} onChange={setValue} />
    </Box>
  );
};

export const Clearable = () => {
  const [value, setValue] = useState<string | null>('b');
  return (
    <Box display="flex" flexDirection="column" gap={24}>
      <Select
        label="Effaçable"
        placeholder="Choisir..."
        options={OPTIONS}
        value={value}
        onChange={setValue}
        clearable
      />
    </Box>
  );
};

export * as Sources from './Select.stories.sources';
