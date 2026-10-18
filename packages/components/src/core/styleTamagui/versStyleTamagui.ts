import { CSSProperties } from 'react';

/**
 * Le seul passage d'un style de survol CSS vers le type qu'attend Tamagui. `Box` et
 * `Typography` publient `hoverStyle` en `CSSProperties`, plus large que le type de Tamagui
 * (`flex` y accepte une chaine, Tamagui un nombre) : l'assertion ment donc au compilateur.
 * Resserrer la prop publique casserait les apps qui lui passent des `CSSProperties` ; ce
 * mensonge reste ici, seul et nomme, jusqu'a la prochaine version majeure. Un style deja au
 * type de Tamagui, comme celui des controles qui exposent les props Tamagui, passe tel quel.
 */
export const versStyleTamagui = <Cible>(css: CSSProperties | Cible | undefined) => css as Cible | undefined;
