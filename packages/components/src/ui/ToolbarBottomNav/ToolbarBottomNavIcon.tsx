import { IconProps, LucideIcon } from '@alveole/components';
import { Color } from '@alveole/theme';

export type ToolbarBottomNavIconProps = { color: Color };
export const toolbarBottomNavIcon = (name: IconProps['name']) =>
  function ToolbarBottomNavIcon(props: { color: Color }) {
    return <LucideIcon size="md" name={name} color={props.color} />;
  };
