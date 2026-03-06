import React from 'react';
import { Typography } from '../../core';
import { Box, BoxProps } from '../../core/Box/Box';
import { isLucideIconName, LucideIcon, LucideIconProps } from '../LucideIcon';
import { useStyles } from './EmptyState.styles';

export type EmptyStateProps = BoxProps & {
  iconName?: LucideIconProps['name'];
  title?: string;
  description?: string;
  /**
   * @deprecated Utilisez `description` à la place.
   */
  text?: string;
  illustration?: React.ReactNode;
  actions?: React.ReactNode;
};

export const EmptyState = (props: EmptyStateProps) => {
  const { children, style, iconName, title, description, text, illustration, actions, ...boxProps } = props;

  const styles = useStyles();
  const descriptionToRender = description ?? text;
  const footer = actions ?? children;

  return (
    <Box tag="empty-state" style={[styles.container, style]} {...boxProps}>
      <Box tag="empty-state-contenu" style={styles.contenu}>
        {(illustration || iconName) && (
          <Box style={styles.media}>
            {illustration ? (
              illustration
            ) : iconName && isLucideIconName(iconName) ? (
              <LucideIcon name={iconName} size="lg" color={styles.media.color} />
            ) : null}
          </Box>
        )}

        <Box style={styles.messageEtDescription}>
          {title && <Typography style={styles.title}>{title}</Typography>}

          {descriptionToRender && <Typography style={styles.description}>{descriptionToRender}</Typography>}
        </Box>
      </Box>

      {footer && <Box style={styles.footer}>{footer}</Box>}
    </Box>
  );
};
