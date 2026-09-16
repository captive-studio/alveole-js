import { act, renderNative } from '@/__tests__/helpers/renderNative';
import { useEffect } from 'react';
import { useDebouncedSearch } from './useDebouncedSearch';

type Saisie = (texte: string) => void;

// React Native refuse une chaine nue hors d'un <Text> : la sonde n'affiche rien, seul le
// rappel transmis a `onSearchChange` etant observe ici. Le setter est publie par un effet et
// non pendant le rendu, ou aucune ecriture vers l'exterieur n'a sa place.
const Sonde = ({ onSearchChange, exposer }: { onSearchChange: Saisie; exposer: (saisir: Saisie) => void }) => {
  const [, setQuery] = useDebouncedSearch(onSearchChange, 300);

  useEffect(() => exposer(setQuery), [exposer, setQuery]);

  return null;
};

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

// Sans ce garde, le montage annoncerait une recherche vide que personne n'a saisie, et
// declencherait une requete serveur avant meme que le champ ait ete touche.
it('ne previent pas l appelant au montage', async () => {
  const onSearchChange = jest.fn();
  await renderNative(<Sonde onSearchChange={onSearchChange} exposer={() => undefined} />);

  await act(async () => void jest.advanceTimersByTime(1000));

  expect(onSearchChange).not.toHaveBeenCalled();
});

// Le delai existe pour qu'une frappe continue ne produise qu'une seule requete, la derniere.
// Sans lui, saisir « abc » en interrogerait trois, dont deux pour rien.
it('ne retient que la derniere saisie d une rafale', async () => {
  const onSearchChange = jest.fn();
  let saisir: Saisie = () => undefined;
  await renderNative(<Sonde onSearchChange={onSearchChange} exposer={s => (saisir = s)} />);

  // Frappe et ecoulement du temps sont separes a dessein. Groupes dans un meme `act`, le
  // temps avance avant que React n'ait rejoue l'effet : c'est alors la minuterie de la frappe
  // precedente qui se declenche, et le test observe « ab » la ou il croit observer « abc ».
  const frapper = async (texte: string) => act(async () => void saisir(texte));
  const attendre = async (ms: number) => act(async () => void jest.advanceTimersByTime(ms));

  await frapper('a');
  await attendre(100);
  await frapper('ab');
  await attendre(100);
  await frapper('abc');
  await attendre(300);

  expect(onSearchChange).toHaveBeenCalledTimes(1);
  expect(onSearchChange).toHaveBeenCalledWith('abc');
});
