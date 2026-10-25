import { elementDuTag } from './elementDuTag';

describe('elementDuTag', () => {
  let warn: jest.SpyInstance;
  beforeEach(() => {
    warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });
  afterEach(() => warn.mockRestore());

  it('rend un element box sans tag', () => {
    expect(elementDuTag(undefined)).toBe('box');
  });

  it('garde un tag nomme d apres son composant', () => {
    expect(elementDuTag('sidebar-item')).toBe('sidebar-item');
  });

  // Un nom invalide fait lever `createElement` au DOM (InvalidCharacterError) et tomber tout le
  // rendu ; une majuscule initiale, elle, est passee en minuscules par le HTML.
  it.each(['mon tag', 'Carte', 'carte!'])('retombe sur box pour le tag invalide %p', tag => {
    expect(elementDuTag(tag)).toBe('box');
  });

  // Le repli est silencieux pour l'utilisateur : le developpeur, lui, doit savoir que son nom
  // d'element est perdu.
  it('previent le developpeur qu un tag invalide est remplace', () => {
    elementDuTag('Carte');

    expect(warn).toHaveBeenCalledWith('Warning:', expect.stringContaining('"Carte"'));
  });
});
