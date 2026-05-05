import { ActivityIndicator } from 'react-native';
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Box, Image, Typography } from '../../core';
import { Avatar } from '../Avatar';
import { LucideIcon } from '../LucideIcon';
import { useStyles } from './ListItem.styles';
export const ListItem = props => {
  const {
    children,
    title,
    description,
    style,
    AvatarProps,
    IconProps,
    preview_url,
    trailing,
    loading = false,
    showSeparateur = true,
    ...itemProps
  } = props;
  const styles = useStyles();
  return _jsxs(Box, {
    children: [
      _jsxs(Box, {
        tag: 'resource-item',
        style: [styles.item, style],
        hoverStyle: itemProps['onPress'] ? styles.itemHover : {},
        ...itemProps,
        children: [
          preview_url
            ? _jsx(Box, {
                style: styles.previewContainer,
                children: _jsx(Image, {
                  source: { uri: preview_url },
                  width: styles.preview.width,
                  height: styles.preview.height,
                  contentFit: 'contain',
                }),
              })
            : _jsxs(_Fragment, {
                children: [
                  IconProps && _jsx(LucideIcon, { size: 'sm', color: styles.defaultIcon.color, ...IconProps }),
                  AvatarProps && _jsx(Avatar, { size: 'xs', ...AvatarProps }),
                ],
              }),
          _jsxs(Box, {
            style: styles.detail,
            children: [
              showSeparateur && _jsx(Box, { style: styles.separateur }),
              _jsxs(Box, {
                style: styles.principal,
                children: [
                  _jsx(Typography, { style: styles.title, children: title }),
                  description && _jsx(Typography, { style: styles.description, children: description }),
                ],
              }),
              trailing && trailing(),
            ],
          }),
          loading &&
            _jsx(Box, {
              style: styles.loading,
              children: _jsx(ActivityIndicator, { size: 'small', color: styles.loading.color }),
            }),
        ],
      }),
      children,
    ],
  });
};
