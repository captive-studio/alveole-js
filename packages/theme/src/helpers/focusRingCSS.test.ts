import { FOCUS_ATTRIBUTE, focusBorder, FocusRingMetrics } from '../constants/Focus';
import { generateFocusRingCSS } from './focusRingCSS';

// `Focus.ts` lit `Platform` pour desactiver l'anneau hors du web. Ce CSS n'existe que sur le
// web : la plateforme y est donc fixee, comme dans `injectVariableCSS.test.ts`.
jest.mock('react-native', () => ({ Platform: { OS: 'web', select: (obj: Record<string, unknown>) => obj.web } }));

// Le coeur du chantier : la bague doit naitre de `:focus-visible`, le seul selecteur qui
// distingue une arrivee au clavier d'un clic. Les trois references s'accordent la-dessus
// (Primer, `@atlaskit/focus-ring`, Base). Tant que la bague vient d'un state React branche
// sur `onFocus`, elle s'affiche aussi au clic, ce qui est le defaut constate en navigateur
// sur Button et sur Tabs.
it('pose la bague sur :focus-visible', () => {
  expect(generateFocusRingCSS()).toContain(':focus-visible');
});

// Une seule couleur de focus dans tout le kit. Avant ce chantier l'anneau prenait
// `BleuCaptive['main-525']` (#0379EF) et le trait des champs `Colors.Focus[525]` (#0A76F6) :
// deux bleus voisins pour le meme concept, alors que le ramp `Focus` existe exactement pour
// ca. Les trois references n'ont qu'un token (`focus.outline-color`, `--ds-border-focused`,
// `buttonFocusOuterBorder`). Assertion faite contre `focusBorder`, pas contre la constante :
// c'est le fait que les deux se rejoignent qui doit casser si l'un des deux derive.
it('reprend la couleur du trait de focus des champs', () => {
  expect(generateFocusRingCSS()).toContain(focusBorder().borderColor);
});

// Une couleur seule ne peint rien : sans largeur ni style, `outline` vaut `none`. Meme
// piege que celui deja fige sur `focusRing`. 2 px est la valeur des trois references
// (Primer `focus.outline-width`, `--ds-border-width-focused`, `scale0` de Base), et le
// minimum que demande le critere WCAG 2.4.7 cite par Primer.
it('dessine un trait de 2 px, sinon la couleur ne peint rien', () => {
  expect(generateFocusRingCSS()).toContain('outline: 2px solid');
});

// Colle a l'element, la bague se confond avec sa bordure : sur un bouton `secondary`, qui a
// deja un trait de 1 px, les deux ne feraient qu'un epais trait bleu. L'ecart la detache.
// Valeur d'`@atlaskit/focus-ring` par defaut, et de l'anneau actuel du kit.
it('ecarte la bague de l element pour la detacher de sa bordure', () => {
  expect(generateFocusRingCSS()).toContain(`outline-offset: ${FocusRingMetrics.offset}px`);
});

// Le navigateur pose son propre contour des qu'un element prend le focus, quelle qu'en soit
// la provenance : mesure en navigateur, un champ d'`OtpInput` clique affiche le `1px auto`
// gris-bleu de Chrome. Eteindre `:focus` quand `:focus-visible` ne s'applique pas est ce qui
// retire ce contour au clic sans toucher au parcours clavier. `@atlaskit/focus-ring` pose
// exactement cette regle.
it('eteint le contour du navigateur quand le focus ne vient pas du clavier', () => {
  expect(generateFocusRingCSS()).toContain(':focus:not(:focus-visible) { outline: none');
});

// La regle ne vaut que pour ce que le kit marque lui-meme. Une regle `:focus-visible` nue
// repeindrait aussi les `<a>` et les `<button>` propres a l'application cliente, ce que
// l'ADR 0008 refuse : le design system fournit des valeurs, il n'impose pas un rendu. C'est
// l'opt-in d'`@atlaskit/focus-ring`, ou chaque composant demande sa bague.
it('ne s applique qu aux elements que le kit marque', () => {
  const regles = generateFocusRingCSS().split('\n');

  expect(regles.every(regle => regle.startsWith(`[${FOCUS_ATTRIBUTE}`))).toBe(true);
});

// Un element a ras d'un bord ou rogne par un parent en `overflow: hidden` perd une bague
// posee a l'exterieur : c'est le cas des cellules de `DataTable` et des items de `Sidebar`.
// La variante la rentre a l'interieur. Primer en a fait sa valeur globale
// (`focus.outline-offset: -2px`), `@atlaskit/focus-ring` une variante explicite comme ici.
it('rentre la bague a l interieur pour les elements a ras', () => {
  expect(generateFocusRingCSS()).toContain(
    `[${FOCUS_ATTRIBUTE}='inset']:focus-visible { outline-offset: ${FocusRingMetrics.insetOffset}px`,
  );
});

// Tamagui laisse un `outline: none` en style inline sur certains de ses conteneurs (mesure sur
// la `Tabs.List` en navigateur) : un style inline bat toute feuille de style, et l'element
// marque restait sans bague, donc arret au clavier invisible. `!important` est sans danger ici
// parce que la regle ne touche que ce qui a explicitement demande la bague : un champ, qui
// eteint son contour au profit de sa bordure (ADR 0016), ne porte pas la marque.
it('prime sur les styles inline laisses par les bibliotheques tierces', () => {
  expect(generateFocusRingCSS()).toContain('!important');
});
