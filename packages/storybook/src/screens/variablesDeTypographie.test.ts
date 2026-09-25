import { variablesDeTypographie } from './variablesDeTypographie';

/** Un assainisseur de cle minimal : le vrai vient du theme, que ce projet ne charge pas. */
const nommer = (cle: string) => cle.toLowerCase();

// Une typographie ne publie sa famille et sa graisse que si elle les declare : une variable a
// `undefined` casserait la regle CSS qui la lit.
it('ne publie que la taille et l interligne d une typographie sans famille ni graisse', () => {
  const variables = variablesDeTypographie({ Titres: { H1: { fontSize: 40, lineHeight: 48 } } }, nommer);

  expect(variables.map(({ name }) => name)).toEqual([
    '--typography-titres-h1-font-size',
    '--typography-titres-h1-line-height',
  ]);
});

it('publie la famille et la graisse qu une typographie declare', () => {
  const variables = variablesDeTypographie(
    { Corps: { fontSize: 16, lineHeight: 24, fontFamily: 'Marianne', fontWeight: '700' } },
    nommer,
  );

  expect(variables.slice(2)).toEqual([
    { name: '--typography-corps-font-family', rawValue: 'Marianne', preview: 'none' },
    { name: '--typography-corps-font-weight', rawValue: '700', preview: 'none' },
  ]);
});

// Un groupe laisse vide (`null`) ne donne aucune variable : y descendre ferait lever
// `Object.entries`, et tout l'ecran des variables tomberait avec lui.
it('saute un groupe vide sans tomber', () => {
  const variables = variablesDeTypographie({ Retire: null, Corps: { fontSize: 16, lineHeight: 24 } }, nommer);

  expect(variables).toHaveLength(2);
});
