import { jsx as _jsx } from 'react/jsx-runtime';
import { LucideIcon } from '../LucideIcon';
export const toolbarBottomNavIcon = name =>
  function ToolbarBottomNavIcon(props) {
    return _jsx(LucideIcon, { size: 'md', name: name, color: props.color });
  };
