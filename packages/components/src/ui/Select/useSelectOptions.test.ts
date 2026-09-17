import { renderHook } from '@/__tests__/helpers/renderNative';
import type { SelectOption } from './Select.types';
import { useSelectOptions, type UseSelectOptionsResult } from './useSelectOptions';

const OPTIONS: SelectOption[] = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Bordeaux', value: 'bordeaux' },
];

const listOf = async (params: Parameters<typeof useSelectOptions>[0]): Promise<UseSelectOptionsResult> =>
  (await renderHook(() => useSelectOptions(params))).result.current;

describe('useSelectOptions, filtrage et groupes', () => {
  it('rend toutes les options quand la recherche est vide', async () => {
    const { rows } = await listOf({ options: OPTIONS, query: '' });

    expect(rows).toHaveLength(3);
  });

  it('filtre sans tenir compte de la casse', async () => {
    const { rows } = await listOf({ options: OPTIONS, query: 'BORD' });

    expect(rows.map(row => row.option.value)).toEqual(['bordeaux']);
  });

  it('ignore les espaces autour de la saisie', async () => {
    const { rows } = await listOf({ options: OPTIONS, query: '  option a  ' });

    expect(rows).toHaveLength(1);
  });

  it('ne filtre rien quand le filtrage local est coupé', async () => {
    const { rows } = await listOf({ options: OPTIONS, query: 'aucune correspondance', localFilter: false });

    expect(rows).toHaveLength(3);
  });

  it('ne pose un en-tête qu’au premier élément d’une suite de même groupe', async () => {
    const options: SelectOption[] = [
      { label: 'Option A', value: 'a', group: 'Contrats' },
      { label: 'Option B', value: 'b', group: 'Contrats' },
      { label: 'Option C', value: 'c', group: 'Documents' },
    ];

    const { rows } = await listOf({ options, query: '' });

    expect(rows.map(row => row.groupHeader)).toEqual(['Contrats', undefined, 'Documents']);
  });

  it('rouvre un en-tête quand le même groupe revient plus loin', async () => {
    const options: SelectOption[] = [
      { label: 'Option A', value: 'a', group: 'Contrats' },
      { label: 'Option B', value: 'b', group: 'Documents' },
      { label: 'Option C', value: 'c', group: 'Contrats' },
    ];

    const { rows } = await listOf({ options, query: '' });

    expect(rows.map(row => row.groupHeader)).toEqual(['Contrats', 'Documents', 'Contrats']);
  });
});

describe('useSelectOptions, entrée de création', () => {
  it('ne propose jamais la création sans l’avoir demandée', async () => {
    const { canCreate } = await listOf({ options: OPTIONS, query: 'Nouveau' });

    expect(canCreate).toBe(false);
  });

  it('propose la création quand aucun libellé ne correspond', async () => {
    const { canCreate } = await listOf({ options: OPTIONS, query: 'Nouveau', creatable: true });

    expect(canCreate).toBe(true);
  });

  it('ne propose pas la création quand un libellé identique existe', async () => {
    const { canCreate } = await listOf({ options: OPTIONS, query: 'option a', creatable: true });

    expect(canCreate).toBe(false);
  });

  // La comparaison porte sur toutes les options, pas sur les seules filtrées : une
  // recherche distante peut ne rien ramener alors que le libellé existe déjà.
  it('ne propose pas la création d’un libellé masqué par le filtrage', async () => {
    const { canCreate } = await listOf({
      options: OPTIONS,
      query: 'Option A',
      creatable: true,
      localFilter: false,
    });

    expect(canCreate).toBe(false);
  });

  it('ne propose pas la création sur une saisie blanche', async () => {
    const { canCreate } = await listOf({ options: OPTIONS, query: '   ', creatable: true });

    expect(canCreate).toBe(false);
  });
});
