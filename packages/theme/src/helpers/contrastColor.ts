type Canal = number;

const EST_HEXADECIMAL = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

const versCanaux = (couleur: string): Canal[] => {
  const hexadecimal = couleur.replace(/^#/, '');
  const complet =
    hexadecimal.length === 3
      ? hexadecimal
          .split('')
          .map(c => c + c)
          .join('')
      : hexadecimal;

  return [0, 2, 4].map(debut => parseInt(complet.slice(debut, debut + 2), 16));
};

// Luminance relative au sens de WCAG 2.
const luminance = (canaux: Canal[]): number => {
  const [r, v, b] = canaux.map(canal => {
    const proportion = canal / 255;

    return proportion <= 0.03928 ? proportion / 12.92 : Math.pow((proportion + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * v + 0.0722 * b;
};

/** Le rapport de contraste entre deux couleurs, de 1 (identiques) à 21 (noir sur blanc). */
export const contrastRatio = (premiere: string, seconde: string): number => {
  const a = luminance(versCanaux(premiere));
  const b = luminance(versCanaux(seconde));

  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
};

const versHexadecimal = (canaux: Canal[]): string =>
  `#${canaux.map(canal => Math.round(canal).toString(16).padStart(2, '0')).join('')}`;

/**
 * Assombrit une couleur jusqu'à ce qu'elle atteigne le rapport de contraste demandé sur le
 * fond donné, en conservant sa teinte. Une couleur qui l'atteint déjà revient inchangée.
 *
 * Écrit pour les palettes de coloration syntaxique, conçues pour des éditeurs et non pour
 * WCAG : plutôt que de corriger une table de teintes à la main, qui deviendrait fausse au
 * premier changement de thème, on ramène chaque couleur au seuil quel que soit le thème.
 */
export const withMinimumContrast = (couleur: string, fond: string, seuil: number): string => {
  // Sur le web le thème rend des variables CSS, et rien n'interdit non plus une couleur
  // nommée ou en `rgb()`. Ce qui n'est pas lisible ici ressort tel quel : corriger à
  // l'aveugle effacerait la couleur d'origine, ce qui est pire que de ne rien corriger.
  if (!EST_HEXADECIMAL.test(couleur) || !EST_HEXADECIMAL.test(fond)) return couleur;

  const canaux = versCanaux(couleur);

  if (contrastRatio(couleur, fond) >= seuil) return couleur;

  // Le noir atteint toujours le seuil sur un fond clair : la recherche se termine.
  for (let facteur = 0.99; facteur > 0; facteur -= 0.01) {
    const assombrie = versHexadecimal(canaux.map(canal => canal * facteur));

    if (contrastRatio(assombrie, fond) >= seuil) return assombrie;
  }

  return '#000000';
};
