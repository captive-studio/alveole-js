import { renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { FOCUS_ATTRIBUTE } from '@alveole/theme';
import { MarkdownDescription } from './MarkdownDescription';

// react-markdown ne distingue plus l'inline du bloc par une prop `inline` depuis la v9, et
// un bloc de code sans langage ne porte pas de classe `language-*` non plus : rien ne
// permettait alors de séparer les deux, et tout code sans langage, inline ou non, partait
// dans le même composant. `Highlight` pose un conteneur défilant, focusable au clavier,
// que `Code` ne pose jamais : c'est ce conteneur qui sert de marqueur ci-dessous.
const highlightContainer = (container: HTMLElement) => container.querySelector('[tabindex="0"]');

describe('MarkdownDescription', () => {
  test('rend le code inline dans le composant Code, pas Highlight', () => {
    const { container } = renderWeb(
      <MarkdownDescription>{'Du texte avec `const a = 1;` dedans.'}</MarkdownDescription>,
    );

    const code = container.querySelector('code');

    expect(code?.textContent).toBe('const a = 1;');
    expect(highlightContainer(container)).toBeNull();
  });

  test('rend un bloc de code multiligne sans langage dans le composant Highlight, pas Code', () => {
    const { container } = renderWeb(<MarkdownDescription>{'```\nmulti\nligne\n```'}</MarkdownDescription>);

    expect(container.querySelector('code')).toBeNull();
    expect(highlightContainer(container)).not.toBeNull();
    expect(container.textContent).toContain('multi');
    expect(container.textContent).toContain('ligne');
  });

  test('rend un bloc de code multiligne avec langage dans le composant Highlight', () => {
    const { container } = renderWeb(<MarkdownDescription>{'```typescript\nconst a = 1;\n```'}</MarkdownDescription>);

    expect(container.querySelector('code')).toBeNull();
    expect(highlightContainer(container)).not.toBeNull();
  });

  test('rend un tableau GFM valide en <table>', () => {
    const { container } = renderWeb(<MarkdownDescription>{'| Colonne |\n|---|\n| Valeur |'}</MarkdownDescription>);

    expect(container.querySelector('table')).not.toBeNull();
  });

  // Une vue Tamagui refuse un nœud de texte nu en enfant direct, et son message d'erreur
  // sérialise les props de la vue — dont le contexte du thème, circulaire : la cellule qui
  // posait son texte à même la `Box` faisait planter le rendu sur un « Converting circular
  // structure to JSON » au lieu d'un simple avertissement.
  test('enveloppe le contenu des cellules dans un élément de texte, jamais à même la cellule', () => {
    const { container } = renderWeb(
      <MarkdownDescription>{'| Propriété |\n|---|\n| `09:30` (9h30 le matin) |'}</MarkdownDescription>,
    );

    const cells = [...container.querySelectorAll('th, td')];
    const nuDeTexte = (cell: Element) => [...cell.childNodes].some(n => n.nodeType === Node.TEXT_NODE);

    expect(cells).toHaveLength(2);
    expect(cells.map(nuDeTexte)).toEqual([false, false]);
    expect(container.querySelector('th')?.textContent).toBe('Propriété');
    expect(container.querySelector('td')?.textContent).toBe('09:30 (9h30 le matin)');
  });

  // remark-gfm exige autant de colonnes dans la ligne de séparation que dans l'en-tête :
  // sinon il n'y voit pas un tableau et laisse les `|` tels quels dans le texte.
  test("ne rend pas de <table> quand la ligne de séparation n'a pas le même nombre de colonnes que l'en-tête", () => {
    const { container } = renderWeb(<MarkdownDescription>{'| Colonne |\n|---|---|\n| Valeur |'}</MarkdownDescription>);

    expect(container.querySelector('table')).toBeNull();
  });

  // La bordure de la citation se mesure au navigateur (apps/docs/e2e/markdown.spec.ts).
  test('rend une citation dans un vrai blockquote', () => {
    const { container } = renderWeb(<MarkdownDescription>{'> Une citation.'}</MarkdownDescription>);

    const blockquote = container.querySelector('blockquote');

    expect(blockquote?.textContent?.trim()).toBe('Une citation.');
  });

  // Couleur et soulignement du lien se mesurent au navigateur (apps/docs/e2e/markdown.spec.ts).
  test('rend les liens vers leur destination', () => {
    const { container } = renderWeb(
      <MarkdownDescription>{'[whatwg/html#5488](https://github.com/whatwg/html/issues/5488)'}</MarkdownDescription>,
    );

    const link = container.querySelector('a');

    expect(link?.getAttribute('href')).toBe('https://github.com/whatwg/html/issues/5488');
  });
});

describe('MarkdownDescription : coupures de ligne', () => {
  // En Markdown, une phrase coupée sur deux lignes source reste une seule phrase. Ici elle
  // finit dans un `Text` de react-native-web, qui préserve `\n` là où HTML l'aurait replié :
  // toute description un peu longue s'affichait donc coupée là où l'auteur avait passé à la
  // ligne dans son JSDoc, dans toutes les fiches du catalogue.
  test('replie une phrase coupée sur deux lignes source en une seule ligne', () => {
    const { container } = renderWeb(<MarkdownDescription>{'Une phrase coupée\nsur deux lignes.'}</MarkdownDescription>);

    expect(container.textContent).toBe('Une phrase coupée sur deux lignes.');
  });

  // Le pendant du test précédent : replier les coupures ne doit pas effacer celle que l'auteur
  // a demandée, qui s'écrit en Markdown par deux espaces en fin de ligne.
  test('garde la coupure de ligne demandée par deux espaces en fin de ligne', () => {
    const { container } = renderWeb(<MarkdownDescription>{'Ligne un.  \nLigne deux.'}</MarkdownDescription>);

    expect(container.querySelector('br')).not.toBeNull();
  });
});

// Les liens d'une description sont rendus par `Typography tag="a"` : de vrais `<a>`, qui
// gardaient le contour `1px auto` du navigateur alors que tout le reste du kit montre la
// bague. Trois liens dans le catalogue tombaient encore dessus (mesure en navigateur).
test('demande la bague de focus au theme sur les liens', () => {
  renderWeb(<MarkdownDescription>{'Voir [Primer](https://primer.style).'}</MarkdownDescription>);

  expect(screen.getByRole('link').getAttribute(FOCUS_ATTRIBUTE)).toBe('ring');
});
