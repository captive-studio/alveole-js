import { Platform } from 'react-native';
import type { Theme } from '../type';

/**
 * Sur le web : `var(--palette-…)` aligné sur `injectVariableCSS`.
 * Sur iOS / Android : résolution depuis `theme.color` (pas de variables CSS).
 */
export function paletteCssVar(palette: Theme['color'], ...segments: string[]): string {
  if (segments.length === 0) {
    throw new Error('paletteCssVar requires at least one path segment');
  }

  if (Platform.OS === 'web') {
    const name = ['palette', ...segments.map(s => s.replace(/,/g, '-'))].join('-');
    return `var(--${name})`;
  }

  let value: unknown = palette;
  for (const segment of segments) {
    value = (value as Record<string, unknown>)?.[segment];
  }

  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  return '';
}
