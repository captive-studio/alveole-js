import React from 'react';
import { LayoutChangeEvent, ScrollView } from 'react-native';
import { SELECT_ROW_HEIGHT } from './SelectList.styles';

/**
 * Amene l'option deja selectionnee sous les yeux a l'ouverture du panneau, deux lignes plus bas
 * que le haut de la liste pour qu'on voie ce qui la precede.
 *
 * Le defilement est declenche par la mise en page de cette option, et par rien d'autre : c'est
 * le seul moment ou sa position est connue, l'animation d'ouverture du panneau la laissant
 * indeterminee a la premiere frame.
 */
/**
 * Ou amener la liste pour que l'option posee en `y` soit visible : deux lignes plus haut, de
 * sorte qu'on voie ce qui la precede, et jamais au-dessus du haut de la liste.
 */
export const positionDeDefilement = (y: number) => Math.max(0, y - 2 * SELECT_ROW_HEIGHT);

export const useDefilementVersSelection = (open: boolean) => {
  const scrollRef = React.useRef<ScrollView>(null);
  const dejaDefile = React.useRef(false);

  // Le contenu du sheet est demonte a la fermeture : les `onLayout` se rejouent a chaque
  // ouverture, il faut donc rearmer le defilement. Un changement de recherche ne le rearme
  // pas, sinon la liste sauterait a chaque frappe.
  React.useEffect(() => {
    if (!open) dejaDefile.current = false;
  }, [open]);

  const onSelectedLayout = (event: LayoutChangeEvent) => {
    if (dejaDefile.current) return;
    dejaDefile.current = true;

    const y = positionDeDefilement(event.nativeEvent.layout.y);
    requestAnimationFrame(() => scrollRef.current?.scrollTo({ y, animated: false }));
  };

  return { scrollRef, onSelectedLayout };
};
