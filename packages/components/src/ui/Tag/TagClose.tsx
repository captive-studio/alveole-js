import { Pressable } from 'react-native';
import { LucideIcon } from '../LucideIcon';
import { EtatDuPointeur } from '../pointeur';
import { useStyles } from './Tag.styles';

export type TagCloseProps = {
  size: 'sm' | 'md';
  /** Le libelle que la croix retire, quand c'est du texte annoncable. */
  libelle?: string;
  /** L'etiquette est survolee ou selectionnee : la croix suit et passe au gris sombre. */
  fonce: boolean;
  /**
   * La croix prend et rend le survol a l'etiquette. React-native-web retire le survol du
   * `Pressable` parent des que le pointeur entre dans celui-ci : sans ce relais, passer du
   * libelle a la croix eclaircirait l'etiquette au moment ou l'on s'apprete a la fermer.
   */
  onSurvol: (survolee: boolean) => void;
  onClose?: () => void;
};

/**
 * La croix de suppression d'une etiquette. Sous-composant a part entiere et non quelques
 * lignes dans `Tag` : c'est la seule zone interactive de l'etiquette, elle a son propre
 * survol, son propre gabarit par taille et ses propres obligations d'accessibilite.
 */
export const TagClose = ({ size, libelle, fonce, onSurvol, onClose }: TagCloseProps) => {
  const styles = useStyles();

  return (
    <Pressable
      accessibilityRole="button"
      // Nommer ce qu'on retire plutot que « retirer un truc » : dans une liste de valeurs
      // selectionnees, un nom generique fait annoncer six fois la meme chose.
      accessibilityLabel={libelle ? `Retirer ${libelle}` : "Retirer l'étiquette"}
      onPress={onClose}
      onHoverIn={() => onSurvol(true)}
      onHoverOut={() => onSurvol(false)}
      style={(state: EtatDuPointeur) => ({
        ...(size === 'sm' ? styles.croixSm : styles.croixMd),
        ...(state.hovered ? styles.croixSurvolee : {}),
      })}
    >
      {/* Couleur explicite plutot que `currentColor` : React Native n'herite pas la couleur
          du texte parent, la croix resterait noire en natif quel que soit l'etat. */}
      <LucideIcon name="X" size={size === 'sm' ? 'xs' : 'sm'} color={(fonce ? styles.tagSurvole : styles.tag).color} />
    </Pressable>
  );
};
