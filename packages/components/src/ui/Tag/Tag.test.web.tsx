import { renderOnDesktop } from '@/__tests__/helpers/renderWeb';
import { Tag } from './Tag';

// Le style et le survol de l'etiquette se testent hors rendu (tagStyling.test.web.tsx) et se
// mesurent sous un vrai pointeur (apps/docs/e2e/tag.spec.ts) : il ne reste ici que le contrat
// (ADR 0027).

// jsdom ne synthetise pas le clic qu'un navigateur declenche sur Entree ou Espace : tirer
// un `keyDown` ici ne mesurerait que jsdom. Ce qui rend reellement la croix activable au
// clavier, c'est qu'elle soit un vrai `<button>` dans l'ordre de tabulation - et ca, ca
// s'observe. Un `<div role="button">` aurait le meme rendu et la meme annonce, mais
// n'obeirait ni a Entree ni a Espace sans code supplementaire.
it('fait de la croix un bouton natif atteignable au clavier', () => {
  const { container } = renderOnDesktop(
    <Tag size="sm" closable>
      Brouillon
    </Tag>,
  );
  const croix = container.querySelector('[role="button"]')!;

  expect({ element: croix.tagName, tabulation: croix.getAttribute('tabindex') }).toEqual({
    element: 'BUTTON',
    tabulation: '0',
  });
});
