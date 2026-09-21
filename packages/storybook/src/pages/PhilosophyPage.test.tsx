import { renderScreen, screen } from '../../__tests__/helpers/renderScreen';
import { PhilosophyPage } from './PhilosophyPage';
import { SECTIONS_DE_PHILOSOPHIE } from './philosophie';

// La page se rend a partir de ses donnees : ajouter une section au fichier doit suffire a la
// voir a l'ecran. Le test verifie ce lien, pas la prose, qui est libre de changer.
describe('PhilosophyPage', () => {
  it('montre une section par entree du texte de philosophie', () => {
    renderScreen(<PhilosophyPage />);

    for (const { titre } of SECTIONS_DE_PHILOSOPHIE) {
      expect(screen.getByText(titre)).toBeTruthy();
    }
  });

  it('montre chaque paragraphe des sections', () => {
    renderScreen(<PhilosophyPage />);

    for (const { paragraphes } of SECTIONS_DE_PHILOSOPHIE) {
      for (const paragraphe of paragraphes) expect(screen.getByText(paragraphe)).toBeTruthy();
    }
  });
});
