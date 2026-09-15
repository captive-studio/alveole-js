import { useMemo } from 'react';
import { generateThemeCSSParts } from './helpers/injectVariableCSS';
import type { Theme } from './type';

export function WebThemeStyles({ theme }: { theme: Theme }) {
  const parts = useMemo(() => generateThemeCSSParts(theme), [theme]);

  return (
    <>
      {parts.map((css, index) => (
        // La liste est de taille et d'ordre fixes : l'index est une cle stable.
        <style key={index} precedence="default" dangerouslySetInnerHTML={{ __html: css }} />
      ))}
    </>
  );
}
