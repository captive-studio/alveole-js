import { decouperSource } from './storySource';

describe('decouperSource', () => {
  it('ne garde que les premieres lignes quand la source depasse le seuil', () => {
    const code = Array.from({ length: 20 }, (_, index) => `ligne ${index + 1}`).join('\n');

    expect(decouperSource(code, 12).visible.split('\n')).toHaveLength(12);
  });

  // Sans ce drapeau, la commande « Afficher tout » s'afficherait sous une source deja entiere.
  it('ne se declare pas tronquee quand la source tient sous le seuil', () => {
    const code = 'une ligne\ndeux lignes';

    expect(decouperSource(code, 12).tronque).toBe(false);
  });
});
