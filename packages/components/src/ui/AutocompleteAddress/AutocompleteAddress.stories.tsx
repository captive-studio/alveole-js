import { useState } from 'react';
import { Box } from '../../core/Box';
import { Story } from '../../type';
import { AutocompleteOption } from '../Autocomplete';
import { AutocompleteAddress, AutocompleteAddressProps } from './AutocompleteAddress';

export default {
  title: 'AutocompleteAddress',
  tags: ['ui'],
  experimental: true,
  description:
    'Champ adresse basé sur Autocomplete. Le consommateur fournit les suggestions via onSearchChange/suggestions.',
  component: AutocompleteAddress,
  styleFn: () => ({}),
} satisfies Story;

const MOCK_SUGGESTIONS: AutocompleteOption[] = [
  { value: 'place-1', label: '3 rue Robespierre, 75011 Paris' },
  { value: 'place-2', label: '10 avenue de la République, 75011 Paris' },
  { value: 'place-3', label: '5 boulevard Voltaire, 75011 Paris' },
];

export const Default = () => {
  const [value, setValue] = useState<AutocompleteOption[]>([]);
  const [suggestions, setSuggestions] = useState<AutocompleteOption[]>([]);

  const onSearchChange: AutocompleteAddressProps['onSearchChange'] = query => {
    setSuggestions(query && query.length >= 3 ? MOCK_SUGGESTIONS : []);
  };

  return (
    <Box minH={300}>
      <AutocompleteAddress
        label="Adresse"
        value={value}
        suggestions={suggestions}
        onSearchChange={onSearchChange}
        onPlaceSelected={(placeId: string) => {
          const found = MOCK_SUGGESTIONS.find(s => s.value === placeId);
          if (found) setValue([found]);
        }}
        onClear={() => setValue([])}
      />
    </Box>
  );
};

export * as Sources from './AutocompleteAddress.stories.sources';
