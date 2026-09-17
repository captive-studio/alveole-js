import { act, fireEvent } from '@/__tests__/helpers/renderNative';
import type { SelectOption } from '@/src/ui/Select/Select.types';
import React from 'react';
import { ScrollView } from 'react-native';

/**
 * Le Sheet Tamagui s'anime : dans l'environnement de test il reste monté mais avec
 * `pointerEvents: 'none'`, ce qui rend ses options impossibles à presser. On le remplace
 * par un rendu conditionnel simple pour éprouver la logique du Select, pas l'animation.
 * Le comportement réel du sheet (drag, overlay, retour Android) se vérifie sur appareil.
 *
 * À appeler depuis le `jest.mock('tamagui', …)` de chaque module de test : la fabrique
 * est hissée avant les imports, elle ne peut donc pas fermer sur une valeur du module.
 */
export const mockTamaguiSheet = () => {
  const actual = jest.requireActual('tamagui');
  const { View } = jest.requireActual('react-native');
  const ReactActual = jest.requireActual('react');

  const Sheet = (props: { children: React.ReactNode; open?: boolean }) =>
    props.open ? ReactActual.createElement(View, null, props.children) : null;

  const Overlay = () => null;
  Overlay.displayName = 'SheetOverlay';
  Sheet.Overlay = Overlay;

  const Handle = () => null;
  Handle.displayName = 'SheetHandle';
  Sheet.Handle = Handle;

  const Frame = (props: { children: React.ReactNode }) => ReactActual.createElement(View, null, props.children);
  Frame.displayName = 'SheetFrame';
  Sheet.Frame = Frame;

  const SheetScrollView = ReactActual.forwardRef((props: object, ref: React.Ref<ScrollView>) =>
    ReactActual.createElement(View, { ref, ...props }),
  );
  SheetScrollView.displayName = 'SheetScrollView';
  Sheet.ScrollView = SheetScrollView;

  return { ...actual, Sheet };
};

export const OPTIONS: SelectOption[] = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];

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
