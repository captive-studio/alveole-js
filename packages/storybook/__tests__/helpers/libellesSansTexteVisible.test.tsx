import { render } from '@testing-library/react';
import { libellesSansTexteVisible } from './libellesSansTexteVisible';

// La regle axe `label-content-name-mismatch` ne tourne pas sous jsdom : ce garde-fou la
// remplace dans les tests d'ecran.
it('releve un bouton dont le libelle ne contient pas le texte visible', () => {
  const { container } = render(
    <button aria-label="SlateGrey 300 déprécié">
      <span>300</span>
      <span>déprécié</span>
    </button>,
  );

  expect(libellesSansTexteVisible(container)).toEqual(['SlateGrey 300 déprécié']);
});
