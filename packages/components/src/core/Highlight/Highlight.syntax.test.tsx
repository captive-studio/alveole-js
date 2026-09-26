import { renderNative } from '@/__tests__/helpers/renderNative';
import { View } from 'react-native';
import type { SyntaxHighlighterProps } from 'react-syntax-highlighter';
import type { HighlightProps } from './Highlight';
import Prism from './Highlight.syntax';

type Noeud = Parameters<NonNullable<SyntaxHighlighterProps['renderer']>>[0]['rows'][number];

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

/** Les textes que le moteur a reconnus comme jetons, a n'importe quelle profondeur. */
const jetons = (noeuds: Noeud[], dansUnJeton = false): string[] =>
  noeuds.flatMap(noeud => {
    const jeton = dansUnJeton || (noeud.properties?.className ?? []).map(String).includes('token');

    if (noeud.children) return jetons(noeud.children, jeton);

    return jeton && noeud.value ? [String(noeud.value)] : [];
  });

const jetonsDe = async (language: HighlightProps['language'], code: string) => {
  let lignes: Noeud[] = [];
  await renderNative(
    <Prism
      language={language}
      CodeTag={View}
      PreTag={View}
      renderer={({ rows }) => {
        lignes = rows;
        return null;
      }}
    >
      {code}
    </Prism>,
  );

  return jetons(lignes);
};

// Un langage non enregistre retombe silencieusement en texte brut : le rendu reussit, mais
// aucun jeton n'est reconnu. On le verifie sur la tokenisation, sans lire de couleur (ADR 0027).
describe('langages de Highlight', () => {
  it.each(cases)('reconnait $token dans $language : $code', async ({ language, code, token }) => {
    expect(await jetonsDe(language, code)).toContain(token);
  });
});
