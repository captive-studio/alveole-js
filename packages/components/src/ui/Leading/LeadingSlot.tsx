import { View } from 'react-native';
import { IconProps, LucideIcon } from '../LucideIcon';
import { Leading, resoudreLeading, tailleDeLEmplacement } from './leading';

type LeadingSlotProps = {
  contenu?: Leading;
  /** Taille et couleur de l'icône ; seule la taille s'applique à un élément. */
  apparence: Omit<IconProps, 'name'>;
};

/**
 * Rend un contenu de tête ou de fin. Un élément est posé dans une boîte de la taille de
 * l'icône, sans recevoir de couleur : un avatar ou un logo de marque garde la sienne. La boîte
 * est décorative, comme l'icône : le nom accessible du composant reste son libellé.
 */
export const LeadingSlot = ({ contenu, apparence }: LeadingSlotProps) => {
  const resolu = resoudreLeading(contenu);
  if (!resolu) return null;
  if (resolu.type === 'icone') return <LucideIcon name={resolu.nom} {...apparence} />;

  const px = tailleDeLEmplacement(apparence.size);

  return (
    // `View` plutot que `Box` : Tamagui rend `aria-hidden` vide, que les lecteurs d'ecran
    // ignorent, la ou react-native-web pose `aria-hidden="true"`.
    <View aria-hidden style={{ width: px, height: px, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {resolu.element}
    </View>
  );
};
