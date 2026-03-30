import React from 'react';
import { Box, BoxProps, Typography } from '../../core';
import { Avatar, AvatarProps } from '../Avatar';
import { ButtonIcon } from '../Button';
import { IconProps } from '../LucideIcon';
import { useStyles } from './ToolbarTop.styles';

export type ToolbarTopProps = BoxProps & {
  variant?: 'default' | 'large' | 'compactLarge';
  title: string;
  AvatarProps?: Omit<AvatarProps, 'size'>;
  withBorder?: boolean;
  onNavigate?: () => void;
  navigationIcon?: IconProps['name'];
  sousTitre?: string;
  onActions?: () => void;
  actionsIcon?: IconProps['name'];
  actions?: React.ReactNode;
  typographyStyle?: React.CSSProperties;
};

export const ToolbarTop = (props: ToolbarTopProps) => {
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

  const toolbarNavigation = onNavigate ? (
    <Box tag="toolbar-navigation" style={styles.toolbarNavigation}>
      <ButtonIcon variant="tertiary" size="lg" iconSize="md" icon={navigationIcon} onPress={onNavigate} />
    </Box>
  ) : (
    <></>
  );

  const toolbarInformation = (
    <Box
      tag="toolbar-information"
      style={{
        ...styles.toolbarInformation,
        ...(variant === 'compactLarge' ? styles.compactLargeInformations : {}),
      }}
    >
      {AvatarProps && <Avatar {...AvatarProps} size="md" carre />}
      <Box tag="toolbar-information-title" style={styles.toolbarInformationTitle}>
        <Typography
          style={{
            ...styles.toolbarInformationTitleText,
            ...(variant === 'compactLarge' || variant === 'large' ? styles.largeInformationTitleText : {}),
            ...typographyStyle,
          }}
        >
          {title}
        </Typography>
        {sousTitre && (
          <Typography
            style={{
              ...styles.toolbarInformationTitleSubText,
              ...(variant === 'compactLarge' || variant === 'large' ? styles.largeToolbarInformationTitleSubText : {}),
              ...typographyStyle,
            }}
          >
            {sousTitre}
          </Typography>
        )}
      </Box>
    </Box>
  );

  const toolbarActions = actions ? (
    <Box tag="toolbar-actions" style={styles.toolbarActions}>
      {actions}
    </Box>
  ) : (
    <></>
  );

  if (variant === 'large') {
    return (
      <Box
        tag="toolbar"
        style={[
          styles.toolbarContainer,
          styles.largeToolbarContainer,
          style,
          withBorder ? styles.toolbarInformationWithBorder : {},
        ]}
        {...toolbarProps}
      >
        {toolbarNavigation}
        <Box tag="toolbar-bas">
          {toolbarInformation}
          {toolbarActions}
        </Box>
      </Box>
    );
  }

  return (
    <Box
      tag="toolbar"
      style={[
        styles.toolbarContainer,
        variant === 'compactLarge' ? styles.compactLargetoolbarContainer : {},
        style,
        withBorder ? styles.toolbarInformationWithBorder : {},
      ]}
      {...toolbarProps}
    >
      {toolbarNavigation}
      {toolbarInformation}
      {toolbarActions}
    </Box>
  );
};
