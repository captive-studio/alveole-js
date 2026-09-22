import { DateFormats, isDateFormat } from './dateFormat';

test('reconnait un format du catalogue', () => {
  expect(isDateFormat(DateFormats.Date)).toBe(true);
});

test('rejette une chaine qui n est pas un format du catalogue', () => {
  expect(isDateFormat('JJ/MM/AAAA')).toBe(false);
});

// `value != null` couvre `undefined` autant que `null` : le garde existe parce que la fonction
// recoit des `unknown` venus de la configuration, ou l'absence de format est le cas courant.
test.each([[null], [undefined], [42]])('rejette la valeur %p, qui n est pas une chaine', valeur => {
  expect(isDateFormat(valeur)).toBe(false);
});
