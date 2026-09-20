import { Platform } from 'react-native';
import { Colors } from './Color';

/**
 * `default` sur les fonds clairs, `emphasis` sur les fonds pleins (primary, danger),
 * ou l'anneau d'accent devient illisible.
 */
export type FocusRingKind = 'default' | 'emphasis';

export type FocusRingStyle = {
  outlineWidth?: number;
  outlineColor?: string;
  outlineStyle?: 'solid';
  outlineOffset?: number;
};

/**
 * L'attribut par lequel un composant demande la bague de focus du kit.
 *
 * La regle CSS emise par le theme ne s'applique qu'aux elements qui le portent : sans lui,
 * elle repeindrait les `<a>` et les `<button>` propres a l'application cliente, ce que
 * l'ADR 0008 refuse. C'est l'opt-in explicite d'`@atlaskit/focus-ring`.
 *
 * Sur le web, react-native-web rend la prop `dataSet` en attributs `data-*` : un composant
 * ecrit donc `dataSet={{ alveoleFocus: 'ring' }}`. Sur le natif la prop est ignoree, ce qui
 * convient : `outline` n'existe pas sur iOS (cf. UnsupportedCSSProperties).
 */
export const FOCUS_DATA_SET_KEY = 'alveoleFocus';

/** Derive, jamais recopie : une regle CSS ne peut pas cibler un attribut que plus personne ne pose. */
export const FOCUS_ATTRIBUTE = `data-${FOCUS_DATA_SET_KEY.replace(/([A-Z])/g, '-$1').toLowerCase()}`;

/**
 * Les mesures de l'anneau, en un seul endroit : la regle CSS `:focus-visible` emise par le
 * theme et `focusRing()` doivent tomber sur les memes chiffres, sinon la bague changerait de
 * taille selon la facon dont un composant se la procure. 2 px est la valeur des trois
 * references (Primer `focus.outline-width`, `--ds-border-width-focused`, `scale0` de Base).
 *
 * `offset` positif : l'anneau se pose hors de l'element, comme `@atlaskit/focus-ring` par
 * defaut. `insetOffset` est son pendant pour les elements a ras d'un bord ou rognes par un
 * parent, ou un anneau exterieur serait coupe : Primer a fait de ce cas sa valeur globale
 * (`focus.outline-offset: -2px`), Atlassian en fait une variante explicite.
 */
export const FocusRingMetrics = { width: 2, offset: 2, insetOffset: -2 } as const;

/**
 * `default` vient du ramp `Focus`, le meme que la bordure de focus des champs : c'est ce qui
 * fait qu'une case a cocher et un champ focalises cote a cote sont du meme bleu. L'anneau
 * prenait jusqu'ici `BleuCaptive['main-525']` (#0379EF), voisin mais distinct de #0A76F6,
 * alors que le ramp dedie existait deja.
 */
const OUTLINE_COLORS: Record<FocusRingKind, string> = {
  default: Colors.Focus[525],
  emphasis: Colors.BleuCaptive['975'],
};

/**
 * Web uniquement : `outline` ne decale pas la mise en page, mais n'existe pas sur iOS
 * (cf. UnsupportedCSSProperties). Un anneau natif demanderait une vue dessinee en absolu.
 */
export const focusRing = (kind: FocusRingKind): FocusRingStyle =>
  Platform.OS === 'web'
    ? {
        outlineWidth: FocusRingMetrics.width,
        outlineStyle: 'solid',
        outlineColor: OUTLINE_COLORS[kind],
        outlineOffset: FocusRingMetrics.offset,
      }
    : {};

export type FocusBorderStyle = {
  borderWidth: number;
  borderColor: string;
  outlineWidth?: number;
  outlineStyle?: 'solid';
  outlineColor?: string;
  outlineOffset?: number;
};

/**
 * Le focus des champs et des selecteurs (ADR 0012, amende par l'ADR 0017) : le trait deja
 * present se recolore, et un anneau de meme couleur s'encastre juste derriere lui.
 *
 * Le trait seul, de 1 px, etait le seul marqueur : a cote du reste du kit, qui porte une bague
 * nette de 2 px, le champ etait devenu le point faible visuel de l'ensemble. Primer fait les
 * deux sur son `TextInputWrapper` : `border-color: accent` et `outline: 2px solid accent` avec
 * `outline-offset: -1px`.
 *
 * L'anneau est encastre, ce qui preserve le motif d'origine de l'ADR 0016 : un contour
 * interieur ne pousse rien, la mise en page ne bouge pas d'un pixel au focus. L'epaisseur de
 * bordure reste elle aussi celle du repos.
 *
 * L'anneau ne vaut que sur le web, comme `focusRing` : `outline` n'existe pas sur iOS
 * (cf. UnsupportedCSSProperties). La bordure, elle, se dessine partout - c'est pourquoi elle
 * reste hors de la condition de plateforme.
 */
export const focusBorder = (): FocusBorderStyle => ({
  borderWidth: 1,
  borderColor: Colors.Focus[525],
  ...(Platform.OS === 'web'
    ? {
        outlineWidth: FocusRingMetrics.width,
        outlineStyle: 'solid' as const,
        outlineColor: Colors.Focus[525],
        outlineOffset: FocusRingMetrics.insetOffset,
      }
    : {}),
});
