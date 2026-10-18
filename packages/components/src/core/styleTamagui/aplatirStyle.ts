// Tamagui v3 ne fusionne plus un style en tableau imbrique : il le pose tel quel sur le DOM, qui
// le refuse. Les styles a combiner sont donc fusionnes en un seul objet.
export const aplatirStyle = (style: unknown): Record<string, unknown> => {
  if (Array.isArray(style)) return Object.assign({}, ...style.map(aplatirStyle));
  if (style && typeof style === 'object') return { ...style };
  return {};
};
