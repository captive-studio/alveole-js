import React from 'react';
import { Box } from '../../core/Box';
import { Image } from '../../core/Image';
import { Avatar } from '../Avatar';
import { LucideIcon } from '../LucideIcon';
import { useStyles } from './ListItem.styles';
import { VisuelDeLaLigne } from './ListItem.types';
import { ListItemChoix } from './ListItemChoix';

/** Centre verticalement ce qu'on lui confie, sans quoi chaque appelant reecrit les deux marges. */
const AuMilieu = ({ children }: React.PropsWithChildren) => (
  <Box mt={'auto'} mb={'auto'}>
    {children}
  </Box>
);

/**
 * Ce qui precede le titre. La vignette est exclusive du reste : une ligne qui montre un apercu
 * ne montre ni choix, ni icone, ni avatar, meme si les props sont fournies.
 */
export const ListItemVisuel = ({ title, preview_url, RadioProps, IconProps, AvatarProps }: VisuelDeLaLigne) => {
  const styles = useStyles();

  if (preview_url) {
    return (
      <Box style={styles.previewContainer}>
        {/* Alternative vide et non absente : l'aperçu est décoratif, le titre et la
            description portent déjà l'information. Sans attribut `alt`, axe compte une
            violation `image-alt`. */}
        <Image
          alt=""
          source={{ uri: preview_url }}
          width={styles.preview.width}
          height={styles.preview.height}
          contentFit="contain"
        />
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="row" gap={'3V'}>
      {RadioProps && <ListItemChoix title={title} choix={RadioProps} />}
      {IconProps && (
        <AuMilieu>
          <LucideIcon size="sm" color={styles.defaultIcon.color} {...IconProps} />
        </AuMilieu>
      )}
      {AvatarProps && (
        <AuMilieu>
          <Avatar size="xs" {...AvatarProps} />
        </AuMilieu>
      )}
    </Box>
  );
};
