import { Box, BoxProps, Typography } from '@alveole/components';
import { Button, ButtonProps } from '../Button';
import { IconProps, LucideIcon } from '../LucideIcon';
import { useStyles } from './ResourceList.styles';

export type ResourceListNoContentProps = Pick<BoxProps, 'style'> & {
  title: string;
  description: string;
  IconProps: Pick<IconProps, 'color' | 'name'>;
  ButtonProps?: Pick<ButtonProps, 'title' | 'onPress'>;
};

export const ResourceListNoContent = (props: ResourceListNoContentProps) => {
  const { title, description, style, IconProps, ButtonProps, ...boxProps } = props;

  const styles = useStyles();

  return (
    <Box style={[styles.noContent, style]} {...boxProps}>
      <Box style={styles.noContentIntro}>
        <LucideIcon size="lg" {...IconProps} />

        <Box style={styles.noContentText}>
          <Typography style={styles.noContentTextTitle}>{title}</Typography>
          <Typography style={styles.noContentTextDescription}>{description}</Typography>
        </Box>
      </Box>

      {ButtonProps && <Button size="lg" variant="primary" {...ButtonProps} />}
    </Box>
  );
};

// Component configuration
ResourceListNoContent.stylesFn = useStyles;
ResourceListNoContent.description = 'Elément affiché dans une liste vide';
