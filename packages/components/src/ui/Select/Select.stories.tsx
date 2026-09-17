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
    "Sélecteur d'une ou plusieurs options, avec label, hint et états d'erreur/succès.",
    '',
    'Le panneau est rendu par le design system sur les deux plateformes : liste déroulante au clavier sur web,',
    'bottom sheet sur mobile. Chaque option peut porter une icône, et l’option sélectionnée est signalée par un',
    'indicateur vertical. Les options partageant un même `group` sont regroupées sous un en-tête.',
    '',
    '`multiple` bascule la valeur de `string | null` à `string[]` : le type de `onChange` suit, sans générique.',
    'Le composant reste **strictement contrôlé**, y compris pour la création d’option : `onCreateOption` reçoit',
    'la saisie, à l’appelant d’ajouter l’option à `options` puis de mettre `value` à jour.',
    '',
    '### Migration depuis `Autocomplete`',
    '',
    // Cellules en texte brut : le rendu Markdown du catalogue échoue sur du code
    // inline dans un tableau.
    '| Autocomplete | Select |',
    '| --- | --- |',
    '| value: AutocompleteOption[] | value: string ou null (mono), string[] (multiple) |',
    '| isMulti | multiple |',
    '| isSearchable | searchable |',
    '| disabledFilterSearch | localFilter={false} |',
    '| allowEmpty | clearable |',
    '| allowCreate | creatable |',
    '| onCreateOption(option) | onCreateOption(query) |',
    '| createOptionLabel | createLabel |',
    '| createOptionValue | supprimé : l’appelant fabrique l’option |',
    '| onChange(value, meta) | onChange(value) — le second argument disparaît |',
    '',
    '`AutocompleteAddress` se recompose avec `searchable localFilter={false} creatable` : `onPlaceSelected`',
    'devient `onChange`, `onCustomAddress` devient `onCreateOption`, `onClear` devient `onChange(null)`.',
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

const CITY_OPTIONS: SelectOption[] = [
  { label: 'Bordeaux', value: 'bordeaux' },
  { label: 'Lille', value: 'lille' },
  { label: 'Lyon', value: 'lyon' },
  { label: 'Marseille', value: 'marseille' },
  { label: 'Nantes', value: 'nantes' },
  { label: 'Paris', value: 'paris' },
  { label: 'Toulouse', value: 'toulouse' },
];

const ADDRESS_SUGGESTIONS: SelectOption[] = [
  { label: '3 rue Robespierre, 75011 Paris', value: 'place-1' },
  { label: '10 avenue de la République, 75011 Paris', value: 'place-2' },
  { label: '5 boulevard Voltaire, 75011 Paris', value: 'place-3' },
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

/** `searchable` ajoute un champ de recherche au panneau et filtre les options sur leur libellé. */
export const Searchable = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Box display="flex" flexDirection="column" gap={24}>
      <Select
        label="Ville"
        placeholder="Choisir..."
        searchable
        options={CITY_OPTIONS}
        value={value}
        onChange={setValue}
      />
    </Box>
  );
};

/**
 * Recherche distante : `localFilter={false}` laisse le filtrage au serveur, et
 * `onSearchChange` reçoit la saisie une fois stabilisée. Ici la « requête » est simulée.
 */
export const RemoteSearch = () => {
  const [value, setValue] = useState<string | null>(null);
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(false);

  const search = (query: string) => {
    if (query.length < 3) {
      setOptions([]);
      return;
    }
    setLoading(true);
    setOptions([
      { label: `${query} — résultat 1`, value: `${query}-1` },
      { label: `${query} — résultat 2`, value: `${query}-2` },
    ]);
    setLoading(false);
  };

  return (
    <Box display="flex" flexDirection="column" gap={24}>
      <Select
        label="Recherche distante"
        placeholder="Saisir au moins 3 caractères..."
        searchable
        localFilter={false}
        loading={loading}
        emptyMessage="Saisir au moins 3 caractères"
        options={options}
        value={value}
        onChange={setValue}
        onSearchChange={search}
      />
    </Box>
  );
};

/** `multiple` fait de la valeur un tableau. Les valeurs retenues s’affichent en puces retirables. */
export const Multiple = () => {
  const [values, setValues] = useState<string[]>(['a']);
  return (
    <Box display="flex" flexDirection="column" gap={24}>
      <Select
        label="Sélection multiple"
        placeholder="Choisir..."
        multiple
        clearable
        options={OPTIONS}
        value={values}
        onChange={setValues}
      />
    </Box>
  );
};

/**
 * `creatable` propose d’ajouter la saisie à la liste. Le composant restant contrôlé,
 * c’est l’appelant qui insère l’option puis met la valeur à jour.
 */
export const Creatable = () => {
  const [options, setOptions] = useState<SelectOption[]>(OPTIONS);
  const [values, setValues] = useState<string[]>([]);

  const createOption = (query: string) => {
    setOptions(current => [...current, { label: query, value: query }]);
    setValues(current => [...current, query]);
  };

  return (
    <Box display="flex" flexDirection="column" gap={24}>
      <Select
        label="Étiquettes"
        placeholder="Rechercher ou créer..."
        multiple
        searchable
        creatable
        options={options}
        value={values}
        onChange={setValues}
        onCreateOption={createOption}
      />
    </Box>
  );
};

/**
 * Champ adresse : recherche distante et saisie libre autorisée. Ce préréglage remplace
 * l’ancien composant `AutocompleteAddress`.
 */
export const Address = () => {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [value, setValue] = useState<string | null>(null);

  const search = (query: string) => {
    setOptions(query.length >= 3 ? ADDRESS_SUGGESTIONS : []);
  };

  const createAddress = (query: string) => {
    setOptions(current => [...current, { label: query, value: query }]);
    setValue(query);
  };

  return (
    <Box display="flex" flexDirection="column" gap={24}>
      <Select
        label="Adresse"
        placeholder="ex : 3 rue Robespierre"
        searchable
        localFilter={false}
        creatable
        clearable
        emptyMessage="Saisir au moins 3 caractères"
        createLabel={query => `Utiliser « ${query} »`}
        options={options}
        value={value}
        onChange={setValue}
        onSearchChange={search}
        onCreateOption={createAddress}
      />
    </Box>
  );
};

export * as Sources from './Select.stories.sources';
