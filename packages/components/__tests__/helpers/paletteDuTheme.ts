import { CustomPalette, enCouleursDuTheme } from '@alveole/theme';

/**
 * La palette claire, marquee comme les couleurs que rend le theme : Box n'accepte qu'elles
 * (ADR 0033).
 */
export const paletteDuTheme = enCouleursDuTheme(CustomPalette).light;
