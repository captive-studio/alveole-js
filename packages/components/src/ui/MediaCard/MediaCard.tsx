import { useState } from 'react';
import { Pressable } from 'react-native';
import { Box } from '../../core/Box';
import { Image, ImageProps } from '../../core/Image';
import { Typography } from '../../core/Typography';
import { LucideIcon } from '../LucideIcon';
import { EtatDuPointeur } from '../pointeur';
import { useStyles } from './MediaCard.styles';

export type MediaCardProps = {
  /** Nom du fichier, tronqué s'il dépasse. */
  nom: string;
  /** Étiquette du type de fichier, ex. `PDF`. */
  type?: string;
  /** Image de prévisualisation. Absente ou en erreur, une icône de fichier la remplace. */
  apercu?: ImageProps['source'];
  onPress?: () => void;
};

export const MediaCard = ({ nom, type, apercu, onPress }: MediaCardProps) => {
  const styles = useStyles();
  const [erreur, setErreur] = useState(false);
  const afficheApercu = !!apercu && !erreur;

  return (
    <Pressable onPress={onPress} accessibilityRole={onPress ? 'button' : undefined} accessibilityLabel={nom}>
      {(state: EtatDuPointeur) => (
        <Box tag="media-card" style={[styles.card, state.hovered && styles.survole]}>
          <Box style={styles.media}>
            {afficheApercu ? (
              <Image
                testID="media-card-apercu"
                source={apercu}
                width="100%"
                height="100%"
                contentFit="cover"
                onError={() => setErreur(true)}
              />
            ) : (
              <LucideIcon name="File" size="md" />
            )}
            {state.hovered && <Box style={styles.overlay} />}
          </Box>
          <Box style={styles.corps}>
            {type && <Typography style={styles.type}>{type}</Typography>}
            <Typography style={styles.nom} numberOfLines={1}>
              {nom}
            </Typography>
          </Box>
        </Box>
      )}
    </Pressable>
  );
};
