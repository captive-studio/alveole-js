import { Box } from '../../core/Box';
import { ButtonIcon } from '../Button';
import { IconProps } from '../LucideIcon';
import { useStyles } from './InputButtonAdornment.styles';

export type InputButtonAdornmentProps = {
  icon: IconProps['name'];
  position: 'start' | 'end';
  disabled?: boolean;
  onPress?: () => void;
};

export const InputButtonAdornment = (props: InputButtonAdornmentProps) => {
  const { icon, position, disabled, onPress } = props;

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
        onPress={onPress}
      />
    </Box>
  );
};
