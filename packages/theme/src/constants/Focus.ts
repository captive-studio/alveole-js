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
  Platform.OS === 'web' ? { outlineWidth: 2, outlineColor: OUTLINE_COLORS[kind] } : {};
