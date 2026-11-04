import type { TokenSemantique } from './catalogueDesCouleurs';
import { contrasteDuToken } from './contrasteDuToken';

const token = (champs: Partial<TokenSemantique>): TokenSemantique => ({
  chemin: 'light.text.default-grey',
  famille: 'light / text',
  nuance: null,
  hex: '#373A3F',
  deprecie: false,
  remplacant: null,
  ...champs,
});

const FOND_PAR_DEFAUT = '#F0F0F0';

// Le calcul WCAG est celui du theme, teste chez lui : ici, un rapport connu par couple de couleurs.
const rapports: Record<string, number> = {
  '#373A3F sur #F0F0F0': 10.2,
  '#929292 sur #F0F0F0': 2.8,
  '#DEE3EC sur #FFFFFF': 1.3,
};
const contraste = (couleur: string, fond: string) => rapports[`${couleur} sur ${fond}`] ?? 0;

const juger = (champs: Partial<TokenSemantique>) =>
  contrasteDuToken(token(champs), { fondParDefaut: FOND_PAR_DEFAUT, contraste });

it('juge un texte lisible sur le fond par defaut', () => {
  expect(juger({})).toEqual({ ratio: 10.2, fond: 'background.default-grey', verdict: 'conforme' });
});

it('juge insuffisant un texte sous 4,5:1', () => {
  expect(juger({ hex: '#929292' })?.verdict).toBe('insuffisant');
});

// WCAG 1.4.3 exempte le texte d'un composant inactif : un echec y serait un faux signal.
it('exempte un texte desactive', () => {
  expect(juger({ chemin: 'light.text.disabled-grey', hex: '#929292' })?.verdict).toBe('exempté');
});

// Un filet ou un aplat decoratif n'a pas de seuil sans son contexte : un verdict serait un faux echec.
it('donne le rapport d une bordure sur blanc, sans verdict', () => {
  expect(juger({ chemin: 'light.border.default-grey', famille: 'light / border', hex: '#DEE3EC' })).toEqual({
    ratio: 1.3,
    fond: 'blanc',
    verdict: null,
  });
});

// `transparent` et les `rgba(...)` prennent la couleur de ce qu'ils recouvrent : aucun rapport fixe.
it('ne donne aucun rapport pour une couleur qui n est pas opaque', () => {
  expect(juger({ hex: 'transparent' })).toBeNull();
});
