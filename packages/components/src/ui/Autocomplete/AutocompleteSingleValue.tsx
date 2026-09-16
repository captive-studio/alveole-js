import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Button } from '../Button';
import { Divider } from '../Divider';
import { LucideIcon } from '../LucideIcon';
import { useStyles } from './Autocomplete.styles';
import { AutocompleteOption } from './Autocomplete.types';

type Props = {
  selected: AutocompleteOption[];
  allowEmpty: boolean;
  disabledSearch?: boolean;
  onClear: () => void;
};

/**
 * Rappelle en tete de modale le choix deja fait, en mode simple seulement.
 *
 * En mode multiple les puces du champ jouent ce role, mais elles disparaissent derriere la
 * modale : sans ce rappel, l'utilisateur d'un champ a choix unique ne verrait nulle part ce
 * qu'il a deja retenu, ni comment l'effacer.
 */
export const AutocompleteSingleValue = ({ selected, allowEmpty, disabledSearch, onClear }: Props) => {
  const styles = useStyles();

  if (selected.length === 0) return null;

  return (
    <Box pl="100" pr="100">
      <Box mt={'auto'}>
        <Box display="flex" pl={'100'} flexDirection="row" gap={'050'}>
          <LucideIcon name="Check" size="md" style={{ margin: 'auto' }} />
          <Typography mr={48} mt={4} style={styles.nativeSimpleValue}>
            {selected[0]?.label}
          </Typography>
        </Box>

        {allowEmpty && (
          <>
            <Box display="flex" flexDirection="row" justify={'flex-end'} mt={'050'}>
              <Button noPadding title="Effacer" size="md" variant="tertiary" endIcon={'Trash'} onPress={onClear} />
            </Box>
            {disabledSearch && <Divider mt={'050'} />}
          </>
        )}
      </Box>
    </Box>
  );
};
