import React from 'react';
import { Keyboard } from 'react-native';
import type { SelectProps, SelectRef } from './Select.types';
import { useDebouncedCallback } from './useDebouncedCallback';

/**
 * L'etat du panneau natif : ouverture, recherche en cours, et la poignee imperative que le
 * formulaire appelant utilise pour donner ou retirer le focus. Rien de tout cela ne se voit
 * dans le rendu, qui ne lit que `open` et `query`.
 */
export const usePanneauSelect = (
  {
    disabled,
    onFocus,
    onBlur,
    onSearchChange,
  }: Pick<SelectProps, 'disabled' | 'onFocus' | 'onBlur' | 'onSearchChange'>,
  ref: React.ForwardedRef<SelectRef>,
) => {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');

  const debouncedSearchChange = useDebouncedCallback((text: string) => onSearchChange?.(text));

  const ouvrir = React.useCallback(() => {
    if (disabled) return;
    // Le clavier d'un champ precedent recouvrirait le panneau qui monte.
    if (Keyboard.isVisible()) Keyboard.dismiss();
    setQuery('');
    setOpen(true);
    onFocus?.();
  }, [disabled, onFocus]);

  const fermer = React.useCallback(() => {
    setOpen(false);
    onBlur?.();
  }, [onBlur]);

  React.useImperativeHandle(ref, () => ({ focus: ouvrir, blur: fermer, open: ouvrir, close: fermer }), [
    fermer,
    ouvrir,
  ]);

  return {
    open,
    query,
    ouvrir,
    setOpen: React.useCallback((suivant: boolean) => (suivant ? ouvrir() : fermer()), [fermer, ouvrir]),
    onQueryChange: (text: string) => {
      setQuery(text);
      debouncedSearchChange(text);
    },
  };
};
