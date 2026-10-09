import { renderScreen, screen } from '../../__tests__/helpers/renderScreen';
import { MigrationV2Page } from './MigrationV2Page';
import { SECTIONS_DE_MIGRATION_V2 } from './migrationV2';

// La page se rend a partir de ses donnees : ajouter une section au fichier doit suffire a la
// voir a l'ecran. Le test verifie ce lien, pas la prose, qui est libre de changer.
describe('MigrationV2Page', () => {
  it('montre une section par entree du guide de migration', () => {
    renderScreen(<MigrationV2Page />);

    for (const { titre } of SECTIONS_DE_MIGRATION_V2) {
      expect(screen.getByLabelText(`Lien vers la section ${titre}`)).toBeTruthy();
    }
  });
});
