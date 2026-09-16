import { renderHookOnDesktop } from '@/__tests__/helpers/renderWeb';
import { useStyles } from './Button.styles';
import { EtatDuBouton } from './Button.types';
import { styleDeLIcone, styleDeSurvol } from './buttonStyling';

// Le survol n'est observable sur aucune des deux plateformes : Tamagui consomme `hoverStyle`
// sans le rendre, et jsdom n'evalue pas les pseudo-classes. C'est l'extraction de la decision
// hors du composant qui la rend testable, et ce test est la raison d'etre de cette extraction.
const styles = () => renderHookOnDesktop(useStyles).result.current;

const etat = (surcharge: Partial<EtatDuBouton>): EtatDuBouton => ({
  variant: 'primary',
  taille: 'md',
  iconeSeule: false,
  ...surcharge,
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
