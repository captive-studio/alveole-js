import { Box } from '../../core/Box';
import { Button } from '../Button';
import { InputButtonAdornment } from '../InputButtonAdornment';
import { TextField } from '../TextField';
import { TextInputArrayValue } from './TextInputArray.liste';
import { useTextInputArrayItems } from './useTextInputArrayItems';

export type { TextInputArrayValue };

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

  const { items, addItem, removeItem, updateItem, notifier } = useTextInputArrayItems({
    valeurInitiale: value,
    onChange,
    trim,
    removeEmpty,
    dedupe,
  });

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
          onBlur={notifier}
        />
      ))}

      <Box display="flex" flexDirection="row" pt={'100'} justify={'flex-start'}>
        <Button variant="tertiary" startIcon="Plus" title={addTitle} onPress={() => addItem()} />
      </Box>
    </Box>
  );
};
