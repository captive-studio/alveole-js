import { renderScreen, screen } from '../../__tests__/helpers/renderScreen';
import { InstallationPage } from './InstallationPage';
import { ETAPES_D_INSTALLATION } from './installation';

// Comme la Philosophie : la page se rend a partir de ses donnees, ajouter une etape au fichier
// doit suffire a la voir a l'ecran.
describe('InstallationPage', () => {
  it('montre une section par etape et chaque paragraphe', () => {
    renderScreen(<InstallationPage />);

    for (const { titre, paragraphes } of ETAPES_D_INSTALLATION) {
      expect(screen.getByLabelText(`Lien vers la section ${titre}`)).toBeTruthy();
      for (const paragraphe of paragraphes) expect(screen.getByText(paragraphe)).toBeTruthy();
    }
  });

  it('nomme le fichier de chaque extrait qui en a un', () => {
    renderScreen(<InstallationPage />);

    const fichiers = ETAPES_D_INSTALLATION.flatMap(({ extraits = [] }) => extraits.flatMap(e => e.fichier ?? []));
    for (const fichier of fichiers) expect(screen.getAllByText(fichier).length).toBeGreaterThan(0);
  });
});
