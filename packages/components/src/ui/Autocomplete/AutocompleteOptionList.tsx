import { FlashList } from '@shopify/flash-list';
import { Pressable, ViewStyle } from 'react-native';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Divider } from '../Divider';
import { LucideIcon } from '../LucideIcon';
import { useStyles } from './Autocomplete.styles';
import { AutocompleteOption, isAutocompleteOptionWithGroup } from './Autocomplete.types';

/**
 * Une option ouvre un groupe quand elle en a un et que celle qui la precede n'a pas le meme.
 * L'en-tete n'est donc pose qu'a la frontiere : le repeter a chaque ligne noierait la liste,
 * l'omettre laisserait des options sans rattachement visible.
 */
export const ouvreUnGroupe = (option: AutocompleteOption, precedente: AutocompleteOption | undefined) =>
  isAutocompleteOptionWithGroup(option) &&
  (!isAutocompleteOptionWithGroup(precedente) || precedente.group !== option.group);

type Props = {
  options: AutocompleteOption[];
  estSelectionnee: (option: AutocompleteOption) => boolean;
  onToggle: (option: AutocompleteOption) => void;
  paddingBottom: number;
};

export const AutocompleteOptionList = ({ options, estSelectionnee, onToggle, paddingBottom }: Props) => {
  const styles = useStyles();

  return (
    <FlashList
      data={options}
      keyExtractor={item => item.value}
      keyboardShouldPersistTaps="handled"
      ItemSeparatorComponent={Divider}
      contentContainerStyle={{ paddingBottom }}
      renderItem={({ item, index }) => {
        const selectionnee = estSelectionnee(item);

        return (
          <>
            {ouvreUnGroupe(item, options[index - 1]) && isAutocompleteOptionWithGroup(item) && (
              <Typography style={styles.groupHeader}>{item.group}</Typography>
            )}
            <Pressable
              accessibilityRole="button"
              onPress={() => onToggle(item)}
              style={{
                ...(styles.nativeItem as ViewStyle),
                backgroundColor: selectionnee
                  ? styles.nativeItemSelected.backgroundColor
                  : styles.nativeItem.backgroundColor,
              }}
            >
              <Box display="flex" flexDirection="row" justify="space-between">
                <Typography style={styles.nativeItemText}>{item.label}</Typography>
                {selectionnee && <LucideIcon name="Check" size="sm" />}
              </Box>
            </Pressable>
          </>
        );
      }}
    />
  );
};
