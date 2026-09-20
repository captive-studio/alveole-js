import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { FOCUS_ATTRIBUTE } from '@alveole/theme';
import { Accordion } from './Accordion';
import { AccordionItem } from './AccordionItem';

// L'entete de l'accordeon est un vrai bouton, atteignable au clavier, mais il n'avait aucun
// traitement de focus : il tombait sur le contour par defaut du navigateur, la ou tous les
// autres controles du kit montrent la bague.
test('demande la bague de focus au theme sur l entete depliante', () => {
  renderWeb(
    <Accordion type="multiple">
      <AccordionItem value="a" label="Section" />
    </Accordion>,
  );

  expect(screen.getByRole('button').getAttribute(FOCUS_ATTRIBUTE)).toBe('ring');
});
