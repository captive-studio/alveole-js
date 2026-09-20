import React, { useId } from 'react';
import {
  insereUnElement,
  Item,
  metAJourUnElement,
  normalizeOut,
  OptionsDeSortie,
  retireUnElement,
  TextInputArrayValue,
} from './TextInputArray.liste';

// `useId` ne donne qu'un identifiant par composant : les lignes en derivent le leur par un
// compteur, pour rester uniques entre plusieurs champs montes sur la meme page.
function useTextFieldId(prefix: string) {
  const n = React.useRef(0);
  return React.useCallback(() => `${prefix}-${++n.current}`, [prefix]);
}

type Parametres = OptionsDeSortie & {
  valeurInitiale: TextInputArrayValue[];
  onChange?: (value: TextInputArrayValue[]) => void;
};

// Le composant n'avait plus qu'a lire : la liste, ses trois mutations et la notification de
// sortie vivent ici, et les regles elles-memes sont dans `TextInputArray.liste`.
export const useTextInputArrayItems = ({ valeurInitiale, onChange, trim, removeEmpty, dedupe }: Parametres) => {
  const creeId = useTextFieldId(useId());
  const [items, setItems] = React.useState<Item[]>(() => valeurInitiale.map(v => ({ id: creeId(), ...v })));

  const emit = React.useCallback(
    (next: Item[]) => {
      setItems(next);
      onChange?.(normalizeOut(next, { trim, removeEmpty, dedupe }));
    },
    [onChange, trim, removeEmpty, dedupe],
  );

  const addItem = React.useCallback(
    (atIndex?: number) => emit(insereUnElement(items, creeId, atIndex)),
    [items, emit, creeId],
  );

  const removeItem = React.useCallback((id: string) => emit(retireUnElement(items, id, creeId)), [items, emit, creeId]);

  const updateItem = React.useCallback(
    (id: string, value: string) => emit(metAJourUnElement(items, id, value)),
    [items, emit],
  );

  return { items, addItem, removeItem, updateItem, notifier: () => emit(items) };
};
