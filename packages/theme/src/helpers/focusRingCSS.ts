import { FOCUS_ATTRIBUTE, focusBorder, FocusRingMetrics } from '../constants/Focus';

/** Un seul point de construction du selecteur : l'attribut ne s'ecrit qu'ici. */
const marque = (variante?: string) => (variante ? `[${FOCUS_ATTRIBUTE}='${variante}']` : `[${FOCUS_ATTRIBUTE}]`);

/**
 * La bague de focus du kit, en CSS plutot qu'en style de composant.
 *
 * Elle nait de `:focus-visible`, le seul selecteur qui distingue une arrivee au clavier d'un
 * clic : c'est la regle commune a Primer, a `@atlaskit/focus-ring` et a Base. Un style pose
 * depuis un state React branche sur `onFocus` ne le peut pas, `Pressable` de react-native-web
 * n'exposant qu'un `focused` brut, sans notion de modalite. C'est ce contournement, adopte
 * parce que jsdom ne resout pas `:focus`, qui faisait apparaitre la bague au clic sur les
 * boutons et les onglets.
 *
 * Elle ne s'applique qu'aux elements portant `FOCUS_ATTRIBUTE`, jamais a la page entiere :
 * cf. ADR 0008.
 */
export const generateFocusRingCSS = (): string =>
  [
    // `!important` : Tamagui laisse un `outline: none` en style inline sur certains de ses
    // conteneurs, et un style inline bat toute feuille de style. Sans lui, la `Tabs.List` -
    // point d'entree au clavier du composant - restait un arret invisible. Sans danger, la
    // regle ne touchant que ce qui a demande la bague : un champ, qui eteint son contour au
    // profit de sa bordure (ADR 0016), ne porte pas la marque.
    `${marque()}:focus-visible { outline: ${FocusRingMetrics.width}px solid ${focusBorder().borderColor} !important; outline-offset: ${FocusRingMetrics.offset}px !important; }`,
    `${marque()}:focus:not(:focus-visible) { outline: none !important; }`,
    `${marque('inset')}:focus-visible { outline-offset: ${FocusRingMetrics.insetOffset}px !important; }`,
  ].join('\n');
