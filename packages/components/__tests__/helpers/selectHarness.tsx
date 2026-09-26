import { act, fireEvent, renderNative } from '@/__tests__/helpers/renderNative';
import { FormControl } from '@/src/ui/FormControl';
import type { SelectOption } from '@/src/ui/Select/Select.types';
import React from 'react';

export const OPTIONS: SelectOption[] = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];

const dansUnFormControl = (select: React.ReactElement) => <FormControl label="Pays">{select}</FormControl>;

/** Monte le Select comme on l'emploie : nommé par son FormControl. */
export const renderSelect = async (select: React.ReactElement) => {
  const view = await renderNative(dansUnFormControl(select));
  return { ...view, rerender: (suivant: React.ReactElement) => view.rerender(dansUnFormControl(suivant)) };
};

/** L'ouverture et la fermeture du panneau passent par un état : il faut laisser React le propager. */
export const press = async (element: Parameters<typeof fireEvent.press>[0]) => {
  await act(async () => {
    fireEvent.press(element);
  });
};

/** Saisit dans le champ de recherche du panneau. */
export const search = async (element: Parameters<typeof fireEvent.changeText>[0], query: string) => {
  await act(async () => {
    fireEvent.changeText(element, query);
  });
};
