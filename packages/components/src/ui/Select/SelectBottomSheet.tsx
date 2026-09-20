import React from 'react';
import { InteractionManager } from 'react-native';
import { Box } from '../../core/Box';
import { BottomSheet } from '../BottomSheet';
import { Button } from '../Button';
import { TextInputElement } from '../FormControl';
import { TextField } from '../TextField';
import { SelectOptionsList, type SelectPanelProps } from './SelectOptionsList';
import { textesDuPanneau } from './selectReglages';

export type SelectBottomSheetProps = SelectPanelProps;

export const SelectBottomSheet = (props: SelectBottomSheetProps) => {
  const { open, setOpen, title, multiple, searchable, query, onQueryChange } = props;

  const { searchPlaceholder } = textesDuPanneau(props);

  const searchRef = React.useRef<TextInputElement>(null);

  // Le focus n'est pris qu'une fois l'animation d'ouverture terminée : pendant
  // celle-ci le champ n'est pas encore mesuré et le clavier se referme aussitôt.
  React.useEffect(() => {
    if (!open || !searchable) return;
    const task = InteractionManager.runAfterInteractions(() => searchRef.current?.focus());
    return () => task.cancel();
  }, [open, searchable]);

  return (
    <BottomSheet
      open={open}
      setOpen={setOpen}
      title={title}
      fitContent
      moveOnKeyboardChange={searchable}
      action={
        multiple ? (
          <Button testID="select-validate" title="Valider" size="sm" variant="primary" onPress={() => setOpen(false)} />
        ) : undefined
      }
    >
      {searchable && (
        <Box pl="2W" pr="2W" pb="1W">
          <TextField
            ref={searchRef}
            testID="select-search"
            label=""
            accessibilityLabel="Rechercher"
            value={query}
            onChangeText={onQueryChange}
            placeholder={searchPlaceholder}
          />
        </Box>
      )}

      <SelectOptionsList {...props} />
    </BottomSheet>
  );
};
