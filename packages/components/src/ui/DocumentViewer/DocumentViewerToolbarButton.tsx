import { ButtonIcon } from '../Button';
import { LucideIconProps } from '../LucideIcon';

type ToolbarButtonProps = {
  icon: LucideIconProps['name'];
  disabled?: boolean;
  onPress?: () => void;
};

export const ToolbarButton = (props: ToolbarButtonProps) => {
  const { icon, disabled, onPress } = props;
  return <ButtonIcon variant="tertiary" icon={icon} disabled={disabled} onPress={onPress} />;
};
