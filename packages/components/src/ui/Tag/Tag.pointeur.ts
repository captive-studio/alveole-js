import { PressableStateCallbackType } from 'react-native';

/**
 * `hovered` n'est pas dans le type de React Native, mais react-native-web le fournit. C'est
 * par lui que le survol descend jusqu'au libelle et jusqu'a la croix : un `hoverStyle`
 * Tamagui ne s'appliquerait qu'a l'element qui le porte.
 *
 * `Button.types.ts` et `ButtonIcon.tsx` en declarent chacun leur copie : il y a la un
 * rapprochement a faire, hors du perimetre de ce chantier.
 */
export type EtatDuPointeur = PressableStateCallbackType & { hovered?: boolean };
