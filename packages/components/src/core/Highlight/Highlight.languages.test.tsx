import { renderNative } from '@/__tests__/helpers/renderNative';
import a11yOneLight from 'react-syntax-highlighter/dist/esm/styles/prism/a11y-one-light.js';
import { Highlight, HighlightProps } from './Highlight';

const cases: { language: HighlightProps['language']; code: string; token: string }[] = [
  { language: 'json', code: '{ "count": 42 }', token: '42' },
  { language: 'typescript', code: 'const count: number = 42;', token: 'const' },
  { language: 'tsx', code: '<Box display="flex" />', token: 'Box' },
  { language: 'ruby', code: 'class Greeter; end', token: 'class' },
  { language: 'bash', code: 'for file in *.ts; do echo "$file"; done', token: 'for' },
  { language: 'html', code: '<p>Hello</p>', token: 'p' },
  { language: 'html', code: '<style>body { color: red; }</style>', token: 'body' },
  { language: 'html', code: '<script>const count = 42;</script>', token: 'const' },
  { language: 'typescript', code: '/** @param {string} name */', token: '@param' },
  { language: 'typescript', code: 'sql`SELECT name FROM users`', token: 'SELECT' },
  { language: 'tsx', code: 'gql`query Users { users { id } }`', token: 'query' },
];

describe('langages de Highlight', () => {
  it.each(cases)('colore $token dans $language : $code', async ({ language, code, token }) => {
    const view = await renderNative(<Highlight language={language}>{code}</Highlight>);

    // Un langage non enregistré retombe silencieusement en texte brut : vérifier
    // la couleur du jeton permet de détecter cette régression malgré un rendu réussi.
    expect(view.getAllByText(token)[0]).not.toHaveStyle({
      color: a11yOneLight['code[class*="language-"]'].color,
    });
  });

  it('conserve les caractères du texte brut sans les interpréter', async () => {
    const view = await renderNative(<Highlight language="plaintext">{'plain <text> & value'}</Highlight>);

    expect(JSON.stringify(view.toJSON())).toContain('plain <text> & value');
  });
});
