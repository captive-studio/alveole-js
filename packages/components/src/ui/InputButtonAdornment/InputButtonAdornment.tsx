import { Box } from '../../core/Box';
import { ButtonIcon } from '../Button';
import { IconProps } from '../LucideIcon';
import { useStyles } from './InputButtonAdornment.styles';

export type InputButtonAdornmentProps = {
  icon: IconProps['name'];
  /** Exige de l'appelant : accole a un champ, ce bouton n'a aucun texte a lui. */
  accessibilityLabel: string;
  position: 'start' | 'end';
  disabled?: boolean;
  onPress?: () => void;
};

export const InputButtonAdornment = (props: InputButtonAdornmentProps) => {
  const { icon, accessibilityLabel, position, disabled, onPress } = props;

  const styles = useStyles();

  return (
    <Box style={position === 'start' ? styles.controlStart : styles.controlEnd}>
      <ButtonIcon
        variant="tertiary"
        disabled={disabled}
        style={{
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
        icon={icon}
        accessibilityLabel={accessibilityLabel}
        onPress={onPress}
      />
    </Box>
  );
};
