import { renderWeb } from '@/__tests__/helpers/renderWeb';
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

  // remark-gfm exige autant de colonnes dans la ligne de séparation que dans l'en-tête :
  // sinon il n'y voit pas un tableau et laisse les `|` tels quels dans le texte.
  test("ne rend pas de <table> quand la ligne de séparation n'a pas le même nombre de colonnes que l'en-tête", () => {
    const { container } = renderWeb(<MarkdownDescription>{'| Colonne |\n|---|---|\n| Valeur |'}</MarkdownDescription>);

    expect(container.querySelector('table')).toBeNull();
  });

  test('rend une citation avec une bordure gauche de 2px, pas un blockquote nu', () => {
    const { container } = renderWeb(<MarkdownDescription>{'> Une citation.'}</MarkdownDescription>);

    const blockquote = container.querySelector('blockquote');

    expect(blockquote?.textContent?.trim()).toBe('Une citation.');
    expect(blockquote?.getAttribute('style')).toContain('border-left-width: 2px');
  });
});
