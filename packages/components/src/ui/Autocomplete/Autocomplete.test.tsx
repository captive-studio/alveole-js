import { renderNative, userEvent } from '@/__tests__/helpers/renderNative';
import { Autocomplete } from './Autocomplete';

const VILLES = [
  { value: 'lyon', label: 'Lyon' },
  { value: 'paris', label: 'Paris' },
  { value: 'nantes', label: 'Nantes' },
];

// Hors web, tout se passe dans une modale : sans ouverture, aucune option n'est montee et le
// reste du filet ne pourrait rien observer. Ce test garde donc la porte d'entree.
it('ouvre la modale de selection quand on presse le champ', async () => {
  const view = await renderNative(<Autocomplete label="Villes" options={VILLES} />);

  expect(view.queryByText('Lyon')).toBeNull();

  await userEvent.setup().press(view.getByRole('button'));

  expect(view.getByText('Lyon')).toBeTruthy();
});

// En mode multiple, presser une option l'ajoute sans fermer la modale, et la represser la
// retire. Le `meta` transmis a l'appelant distingue ces deux gestes : sans lui, qui ecoute
// ne saurait pas ce qui vient de changer, seulement l'etat resultant.
it('ajoute puis retire une option en mode multiple', async () => {
  const onChange = jest.fn();
  const view = await renderNative(<Autocomplete label="Villes" options={VILLES} onChange={onChange} />);
  const utilisateur = userEvent.setup();
  await utilisateur.press(view.getByRole('button'));

  await utilisateur.press(view.getByText('Paris'));

  expect(onChange).toHaveBeenLastCalledWith([VILLES[1]], expect.objectContaining({ added: [VILLES[1]], removed: [] }));

  // Une fois selectionnee, la ville apparait deux fois : en puce dans le champ, sous la
  // modale, et en option dans la liste. Le champ est rendu avant la modale, donc la liste est
  // la seconde occurrence.
  const optionDansLaListe = () => view.getAllByText('Paris')[1];
  await utilisateur.press(optionDansLaListe());

  expect(onChange).toHaveBeenLastCalledWith([], expect.objectContaining({ added: [], removed: [VILLES[1]] }));
});

// En mode simple la regle s'inverse : choisir remplace au lieu d'ajouter, et ferme la modale.
// Les deux vont ensemble, une modale restee ouverte sur un choix deja fait inviterait a en
// faire un second qui ecraserait le premier sans le dire.
it('remplace la selection et ferme la modale en mode simple', async () => {
  const onChange = jest.fn();
  // La selection de depart n'est pas decorative : partant de rien, remplacer et ajouter
  // donnent le meme resultat, et le test ne distinguerait pas les deux.
  const view = await renderNative(
    <Autocomplete label="Villes" options={VILLES} isMulti={false} value={[VILLES[0]]} onChange={onChange} />,
  );
  const utilisateur = userEvent.setup();
  await utilisateur.press(view.getByRole('button'));

  await utilisateur.press(view.getByText('Paris'));

  expect(onChange).toHaveBeenLastCalledWith([VILLES[1]], expect.anything());
  expect(view.queryByText('Nantes')).toBeNull();
});

// La recherche filtre sur le libelle, sans tenir compte de la casse. C'est le seul moyen
// d'atteindre une option dans une longue liste : un filtre sensible a la casse rendrait
// invisible tout ce que l'utilisateur ne saisit pas exactement comme le catalogue.
it('filtre les options sur la recherche, sans egard a la casse', async () => {
  const view = await renderNative(<Autocomplete label="Villes" options={VILLES} />);
  const utilisateur = userEvent.setup();
  await utilisateur.press(view.getByRole('button'));

  await utilisateur.type(view.getByDisplayValue(''), 'PAR');

  expect(view.getByText('Paris')).toBeTruthy();
  expect(view.queryByText('Lyon')).toBeNull();
});

// `allowCreate` propose de creer l'option saisie, mais seulement tant qu'aucune option ni
// aucune selection ne porte deja ce libelle exact : sinon le champ proposerait de creer un
// doublon de ce qu'il affiche juste en dessous.
it('propose de creer l option saisie, sauf si elle existe deja', async () => {
  const onCreateOption = jest.fn();
  const view = await renderNative(
    <Autocomplete label="Villes" options={VILLES} allowCreate onCreateOption={onCreateOption} />,
  );
  const utilisateur = userEvent.setup();
  await utilisateur.press(view.getByRole('button'));
  const recherche = view.getByDisplayValue('');

  await utilisateur.type(recherche, 'Lyon');
  expect(view.queryByText('Ajouter « Lyon »')).toBeNull();

  await utilisateur.clear(recherche);
  await utilisateur.type(recherche, 'Brest');
  await utilisateur.press(view.getByText('Ajouter « Brest »'));

  expect(onCreateOption).toHaveBeenCalledWith(expect.objectContaining({ label: 'Brest', __created: true }));
});

// Les en-tetes de groupe ne sont poses qu'a la frontiere entre deux groupes. Repeter l'en-tete
// a chaque ligne noierait la liste ; l'omettre laisserait des options sans rattachement.
it('pose un en-tete de groupe a chaque changement de groupe seulement', async () => {
  const groupees = [
    { value: 'lyon', label: 'Lyon', group: 'Rhone' },
    { value: 'villeurbanne', label: 'Villeurbanne', group: 'Rhone' },
    { value: 'nantes', label: 'Nantes', group: 'Loire' },
  ];
  const view = await renderNative(<Autocomplete label="Villes" options={groupees} />);

  await userEvent.setup().press(view.getByRole('button'));

  expect(view.getAllByText('Rhone')).toHaveLength(1);
  expect(view.getAllByText('Loire')).toHaveLength(1);
});
