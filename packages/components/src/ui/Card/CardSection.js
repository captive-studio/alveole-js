import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Box, Typography } from '../../core';
import { LucideIcon } from '../LucideIcon';
import { useStyles } from './CardSection.styles';
export const CardSection = props => {
  const { variant = 'default', titre, description, titreIcone, descriptionIcone, style, children, ...boxProps } = props;
  const styles = useStyles();
  const hasTitleRow = !!(titre || titreIcone);
  const hasDescriptionRow = !!(description || descriptionIcone || children);
  if (!hasTitleRow && !hasDescriptionRow) {
    return null;
  }
  return _jsxs(Box, {
    tag: 'card-section',
    style: [styles.cardSection, style],
    ...boxProps,
    children: [
      hasTitleRow &&
        _jsxs(Box, {
          tag: 'card-section-title',
          style: styles.title,
          children: [
            titreIcone &&
              _jsx(Box, {
                tag: 'card-section-title-icon',
                style: styles.titleIcon,
                children: _jsx(LucideIcon, {
                  name: titreIcone,
                  size: 'sm',
                  color: variant === 'disabled' ? styles.disabledText.color : styles.titleText.color,
                }),
              }),
            titre &&
              _jsx(Typography, {
                style: [styles.titleText, variant === 'disabled' ? styles.disabledText : {}],
                children: titre,
              }),
          ],
        }),
      hasDescriptionRow &&
        _jsxs(Box, {
          tag: 'card-section-description',
          style: styles.description,
          children: [
            descriptionIcone &&
              _jsx(Box, {
                tag: 'card-section-description-icon',
                style: styles.descriptionIcon,
                children: _jsx(LucideIcon, {
                  name: descriptionIcone,
                  size: 'sm',
                  color: variant === 'disabled' ? styles.disabledText.color : styles.descriptionText.color,
                }),
              }),
            description &&
              _jsx(Typography, {
                style: [styles.descriptionText, variant === 'disabled' ? styles.disabledText : {}],
                children: description,
              }),
          ],
        }),
    ],
  });
};
