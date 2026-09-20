import { mediaDEtatVide } from './EmptyStateMedia';

describe('mediaDEtatVide', () => {
  it("retient l'illustration quand elle est fournie", () => {
    expect(mediaDEtatVide('une illustration', undefined)).toBe('illustration');
  });

  it("retient l'icone quand elle porte un nom connu et qu'aucune illustration ne prime", () => {
    expect(mediaDEtatVide(undefined, 'Check')).toBe('icone');
  });

  it("n'affiche rien quand le nom d'icone ne correspond a aucune icone", () => {
    expect(mediaDEtatVide(undefined, 'PasUneIcone')).toBe('aucun');
  });
});
