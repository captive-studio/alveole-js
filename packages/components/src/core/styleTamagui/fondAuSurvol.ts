import { ThemeColor } from '@alveole/theme';

/**
 * Separe le fond d'un style d'item du reste de sa forme, et le rend avec celui du survol sur
 * une seule valeur : une clause ne vit que sur la prop qui porte le repos (ADR 0031).
 */
export const fondAuSurvol = <Style extends { backgroundColor?: ThemeColor }>(style: Style, survol: ThemeColor) => {
  const { backgroundColor, ...forme } = style;
  return { forme, fond: { default: backgroundColor, hover: survol } };
};
