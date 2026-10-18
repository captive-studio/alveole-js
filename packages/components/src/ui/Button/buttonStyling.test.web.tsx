import { renderHookOnDesktop } from '@/__tests__/helpers/renderWeb';
import { useStyles } from './Button.styles';
import { EtatDuBouton } from './Button.types';
import { styleDeLIcone, styleDeSurvol, styleDuConteneur } from './buttonStyling';

// Le survol n'est pas observable en jsdom, qui ne simule pas le pointeur du Pressable et
// n'evalue pas les pseudo-classes. C'est l'extraction de la decision
// hors du composant qui la rend testable, et ce test est la raison d'etre de cette extraction.
const styles = () => renderHookOnDesktop(useStyles).result.current;

const etat = (surcharge: Partial<EtatDuBouton>): EtatDuBouton => ({
  variant: 'primary',
  taille: 'md',
  ...surcharge,
});

// Le bouton tirait sa hauteur de l'echelle de controle mais son retrait d'un litteral, si
// bien que `control(...).paddingInline` ne pilotait rien. C'est la meme echelle qui doit
// creuser le bouton et le champ, sans quoi les deux se desaccordent au premier ajustement.
test('creuse le bouton md selon l echelle de controle', () => {
  expect(styles().mdContainer.paddingLeft).toBe(12);
});

test('creuse les boutons sm et lg selon la meme echelle', () => {
  const table = styles();

  expect({ sm: table.smContainer.paddingLeft, lg: table.lgContainer.paddingLeft }).toEqual({
    sm: 8,
    lg: 16,
  });
});

test('donne a chaque variante son propre fond de survol', () => {
  const table = styles();

  expect(styleDeSurvol(table, etat({ variant: 'tertiary' })).backgroundColor).not.toBe(
    styleDeSurvol(table, etat({ variant: 'primary' })).backgroundColor,
  );
});

// Un bouton desactive ne doit pas reagir au survol : la table de variante est court-circuitee
// avant meme d'etre consultee.
test('ne donne aucun fond de survol a un bouton desactive', () => {
  expect(styleDeSurvol(styles(), etat({ disabled: true }))).toEqual({});
});

// Meme court-circuit que sur le fond au repos : un bouton selectionne survole reste
// selectionne, quelle que soit sa variante.
test('donne le meme survol a deux variantes selectionnees', () => {
  const table = styles();

  expect(styleDeSurvol(table, etat({ variant: 'danger', selected: true }))).toEqual(
    styleDeSurvol(table, etat({ variant: 'primary', selected: true })),
  );
});

// L'icone ne suit pas la taille du bouton d'un cran : seul `lg` la grossit, `sm` et `md`
// partagent la meme. Rien ne l'observait, et remplacer la regle par une taille fixe ne
// cassait aucun test.
test('ne grossit l icone que pour la taille lg', () => {
  const table = styles();

  expect(styleDeLIcone(table, etat({ taille: 'lg' }), false).size).toBe('md');
  expect(styleDeLIcone(table, etat({ taille: 'md' }), false).size).toBe('sm');
  expect(styleDeLIcone(table, etat({ taille: 'sm' }), false).size).toBe('sm');
});

// Tamagui v3 a retire `hoverStyle` : le conteneur suit l'etat du pointeur, comme le libelle et
// l'icone, plutot qu'une clause qui perdrait face au fond que pose son `style`.
test('pose le fond de survol sur le conteneur survole', () => {
  const table = styles();

  expect(styleDuConteneur(table, etat({ variant: 'tertiary' }), { actif: false, survole: true }).backgroundColor).toBe(
    styleDeSurvol(table, etat({ variant: 'tertiary' })).backgroundColor,
  );
});
