import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Typography } from '../../core';
import { Box } from '../../core/Box/Box';
import { isLucideIconName, LucideIcon } from '../LucideIcon';
import { useStyles } from './EmptyState.styles';
export const EmptyState = props => {
  const { children, style, iconName, title, description, text, illustration, actions, ...boxProps } = props;
  const styles = useStyles();
  const descriptionToRender = description ?? text;
  const footer = actions ?? children;
  return _jsxs(Box, {
    tag: 'empty-state',
    style: [styles.container, style],
    ...boxProps,
    children: [
      _jsxs(Box, {
        tag: 'empty-state-contenu',
        style: styles.contenu,
        children: [
          (illustration || iconName) &&
            _jsx(Box, {
              style: styles.media,
              children: illustration
                ? illustration
                : iconName && isLucideIconName(iconName)
                  ? _jsx(LucideIcon, { name: iconName, size: 'lg', color: styles.media.color })
                  : null,
            }),
          _jsxs(Box, {
            style: styles.messageEtDescription,
            children: [
              title && _jsx(Typography, { style: styles.title, children: title }),
              descriptionToRender && _jsx(Typography, { style: styles.description, children: descriptionToRender }),
            ],
          }),
        ],
      }),
      footer && _jsx(Box, { tag: 'empty-state-footer', style: styles.footer, children: footer }),
    ],
  });
};
