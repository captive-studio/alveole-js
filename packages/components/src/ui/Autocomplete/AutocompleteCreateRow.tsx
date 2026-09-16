import { Pressable, StyleProp, ViewStyle } from 'react-native';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { LucideIcon } from '../LucideIcon';
import { useStyles } from './Autocomplete.styles';

type Props = {
  label: string;
  onPress: () => void;
};

/** Propose de retenir la saisie telle quelle, quand aucune option existante ne la porte. */
export const AutocompleteCreateRow = ({ label, onPress }: Props) => {
  const styles = useStyles();

  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.nativeItem as StyleProp<ViewStyle>}>
      <Box display="flex" flexDirection="row" gap={'050'}>
        <LucideIcon name="Plus" size="md" />
        <Typography style={styles.nativeItemTextNew}>{label}</Typography>
      </Box>
    </Pressable>
  );
};
