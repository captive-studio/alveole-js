import React, { useState } from 'react';
import { TextInputElement } from '../FormControl';
import { AutocompleteOption, AutocompleteProps } from './Autocomplete.types';
import { AutocompleteFrame } from './AutocompleteFrame';
import { AutocompleteModal } from './AutocompleteModal';
import { AutocompleteTrigger } from './AutocompleteTrigger';
import { filtrerOptions, porteDejaLeLibelle } from './autocompleteFiltering';
import { avecDefauts } from './autocompleteReglages';
import { useAutocompleteSelection } from './useAutocompleteSelection';
import { useDebouncedSearch } from './useDebouncedSearch';

export * from './Autocomplete.types';

/** La modale n'est pas encore montee a l'instant ou on l'ouvre : viser le champ trop tot ne trouve rien. */
const DELAI_AVANT_FOCUS = 250;

export const Autocomplete = (props: AutocompleteProps) => {
  const reglages = avecDefauts(props);
  const { options, isMulti, disabled, disabledFilterSearch, autoFocus, allowCreate } = reglages;

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useDebouncedSearch(reglages.onSearchChange);
  const searchRef = React.useRef<TextInputElement>(null);

  const { selected, rangParValeur, basculer, creerDepuis, vider } = useAutocompleteSelection(reglages);

  const estSelectionnee = (option: AutocompleteOption) => rangParValeur.has(option.value);

  // Sans `useMemo` : le compilateur React memorise ces deux calculs lui-meme, et une
  // memorisation ecrite a la main l'empeche de le faire.
  const hasExactLabel = porteDejaLeLibelle(options, selected, query);
  const filteredOptions = filtrerOptions(options, query, { sansFiltre: disabledFilterSearch, isMulti, rangParValeur });

  const peutCreer = allowCreate && query.trim().length > 0 && !hasExactLabel;

  const ouvrir = () => {
    if (disabled) return;
    setQuery('');
    setOpen(true);
    if (autoFocus) setTimeout(() => searchRef.current?.focus(), DELAI_AVANT_FOCUS);
  };

  // `basculer` et `creerDepuis` rendent vrai quand le choix est fait : c'est ce qui referme.
  const toggleOption = (option: AutocompleteOption) => {
    if (basculer(option)) setOpen(false);
  };

  const creer = () => {
    if (creerDepuis(query)) setOpen(false);
    setQuery('');
  };

  return (
    <AutocompleteFrame {...reglages}>
      <AutocompleteTrigger
        selected={selected}
        placeholder={reglages.placeholder}
        isMulti={isMulti}
        disabled={disabled}
        onPress={ouvrir}
        onToggle={toggleOption}
      />

      <AutocompleteModal
        reglages={reglages}
        open={open}
        onClose={() => setOpen(false)}
        searchRef={searchRef}
        query={query}
        onQueryChange={setQuery}
        selected={selected}
        options={filteredOptions}
        estSelectionnee={estSelectionnee}
        onToggle={toggleOption}
        onClear={vider}
        peutCreer={peutCreer}
        onCreate={creer}
      />
    </AutocompleteFrame>
  );
};
