import { ButtonIcon } from '../Button';
import { LucideIconProps } from '../LucideIcon';

type ToolbarButtonProps = {
  icon: LucideIconProps['name'];
  /** Exige de l'appelant : une barre d'outils n'aligne que des icones, toutes muettes sinon. */
  accessibilityLabel: string;
  disabled?: boolean;
  onPress?: () => void;
};

export const ToolbarButton = (props: ToolbarButtonProps) => {
  const { icon, accessibilityLabel, disabled, onPress } = props;

  return (
    <ButtonIcon
      variant="tertiary"
      icon={icon}
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={onPress}
    />
  );
};
