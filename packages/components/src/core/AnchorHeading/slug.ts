import React from 'react';

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

/** Le texte brut d'un titre, gras ou code compris : de quoi en tirer l'ancre et le nom du lien. */
export const texteDe = (node: React.ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(texteDe).join('');
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) return texteDe(node.props.children);
  return '';
};
