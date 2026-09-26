import { renderNative } from '@/__tests__/helpers/renderNative';
import { ButtonIcon } from './ButtonIcon';

// Le style du bouton-icone se teste hors rendu (buttonIconStyling.test.tsx) et se mesure dans
// le navigateur (apps/docs/e2e/button.spec.ts) : il ne reste ici que le contrat (ADR 0027).

// Un `icon` numerique n'affiche pas d'icone mais le nombre lui-meme, via `styleDuNombre`, un
// troisieme bloc de decision de 23 lignes reserve a ce seul cas. Aucun appelant du depot ne
// s'en sert, mais le paquet est publie : ce test fige le comportement sans le trancher.
it('affiche le nombre lui-meme quand icon est numerique', async () => {
  const { getByText } = await renderNative(<ButtonIcon accessibilityLabel="Valider" variant="primary" icon={3} />);

  expect(getByText('3')).toBeTruthy();
});

// Un bouton sans libelle n'a que son nom accessible pour se decrire. Sans role ni nom, le
// DOM web produit un `div` focusable et muet : on l'atteint au clavier, mais rien n'annonce
// ce qu'il fait. L'audit axe ne peut pas le voir, aucune de ses regles ne portant sur un
// `div` focusable sans role, d'ou une baseline a zero violation qui reste verte.
it('s annonce comme un bouton portant son nom', async () => {
  const { getByRole } = await renderNative(<ButtonIcon variant="tertiary" icon="X" accessibilityLabel="Fermer" />);

  expect(getByRole('button', { name: 'Fermer' })).toBeTruthy();
});
