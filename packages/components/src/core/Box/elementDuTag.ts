// Un nom d'element invalide fait lever `createElement` au DOM et tomber tout le rendu.
const NOM_D_ELEMENT = /^[a-z][a-z0-9-]*$/;

export const elementDuTag = (tag: string | undefined) => {
  if (tag === undefined) return 'box';
  if (NOM_D_ELEMENT.test(tag)) return tag;
  if (__DEV__) {
    console.warn('Warning:', `Box : le tag "${tag}" n'est pas un nom d'element en minuscules, rendu en <box>.`);
  }
  return 'box';
};
