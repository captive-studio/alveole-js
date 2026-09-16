import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { AutocompleteOption } from './Autocomplete.types';
import { AutocompleteOptionList } from './AutocompleteOptionList';

type Props = {
  options: AutocompleteOption[];
  estSelectionnee: (option: AutocompleteOption) => boolean;
  onToggle: (option: AutocompleteOption) => void;
  paddingBottom: number;
  creationProposee: boolean;
};

/**
 * La liste, ou ce qui la remplace quand elle est vide.
 *
 * Le vide ne s'annonce pas quand la creation vient d'etre proposee : dire « aucun resultat »
 * juste sous « Ajouter « Brest » » repeterait la meme chose en la faisant passer pour un echec.
 */
export const AutocompleteResults = ({ options, estSelectionnee, onToggle, paddingBottom, creationProposee }: Props) => {
  if (options.length === 0) {
    if (creationProposee) return null;

    return (
      <Box pl="100" pr="100">
        <Typography>Aucun résultat</Typography>
      </Box>
    );
  }

  return (
    <AutocompleteOptionList
      options={options}
      estSelectionnee={estSelectionnee}
      onToggle={onToggle}
      paddingBottom={paddingBottom}
    />
  );
};
