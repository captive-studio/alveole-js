import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Avatar } from '../Avatar';
import { useStyles } from './ToolbarTop.styles';
import { InformationDeLaBarre } from './ToolbarTop.types';
import { styleDuBlocDInformation, styleDuSousTitre, styleDuTitre } from './toolbarTopStyling';

/**
 * Ce qui identifie le dossier courant. Le style que l'appelant fournit passe en dernier : il sert
 * justement a corriger ce que la variante a decide, et l'inverse le rendrait inoperant.
 */
export const ToolbarTopInformation = ({
  title,
  sousTitre,
  AvatarProps,
  typographyStyle,
  grandTitre,
  compact,
}: InformationDeLaBarre) => {
  const styles = useStyles();

  return (
    <Box tag="toolbar-information" style={styleDuBlocDInformation(styles, compact)}>
      {AvatarProps && <Avatar {...AvatarProps} size="md" carre />}
      <Box tag="toolbar-information-title" style={styles.toolbarInformationTitle}>
        <Typography style={styleDuTitre(styles, grandTitre, typographyStyle)}>{title}</Typography>
        {sousTitre && (
          <Typography style={styleDuSousTitre(styles, grandTitre, typographyStyle)}>{sousTitre}</Typography>
        )}
      </Box>
    </Box>
  );
};
