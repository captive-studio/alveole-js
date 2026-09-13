import React, { useState } from 'react';
import { Box } from '../../core/Box';
import { Story } from '../../type';
import { Autocomplete, AutocompleteOption, AutocompleteOptionWithGroup, AutocompleteProps } from './Autocomplete';
import { useStyles } from './Autocomplete.styles';

export default {
  title: 'Autocomplete',
  tags: ['ui'],
  experimental: false,
  description: "Champ de saisie avec autocomplétion. Supporte multi-sélection, groupes, création d'options.",
  component: Autocomplete,
  styleFn: useStyles,
} satisfies Story;

const BASE_OPTIONS: AutocompleteOption[] = [
  { value: '1', label: 'Élément 1' },
  { value: '2', label: 'Élément 2 — libellé long avec beaucoup de mots' },
  { value: '3', label: 'Élément 3' },
  { value: '4', label: 'Élément 4' },
  { value: '5', label: 'Élément 5' },
];

export const Default = () => {
  const [values, setValues] = useState<AutocompleteOption[]>([]);
  return (
    <Box minH={300}>
      <Autocomplete
        label="Sélection multiple"
        placeholder="Rechercher..."
        options={BASE_OPTIONS}
        value={values}
        onChange={setValues}
      />
    </Box>
  );
};

export const SingleValue = () => {
  const [values, setValues] = useState<AutocompleteOption[]>([]);
  return (
    <Box minH={300}>
      <Autocomplete
        label="Sélection unique"
        placeholder="Choisir..."
        isMulti={false}
        autoFocus={false}
        options={BASE_OPTIONS}
        value={values}
        onChange={setValues}
      />
    </Box>
  );
};

export const WithSearch = () => {
  const [values, setValues] = useState<AutocompleteOption[]>([]);
  const [options, setOptions] = useState<AutocompleteOption[]>([]);
  const onSearchChange: AutocompleteProps['onSearchChange'] = search => {
    setOptions(
      search
        ? [
            { value: `${search}-1`, label: `${search} — résultat 1` },
            { value: `${search}-2`, label: `${search} — résultat 2` },
          ]
        : [],
    );
  };
  return (
    <Box minH={300}>
      <Autocomplete
        label="Recherche dynamique"
        placeholder="Saisir pour chercher..."
        options={options}
        value={values}
        onChange={setValues}
        onSearchChange={onSearchChange}
        disabledFilterSearch
      />
    </Box>
  );
};

export const WithGroups = () => {
  const [values, setValues] = React.useState<AutocompleteOptionWithGroup[]>([]);
  const options: AutocompleteOptionWithGroup[] = [
    { value: 'brief-collectif', label: 'Brief collectif', group: 'Coaching' },
    { value: 'brief-individuel', label: 'Brief individuel', group: 'Coaching' },
    { value: 'formation-module', label: 'Formation module', group: 'Formation' },
    { value: 'formation-externe', label: 'Formation externe', group: 'Formation' },
  ];
  return (
    <Box minH={300}>
      <Autocomplete
        label="Avec groupes"
        placeholder="Choisir..."
        options={options}
        value={values}
        onChange={v => setValues(v as AutocompleteOptionWithGroup[])}
      />
    </Box>
  );
};

export const AllowCreate = () => {
  const [values, setValues] = useState<AutocompleteOption[]>([]);
  return (
    <Box minH={300}>
      <Autocomplete
        label="Avec création"
        placeholder="Rechercher ou créer..."
        allowCreate
        options={BASE_OPTIONS}
        value={values}
        onChange={setValues}
      />
    </Box>
  );
};

export * as Sources from './Autocomplete.stories.sources';
