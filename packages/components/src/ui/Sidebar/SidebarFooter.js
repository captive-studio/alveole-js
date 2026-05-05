import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Box, Version } from '../../core';
import { Divider } from '../Divider';
export const SidebarFooter = props => {
  const { children } = props;
  return _jsxs(Box, { children: [_jsx(Version, {}), _jsx(Divider, {}), children] });
};
