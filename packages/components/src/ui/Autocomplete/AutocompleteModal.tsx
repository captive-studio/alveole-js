import { RefObject } from 'react';
import { KeyboardAvoidingView, Modal, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { ButtonIcon } from '../Button';
import { Divider } from '../Divider';
import { TextInputElement } from '../FormControl';
import { TextField } from '../TextField';
import { useStyles } from './Autocomplete.styles';
import { AutocompleteOption } from './Autocomplete.types';
import { AutocompleteCreateRow } from './AutocompleteCreateRow';
import { AutocompleteResults } from './AutocompleteResults';
import { AutocompleteSingleValue } from './AutocompleteSingleValue';
import { Reglages } from './autocompleteReglages';

type Props = {
  reglages: Reglages;
  open: boolean;
  onClose: () => void;
  searchRef: RefObject<TextInputElement | null>;
  query: string;
  onQueryChange: (texte: string) => void;
  selected: AutocompleteOption[];
  options: AutocompleteOption[];
  estSelectionnee: (option: AutocompleteOption) => boolean;
  onToggle: (option: AutocompleteOption) => void;
  onClear: () => void;
  peutCreer: boolean;
  onCreate: () => void;
};

/**
 * La surface de selection, hors web : une modale plein ecran plutot qu'un menu deroulant.
 *
 * Sur un telephone il n'y a pas la place d'afficher une liste sous le champ sans recouvrir ce
 * qui compte, et le clavier mange la moitie de l'ecran des qu'on cherche. D'ou le
 * `KeyboardAvoidingView`, et le retrait du haut par les marges de securite.
 */
export const AutocompleteModal = (props: Props) => {
  const { reglages, open, onClose, searchRef, query, selected, options, peutCreer } = props;
  const { label, placeholder, isMulti, allowEmpty, disabledSearch, disabledFilterSearch } = reglages;
  const styles = useStyles();
  const { top, bottom } = useSafeAreaInsets();

  return (
    <Modal visible={open} animationType="fade" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        style={{ ...styles.modalOverlay, flex: 1, paddingTop: top }}
      >
        <Box style={{ ...styles.modalContent }}>
          <Box tag="modal-header" style={styles.modalHeader}>
            <Typography style={styles.nativeLabel}>{label ?? 'Sélection'}</Typography>
            <Box ml={'auto'} mr="100">
              <ButtonIcon icon="Check" variant="primary" accessibilityLabel="Valider la selection" onPress={onClose} />
            </Box>
          </Box>

          <Divider mt={'050'} mb={'050'} />

          {!isMulti && (
            <AutocompleteSingleValue
              selected={selected}
              allowEmpty={allowEmpty}
              disabledSearch={disabledSearch}
              onClear={props.onClear}
            />
          )}

          {!disabledSearch && (
            <Box pl="100" pr="100" pb="100">
              <TextField
                ref={searchRef}
                label=""
                value={query}
                onChangeText={props.onQueryChange}
                placeholder={placeholder ?? 'Rechercher…'}
                editable={!disabledFilterSearch}
              />
            </Box>
          )}

          {peutCreer && (
            <AutocompleteCreateRow label={reglages.createOptionLabel(query.trim())} onPress={props.onCreate} />
          )}

          <AutocompleteResults
            options={options}
            estSelectionnee={props.estSelectionnee}
            onToggle={props.onToggle}
            paddingBottom={bottom}
            creationProposee={peutCreer}
          />
        </Box>
      </KeyboardAvoidingView>
    </Modal>
  );
};
