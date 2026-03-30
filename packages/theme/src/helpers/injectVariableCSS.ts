import { Spacings } from '../constants';
import { Theme } from '../type';

const generateCSSVariables = (theme: Theme): string => {
  const lines: string[] = [];

  // Couleurs
  Object.entries(theme.color._constants).forEach(([key, colors]) => {
    Object.entries(colors).forEach(([variant, value]) => {
      lines.push(`  --color-${key}-${variant}: ${value};`);
    });
  });

  // Spacing
  Object.entries(Spacings).forEach(([key, value]) => {
    lines.push(`  --spacing-${key}: ${value}px;`);
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
