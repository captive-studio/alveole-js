import { StyleValue } from '@alveole/theme';

/**
 * Le seul passage d'un style de `makeStyles` vers le type qu'attend un composant natif.
 * `makeStyles` produit des `CSSProperties` : sur web, `spacing` ou `radius` y rendent des
 * variables CSS, et certaines proprietes (`outline`) n'existent que dans le navigateur. Les
 * `ViewStyle` et `TextStyle` de react-native ne connaissent ni les unes ni les autres :
 * l'assertion ment donc au compilateur, pas au rendu, que react-native-web lit tel quel.
 * Ce mensonge reste ici, seul et nomme, exempte de `consistent-type-assertions` par la
 * configuration ESLint.
 */
export const versStyleNatif = <Cible>(style: StyleValue | undefined) => style as Cible;
