import { Box, BoxProps, Typography } from '../../core';
import { LucideIcon, LucideIconProps } from '../LucideIcon';
import { useStyles } from './CardSection.styles';

export type CardSectionVariant = 'default' | 'disabled';

export type CardSectionProps = BoxProps & {
  variant?: CardSectionVariant;
  titre?: string;
  description?: string;
  titreIcone?: LucideIconProps['name'];
  descriptionIcone?: LucideIconProps['name'];
};

export const CardSection = (props: CardSectionProps) => {
  const { variant = 'default', titre, description, titreIcone, descriptionIcone, style, children, ...boxProps } = props;

  const styles = useStyles();

  const hasTitleRow = !!(titre || titreIcone);
  const hasDescriptionRow = !!(description || descriptionIcone || children);

  if (!hasTitleRow && !hasDescriptionRow) {
    return null;
  }

  return (
    <Box tag="card-section" style={[styles.cardSection, style]} {...boxProps}>
      {hasTitleRow && (
        <Box tag="card-section-title" style={styles.title}>
          {titreIcone && (
            <Box tag="card-section-title-icon" style={styles.titleIcon}>
              <LucideIcon
                name={titreIcone}
                size="sm"
                color={variant === 'disabled' ? styles.disabledText.color : styles.titleText.color}
              />
            </Box>
          )}

          {titre && (
            <Typography style={[styles.titleText, variant === 'disabled' ? styles.disabledText : {}]}>
              {titre}
            </Typography>
          )}
        </Box>
      )}

      {hasDescriptionRow && (
        <Box tag="card-section-description" style={styles.description}>
          {descriptionIcone && (
            <Box tag="card-section-description-icon" style={styles.descriptionIcon}>
              <LucideIcon
                name={descriptionIcone}
                size="sm"
                color={variant === 'disabled' ? styles.disabledText.color : styles.descriptionText.color}
              />
            </Box>
          )}

          {description && (
            <Typography style={[styles.descriptionText, variant === 'disabled' ? styles.disabledText : {}]}>
              {description}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};
