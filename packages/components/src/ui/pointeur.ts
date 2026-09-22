import { PressableStateCallbackType } from 'react-native';

/**
 * L'etat que `Pressable` passe a sa fonction enfant. `hovered` n'est pas dans le type de
 * React Native, mais react-native-web le fournit : c'est par lui que le survol descend
 * jusqu'aux enfants, la ou un `hoverStyle` Tamagui ne teinterait que l'element qui le porte.
 *
 * Declare ici, et non dans `src/type`, parce qu'il ne s'adresse qu'aux composants de ce
 * dossier : le reexporter en ferait une promesse faite aux applications clientes.
 */
export type EtatDuPointeur = PressableStateCallbackType & { hovered?: boolean };
