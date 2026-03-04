import { Color } from '@alveole/theme';
import { IconProps, LucideIcon } from '../LucideIcon';

export type ToolbarBottomNavIconProps = { color: Color };
export const toolbarBottomNavIcon = (name: IconProps['name']) =>
  function ToolbarBottomNavIcon(props: { color: Color }) {
    return <LucideIcon size="md" name={name} color={props.color} />;
  };
