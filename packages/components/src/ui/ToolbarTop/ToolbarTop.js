import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Box, Typography } from '../../core';
import { Avatar } from '../Avatar';
import { ButtonIcon } from '../Button';
import { useStyles } from './ToolbarTop.styles';
export const ToolbarTop = props => {
  const {
    variant = 'default',
    style,
    title,
    onNavigate,
    navigationIcon = 'ChevronLeft',
    AvatarProps,
    sousTitre,
    actions,
    withBorder = false,
    typographyStyle = {},
    ...toolbarProps
  } = props;
  const styles = useStyles();
  const toolbarNavigation = onNavigate
    ? _jsx(Box, {
        tag: 'toolbar-navigation',
        style: styles.toolbarNavigation,
        children: _jsx(ButtonIcon, {
          variant: 'tertiary',
          size: 'lg',
          iconSize: 'md',
          icon: navigationIcon,
          onPress: onNavigate,
        }),
      })
    : _jsx(_Fragment, {});
  const toolbarInformation = _jsxs(Box, {
    tag: 'toolbar-information',
    style: {
      ...styles.toolbarInformation,
      ...(variant === 'compactLarge' ? styles.compactLargeInformations : {}),
    },
    children: [
      AvatarProps && _jsx(Avatar, { ...AvatarProps, size: 'md', carre: true }),
      _jsxs(Box, {
        tag: 'toolbar-information-title',
        style: styles.toolbarInformationTitle,
        children: [
          _jsx(Typography, {
            style: {
              ...styles.toolbarInformationTitleText,
              ...(variant === 'compactLarge' || variant === 'large' ? styles.largeInformationTitleText : {}),
              ...typographyStyle,
            },
            children: title,
          }),
          sousTitre &&
            _jsx(Typography, {
              style: {
                ...styles.toolbarInformationTitleSubText,
                ...(variant === 'compactLarge' || variant === 'large'
                  ? styles.largeToolbarInformationTitleSubText
                  : {}),
                ...typographyStyle,
              },
              children: sousTitre,
            }),
        ],
      }),
    ],
  });
  const toolbarActions = actions
    ? _jsx(Box, { tag: 'toolbar-actions', style: styles.toolbarActions, children: actions })
    : _jsx(_Fragment, {});
  if (variant === 'large') {
    return _jsxs(Box, {
      tag: 'toolbar',
      style: [
        styles.toolbarContainer,
        styles.largeToolbarContainer,
        style,
        withBorder ? styles.toolbarInformationWithBorder : {},
      ],
      ...toolbarProps,
      children: [toolbarNavigation, _jsxs(Box, { tag: 'toolbar-bas', children: [toolbarInformation, toolbarActions] })],
    });
  }
  return _jsxs(Box, {
    tag: 'toolbar',
    style: [
      styles.toolbarContainer,
      variant === 'compactLarge' ? styles.compactLargetoolbarContainer : {},
      style,
      withBorder ? styles.toolbarInformationWithBorder : {},
    ],
    ...toolbarProps,
    children: [toolbarNavigation, toolbarInformation, toolbarActions],
  });
};
