import type { SelectOption } from './Select.types';

const normaliser = (texte: string) =>
  texte
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();

/**
 * Filtre local partagé par le web et le natif : la saisie est cherchée dans le
 * libellé et la description, sans tenir compte de la casse ni des accents.
 */
export const optionCorrespond = (option: SelectOption, saisie: string): boolean => {
  const aiguille = normaliser(saisie.trim());
  return [option.label, option.description].some(texte => texte !== undefined && normaliser(texte).includes(aiguille));
};
