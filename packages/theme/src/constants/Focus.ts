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

const OUTLINE_COLORS: Record<FocusRingKind, string> = {
  default: Colors.BleuCaptive['main-525'],
  emphasis: Colors.BleuCaptive['975'],
};

/**
 * Web uniquement : `outline` ne decale pas la mise en page, mais n'existe pas sur iOS
 * (cf. UnsupportedCSSProperties). Un anneau natif demanderait une vue dessinee en absolu.
 */
export const focusRing = (kind: FocusRingKind): FocusRingStyle =>
  Platform.OS === 'web'
    ? { outlineWidth: 2, outlineStyle: 'solid', outlineColor: OUTLINE_COLORS[kind], outlineOffset: 2 }
    : {};

export type FocusBorderStyle = {
  borderWidth: number;
  borderColor: string;
};

/**
 * La bordure de focus des champs et des selecteurs (ADR 0012), distincte de l'anneau des
 * autres controles : elle recolore le trait deja present au lieu d'en superposer un second.
 *
 * Rien n'y ajoute d'`outline`, d'`outlineOffset` ni de `boxShadow` : l'absence est la
 * definition. L'epaisseur reste celle du repos, sinon la mise en page bougerait d'un pixel
 * a chaque focus.
 *
 * Aucune condition de plateforme, contrairement a `focusRing` : une bordure se dessine
 * partout, la ou `outline` n'existe pas sur iOS.
 */
export const focusBorder = (): FocusBorderStyle => ({ borderWidth: 1, borderColor: Colors.Focus[525] });
