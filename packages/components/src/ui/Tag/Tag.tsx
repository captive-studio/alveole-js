import React, { CSSProperties } from 'react';
import { Pressable } from 'react-native';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { LucideIcon, LucideIconProps } from '../LucideIcon';
import { EtatDuPointeur } from '../pointeur';
import { useStyles } from './Tag.styles';
import { TagClose } from './TagClose';
import { apparenceDeLaPastille, ecartDeLIcone } from './tagStyling';

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
  icon?: LucideIconProps['name'];
  style?: CSSProperties;
};

export const Tag = (props: TagProps) => {
  const { size, children, selected, interactive, closable, onClose, icon, style, ...tagProps } = props;

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
        {(state: EtatDuPointeur) => (
          <Typography
            style={apparenceDeLaPastille(styles, {
              size,
              survolee: manipulable && (!!state.hovered || croixSurvolee),
              selectionnee: !!selected,
              fermable: !!closable,
            })}
            {...tagProps}
          >
            {/* L'icone est enveloppee : `react-native-svg` absorbe le `style` qu'on lui
                passe et n'en garde que les proprietes SVG, la marge serait perdue. */}
            {icon && (
              <Box style={ecartDeLIcone(styles, size)}>
                {/* Taille unique dans les deux crans, a la difference de la croix. L'icone
                    porte du sens et ne se clique pas : elle n'a pas a offrir une cible qui
                    suive la pastille. Primer ne dimensionne pas non plus son `leadingVisual`. */}
                <LucideIcon name={icon} size="sm" />
              </Box>
            )}
            {children}
            {closable && (
              <TagClose
                size={size}
                libelle={typeof children === 'string' ? children : undefined}
                onSurvol={setCroixSurvolee}
                fonce={!!state.hovered || croixSurvolee || !!selected}
                onClose={onClose}
              />
            )}
          </Typography>
        )}
      </Pressable>
    </Box>
  );
};
