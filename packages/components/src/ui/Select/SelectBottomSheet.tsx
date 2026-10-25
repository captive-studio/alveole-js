import React from 'react';
import { Box } from '../../core/Box';
import { BottomSheet } from '../BottomSheet';
import { Button } from '../Button';
import { TextInput, TextInputElement } from '../FormControl';
import { SelectOptionsList, type SelectPanelProps } from './SelectOptionsList';
import { textesDuPanneau } from './selectReglages';

export type SelectBottomSheetProps = SelectPanelProps;

export const SelectBottomSheet = (props: SelectBottomSheetProps) => {
  const { open, setOpen, title, multiple, searchable, query, onQueryChange, sheetSnapPoints } = props;

  const { searchPlaceholder } = textesDuPanneau(props);

  const searchRef = React.useRef<TextInputElement>(null);

  // Le focus n'est pris qu'une fois l'animation d'ouverture terminée : pendant
  // celle-ci le champ n'est pas encore mesuré et le clavier se referme aussitôt.
  // `requestIdleCallback` remplace `InteractionManager`, retiré de React Native 0.88.
  React.useEffect(() => {
    if (!open || !searchable) return;
    const handle = requestIdleCallback(() => searchRef.current?.focus());
    return () => cancelIdleCallback(handle);
  }, [open, searchable]);

  return (
    <BottomSheet
      open={open}
      setOpen={setOpen}
      title={title}
      {...(sheetSnapPoints != null ? { points: sheetSnapPoints } : { fitContent: true as const })}
      moveOnKeyboardChange={searchable}
      action={
        multiple ? (
          <Button testID="select-validate" title="Valider" size="sm" variant="primary" onPress={() => setOpen(false)} />
        ) : undefined
      }
    >
      {searchable && (
        <Box pl="2W" pr="2W" pb="1W">
          <TextInput
            ref={searchRef}
            testID="select-search"
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
