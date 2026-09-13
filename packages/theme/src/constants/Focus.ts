import { Colors } from './Color';

/**
 * `default` sur les fonds clairs, `emphasis` sur les fonds pleins (primary, danger),
 * ou l'anneau d'accent devient illisible.
 */
export type FocusRingKind = 'default' | 'emphasis';

const OUTLINE_COLORS: Record<FocusRingKind, string> = {
  default: Colors.BleuCaptive['main-525'],
  emphasis: Colors.BleuCaptive['975'],
};

export const focusRing = (kind: FocusRingKind) => ({
  outlineWidth: 2,
  outlineColor: OUTLINE_COLORS[kind],
});
