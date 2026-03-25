import { Breakpoints } from '../constants/Breakpoint';
import { RadiusList } from '../constants/Radius';
import { Heights, Sizes } from '../constants/Sizes';
import { Spacings } from '../constants';
import { Theme } from '../type';

const sanitizeSegment = (key: string): string => key.replace(/,/g, '-');

const flattenRecord = (
  obj: Record<string, unknown>,
  prefixParts: string[],
  lines: string[],
  formatValue: (v: string | number) => string,
): void => {
  for (const [rawKey, value] of Object.entries(obj)) {
    if (value === null || value === undefined) continue;
    const key = sanitizeSegment(rawKey);

    if (typeof value === 'string' || typeof value === 'number') {
      const name = [...prefixParts, key].join('-');
      lines.push(`  --${name}: ${formatValue(value)};`);
      continue;
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      flattenRecord(value as Record<string, unknown>, [...prefixParts, key], lines, formatValue);
    }
  }
};

const generateCSSVariables = (theme: Theme): string => {
  const lines: string[] = [];

  // Palette brute Color.ts (équivalent JS : theme.color._constants)
  flattenRecord(theme.color._constants as unknown as Record<string, unknown>, ['color'], lines, v => String(v));

  // Palette sémantique Palette.ts (CustomPalette fusionné avec les surcharges du ThemeProvider)
  const color = theme.color as Record<string, unknown>;
  for (const [rawKey, value] of Object.entries(color)) {
    if (rawKey === '_constants' || rawKey === 'alpha') continue;
    if (typeof value === 'function') continue;
    const key = sanitizeSegment(rawKey);

    if (typeof value === 'string' || typeof value === 'number') {
      lines.push(`  --palette-${key}: ${value};`);
      continue;
    }

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      flattenRecord(value as Record<string, unknown>, ['palette', key], lines, v => String(v));
    }
  }

  // Spacing
  Object.entries(Spacings).forEach(([key, value]) => {
    lines.push(`  --spacing-${sanitizeSegment(key)}: ${value}px;`);
  });

  // Rayons
  Object.entries(RadiusList).forEach(([key, value]) => {
    lines.push(`  --radius-${key}: ${value}px;`);
  });

  // Typographie (tailles / interlignes)
  Object.entries(Sizes).forEach(([key, value]) => {
    lines.push(`  --font-size-${key}: ${value}px;`);
  });
  Object.entries(Heights).forEach(([key, value]) => {
    const cssVal = typeof value === 'number' ? `${value}px` : value;
    lines.push(`  --line-height-${key}: ${cssVal};`);
  });

  // Breakpoints (px, utilisable en media queries avec comparaisons ou en valeur numérique)
  Object.entries(Breakpoints).forEach(([key, value]) => {
    lines.push(`  --breakpoint-${key.toLowerCase()}: ${value}px;`);
  });

  return `:root {\n${lines.join('\n')}\n}`;
};

export const injectVariableCSS = (theme: Theme) => {
  if (typeof document === 'undefined') return;

  const styleId = 'theme-css-variables';
  const oldStyle = document.getElementById(styleId);
  if (oldStyle) oldStyle.remove();

  const styleTag = document.createElement('style');
  styleTag.id = styleId;
  styleTag.innerHTML = generateCSSVariables(theme);

  document.head.appendChild(styleTag);
};
