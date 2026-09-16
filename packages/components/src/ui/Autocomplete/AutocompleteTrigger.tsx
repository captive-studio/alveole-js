import { Pressable, useWindowDimensions } from 'react-native';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { LucideIcon } from '../LucideIcon';
import { useStyles } from './Autocomplete.styles';
import { AutocompleteOption } from './Autocomplete.types';
import { AutocompleteChip } from './AutocompleteChip';

type Props = {
  selected: AutocompleteOption[];
  placeholder: string;
  isMulti: boolean;
  disabled?: boolean;
  onPress: () => void;
  onToggle: (option: AutocompleteOption) => void;
};

/** Au-dela des deux tiers de l'ecran, une puce tronque son libelle plutot que d'evincer les autres. */
const PART_D_ECRAN_MAX = 0.65;

/**
 * Le champ ferme : ce qu'on voit et ce qu'on presse quand la modale n'est pas ouverte.
 *
 * Il tient le role d'un champ de saisie sans en etre un : rien ne s'y tape, tout s'y lit. D'ou
 * le role de bouton, qui dit au clavier et au lecteur d'ecran ce qu'il fait vraiment.
 */
export const AutocompleteTrigger = ({ selected, placeholder, isMulti, disabled, onPress, onToggle }: Props) => {
  const styles = useStyles();
  const { width } = useWindowDimensions();

  return (
    <Pressable accessibilityRole="button" onPress={onPress} disabled={disabled} style={styles.input}>
      <Box style={styles.inputInner}>
        {selected.length === 0 ? (
          <Typography style={styles.inputPlaceholder}>{placeholder}</Typography>
        ) : (
          <Box display="flex" flexDirection="row" gap={'050'} flexWrap="wrap">
            {selected.map(option => (
              <AutocompleteChip
                key={option.value}
                isMulti={isMulti}
                label={option.label}
                onToggle={() => onToggle(option)}
                maxWidth={Math.round(width * PART_D_ECRAN_MAX)}
              />
            ))}
          </Box>
        )}

        <LucideIcon name="ChevronDown" size="sm" style={styles.autocompleteIcon} />
      </Box>
    </Pressable>
  );
};
