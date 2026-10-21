import React, { CSSProperties } from 'react';
import { Platform, Pressable } from 'react-native';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Leading, LeadingSlot } from '../Leading';
import { EtatDuPointeur } from '../pointeur';
import { useStyles } from './Tag.styles';
import { TagClose } from './TagClose';
import { TagNativeContent } from './TagNativeContent';
import { apparenceDeLaPastille, ecartDeLIcone, reponseAuPointeur } from './tagStyling';

export type TagProps = {
  children: React.ReactNode;
  size: 'sm' | 'md';
  selected?: boolean;
  /**
   * L'etiquette appartient a un groupe ou l'on choisit : elle repond au pointeur. Le mot est
   * celui de Primer, dont `isTokenInteractive` commande le meme retour au survol.
   */
  interactive?: boolean;
  closable?: boolean;
  onClose?: () => void;
  leading?: Leading;
  style?: CSSProperties;
};

export const Tag = (props: TagProps) => {
  const { size, children, selected, interactive, closable, onClose, leading, style, ...tagProps } = props;

  const [croixSurvolee, setCroixSurvolee] = React.useState(false);
  const styles = useStyles();
  // Une etiquette ne reagit au survol que si on peut agir dessus : la fermer, ou la choisir
  // dans un groupe. Une etiquette purement descriptive reste inerte, sans quoi elle
  // promettrait une interaction qu'elle n'offre pas (ADR 0019). `selected` ne decrit qu'un
  // etat et ne declare rien : une valeur dans un champ desactive est selectionnee sans etre
  // manipulable.
  const manipulable = !!closable || !!interactive;

  return (
    <Box tag="tag" style={{ ...styles.tagContainer, ...style }}>
      {/* Le `Pressable` n'est la que pour capter le survol : il ne porte ni `onPress` ni
          role de bouton, et l'etiquette reste non interactive. C'est le seul montage qui
          fasse descendre l'etat du pointeur jusqu'au libelle et, plus tard, jusqu'a la
          croix : `hoverStyle` de Tamagui ne s'applique qu'a l'element qui le porte. */}
      <Pressable accessible={false} style={styles.zoneDeSurvol}>
        {(state: EtatDuPointeur) => {
          const { survolee, fonce } = reponseAuPointeur({
            manipulable,
            pastilleSurvolee: !!state.hovered,
            croixSurvolee,
            selectionnee: !!selected,
          });

          const apparence = apparenceDeLaPastille(styles, {
            size,
            survolee,
            selectionnee: !!selected,
            fermable: !!closable,
          });
          const icone = leading != null && (
            <Box style={ecartDeLIcone(styles, size)}>
              <LeadingSlot contenu={leading} apparence={{ size: 'sm' }} />
            </Box>
          );
          const croix = closable && (
            <TagClose
              size={size}
              libelle={typeof children === 'string' ? children : undefined}
              onSurvol={setCroixSurvolee}
              fonce={fonce}
              onClose={onClose}
            />
          );

          if (Platform.OS !== 'web') {
            return (
              <TagNativeContent apparence={apparence} leading={icone} close={croix}>
                {children}
              </TagNativeContent>
            );
          }

          return (
            <Typography style={apparence} {...tagProps}>
              {/* L'icone est enveloppee : `react-native-svg` absorbe le `style` qu'on lui
                passe et n'en garde que les proprietes SVG, la marge serait perdue. */}
              {icone}
              {children}
              {croix}
            </Typography>
          );
        }}
      </Pressable>
    </Box>
  );
};
