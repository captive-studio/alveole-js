/**
 * L'ancre d'un titre. Extrait de AnchorHeading pour que ce qui pointe vers une ancre la
 * calcule de la meme facon : un sommaire qui slugifie autrement renvoie dans le vide.
 */
export const toSlug = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
