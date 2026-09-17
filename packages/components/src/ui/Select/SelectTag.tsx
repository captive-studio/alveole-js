import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { ButtonIcon } from '../Button';
import { LucideIcon, LucideIconProps } from '../LucideIcon';
import { useStyles } from './SelectList.styles';

export type SelectTagProps = {
  label: string;
  icon?: LucideIconProps['name'];
  /** Absent : la puce n'offre pas de retrait (résumé « +N », champ désactivé). */
  onRemove?: () => void;
  /** Nom accessible du bouton de retrait. Par défaut : `Retirer <label>`. */
  removeLabel?: string;
  maxWidth?: number;
};

/**
 * Valeur sélectionnée affichée dans le champ fermé en multi-sélection, sur les
 * deux plateformes. Le `Tag` du kit ne convient pas : il n'offre pas de retrait
 * et son API décrit un statut, pas une sélection.
 */
export const SelectTag = (props: SelectTagProps) => {
  const { label, icon, onRemove, removeLabel, maxWidth } = props;

  const styles = useStyles();

  return (
    <Box tag="select-tag" style={{ ...styles.tag, ...(maxWidth != null ? { maxWidth } : {}) }}>
      {icon && <LucideIcon size="xs" name={icon} />}

      <Typography style={styles.tagLabel} numberOfLines={1}>
        {label}
      </Typography>

      {onRemove && (
        <ButtonIcon
          size="sm"
          iconSize="xs"
          icon="X"
          variant="tertiary"
          // Sans rôle explicite, react-native-web rend un `div` : un `aria-label`
          // y est interdit, et l'audit d'accessibilité le relève.
          accessibilityRole="button"
          accessibilityLabel={removeLabel ?? `Retirer ${label}`}
          onPress={onRemove}
        />
      )}
    </Box>
  );
};
