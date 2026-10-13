import { renderScreen, screen } from '../../__tests__/helpers/renderScreen';
import { FormulairesPage } from './FormulairesPage';
import { SECTIONS_DE_FORMULAIRES } from './formulaires';
import { Sources } from './formulaires.stories';

describe('FormulairesPage', () => {
  it('montre une section par entree du texte', () => {
    renderScreen(<FormulairesPage />);

    for (const { titre } of SECTIONS_DE_FORMULAIRES) {
      expect(screen.getByLabelText(`Lien vers la section ${titre}`)).toBeTruthy();
    }
  });

  it('chaque demo nommee a son code source', () => {
    for (const { demo } of SECTIONS_DE_FORMULAIRES) {
      if (!demo) continue;
      expect(Sources.storySources[demo]()).toContain(`export const ${demo}`);
    }
  });
});
