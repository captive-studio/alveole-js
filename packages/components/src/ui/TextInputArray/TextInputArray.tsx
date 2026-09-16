import React, { useId } from 'react';
import { Box } from '../../core/Box';
import { Button } from '../Button';
import { InputButtonAdornment } from '../InputButtonAdornment';
import { TextField } from '../TextField';

export type TextInputArrayValue = { value: string; _original: string | null };

export type TextInputArrayProps = {
  value?: TextInputArrayValue[];
  placeholder?: string;
  addTitle?: string;
  /** Supprimer les éléments vides à la sortie (par défaut: true) */
  removeEmpty?: boolean;
  /** Trim des valeurs à la sortie (par défaut: true) */
  trim?: boolean;
  /** Interdire les doublons à la sortie (par défaut: false) */
  dedupe?: boolean;
  /** Permet d'interdire la suppression de valeurs (par la valeur _original) */
  disabledDeleteForOriginals?: string[];
  onChange?: (value: TextInputArrayValue[]) => void;
};

type Item = { id: string; value: string; _original: string | null };
type Options = Pick<TextInputArrayProps, 'trim' | 'removeEmpty' | 'dedupe'>;

function normalizeOut(
  items: Item[],
  { trim = true, removeEmpty = true, dedupe = false }: Options,
): TextInputArrayValue[] {
  let out: TextInputArrayValue[] = items.map(i => ({ value: trim ? i.value.trim() : i.value, _original: i._original }));

  if (removeEmpty) out = out.filter(v => v.value.trim().length > 0);

  if (dedupe) {
    const seen = new Set<TextInputArrayValue['value']>();
    const uniq: TextInputArrayValue[] = [];
    for (const v of out) {
      if (seen.has(v.value)) continue;
      seen.add(v.value);
      uniq.push(v);
    }
    out = uniq;
  }

  return out;
}

function useTextFieldId(prefix: string) {
  const n = React.useRef(0);
  return React.useCallback(() => `${prefix}-${++n.current}`, [prefix]);
}

export const TextInputArray = (props: TextInputArrayProps) => {
  const {
    value = [],
    onChange,
    placeholder,
    removeEmpty = true,
    trim = true,
    dedupe = false,
    addTitle = 'Ajouter un élément',
    disabledDeleteForOriginals = [],
  } = props;

  const reactId = useId();
  const makeId = useTextFieldId(reactId);

  const [items, setItems] = React.useState<Item[]>(() =>
    (value.length ? value : []).map(v => ({ id: makeId(), ...v })),
  );

  const emit = React.useCallback(
    (next: Item[]) => {
      setItems(next);
      onChange?.(normalizeOut(next, { trim, removeEmpty, dedupe }));
    },
    [onChange, trim, removeEmpty, dedupe],
  );

  const addItem = React.useCallback(
    (atIndex?: number) => {
      const next: Item[] = [...items];
      const idx = typeof atIndex === 'number' ? Math.max(0, Math.min(atIndex + 1, next.length)) : next.length;
      next.splice(idx, 0, { id: makeId(), value: '', _original: null });
      emit(next);
    },
    [items, emit, makeId],
  );

  const removeItem = React.useCallback(
    (id: string) => {
      const next = items.filter(it => it.id !== id);
      if (next.length === 0) next.push({ id: makeId(), value: '', _original: null });
      emit(next);
    },
    [items, emit, makeId],
  );

  const updateItem = React.useCallback(
    (id: string, value: string) => {
      const next = items.map(it => (it.id === id ? { ...it, value } : it));
      emit(next);
    },
    [items, emit],
  );

  return (
    <Box tag="text-input-array">
      {items.map((item, index) => (
        <TextField
          key={item.id}
          label=""
          placeholder={placeholder}
          type="text"
          autoCapitalize="words"
          value={item.value}
          onChangeText={(txt: string) => updateItem(item.id, txt)}
          endAdornment={
            item._original != null && disabledDeleteForOriginals.includes(item._original) ? undefined : (
              <InputButtonAdornment
                icon="X"
                position="end"
                accessibilityLabel={`Retirer la ligne ${index + 1}`}
                onPress={() => removeItem(item.id)}
              />
            )
          }
          onBlur={() => emit(items)}
        />
      ))}

      <Box display="flex" flexDirection="row" pt={'100'} justify={'flex-start'}>
        <Button variant="tertiary" startIcon="Plus" title={addTitle} onPress={() => addItem()} />
      </Box>
    </Box>
  );
};
