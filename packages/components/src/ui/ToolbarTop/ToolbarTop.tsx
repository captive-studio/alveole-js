import { Box, ButtonIcon, Typography } from '@alveole/components';
import { useRouter } from 'expo-router';
import React from 'react';
import { useStyles } from './ToolbarTop.styles';

export type ToolbarTopVariant = 'default' | 'large' | 'compactLarge';

export type ToolbarTopProps = {
  variant?: ToolbarTopVariant;
  title: string;
  subtitle?: string;
  background?: boolean;
  showSubtitle?: boolean;

  canGoBack?: boolean;
  onNavigateBack?: () => void;

  actions?: React.ReactNode;
};

export const ToolbarTop = (props: ToolbarTopProps) => {
  const { title, subtitle, background, canGoBack, actions, variant, onNavigateBack } = props;

  const router = useRouter();
  const styles = useStyles();

  const handleBack = () => {
    if (onNavigateBack) {
      onNavigateBack();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <Box tag="toolbar" style={{ ...styles.container, ...(background && styles.containerWithBackground) }}>
      {variant !== 'compactLarge' && (
        <Box tag="toolbar-haut" style={styles.toolbarHaut}>
          <Box tag="toolbar-navigation">
            {canGoBack && <ButtonIcon size="lg" variant="tertiary" icon="ArrowLeft" onPress={handleBack} />}
          </Box>
          <Box tag="toolbar-actions">{actions}</Box>
        </Box>
      )}

      <Box
        tag="toolbar-informations"
        style={{ ...styles.informations, ...(variant === 'compactLarge' && styles.compactLargeInformations) }}
      >
        <Box tag="toolbar-titre">
          <Typography style={styles.titre}>{title}</Typography>
        </Box>
        {subtitle && (
          <Box tag="toolbar-sous-titre">
            <Typography style={styles.sousTitre}>{subtitle}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
