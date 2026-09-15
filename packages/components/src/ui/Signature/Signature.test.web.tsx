import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { Signature } from './Signature';

test('se rend sans boucler', () => {
  renderWeb(<Signature height={200} onChange={() => undefined} />);

  expect(screen.getByRole('button', { name: 'Effacer' })).toBeTruthy();
});

// Le bouton d'effacement utilisait `size="xs"`, seule taille du Button dont le rembourrage
// vertical, 8, depassait celui de `sm`, 6. La taille a ete supprimee du design system et ce
// bouton est passe en `sm` : son libelle grossit de 12 a 14 et passe de Regular a Medium.
// L'ecart est assume, ce test l'enregistre.
//
// L'assertion porte sur le nom du jeton et non sur `14px` : jsdom ne resout pas les
// variables CSS du theme, et le nom identifie la taille de maniere plus lisible qu'une
// valeur en pixels.
test('affiche le libelle d effacement a la taille sm', () => {
  renderWeb(<Signature height={200} onChange={() => undefined} />);

  expect(getComputedStyle(screen.getByText('Effacer')).fontSize).toBe(
    'var(--typography-corps-de-texte-sm-medium-font-size)',
  );
});
