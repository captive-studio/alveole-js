import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Avatar } from '../Avatar';
import { useStyles } from './ToolbarTop.styles';
import { InformationDeLaBarre } from './ToolbarTop.types';

/**
 * Ce qui identifie le dossier courant. Le style que l'appelant fournit passe en dernier : il sert
 * justement a corriger ce que la variante a decide, et l'inverse le rendrait inoperant.
 */
export const ToolbarTopInformation = ({
  title,
  sousTitre,
  AvatarProps,
  typographyStyle = {},
  grandTitre,
  compact,
}: InformationDeLaBarre) => {
  const styles = useStyles();

  return (
    <Box
      tag="toolbar-information"
      style={{ ...styles.toolbarInformation, ...(compact ? styles.compactLargeInformations : {}) }}
    >
      {AvatarProps && <Avatar {...AvatarProps} size="md" carre />}
      <Box tag="toolbar-information-title" style={styles.toolbarInformationTitle}>
        <Typography
          style={{
            ...styles.toolbarInformationTitleText,
            ...(grandTitre ? styles.largeInformationTitleText : {}),
            ...typographyStyle,
          }}
        >
          {title}
        </Typography>
        {sousTitre && (
          <Typography
            style={{
              ...styles.toolbarInformationTitleSubText,
              ...(grandTitre ? styles.largeToolbarInformationTitleSubText : {}),
              ...typographyStyle,
            }}
          >
            {sousTitre}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
