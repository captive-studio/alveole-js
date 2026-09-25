import type { StorybookModule } from './types';
import {
  filterStories,
  findStoryByTitle,
  getAllStoryTags,
  getConstantEntries,
  getStoryFlags,
  groupStoriesByTag,
  groupTitleForTag,
  normalizeText,
  sortStoriesByTitle,
} from './utils';

const story = (title: string): StorybookModule => ({
  default: { title, tags: ['ui'], experimental: false, description: '', styleFn: () => '' },
});

describe('sortStoriesByTitle', () => {
  it('range les fiches par ordre alphabétique de titre', () => {
    const sorted = sortStoriesByTitle([story('Tabs'), story('Avatar'), story('Card')]);

    expect(sorted.map(sortedStory => sortedStory.default.title)).toEqual(['Avatar', 'Card', 'Tabs']);
  });
});

describe('getConstantEntries', () => {
  it('ne retient que les constantes structurées, rangées par nom', () => {
    const constants = { Spacings: { '1W': 8 }, version: '1.2.3', Colors: { Neutre: {} }, missing: null };

    expect(getConstantEntries(constants).map(([name]) => name)).toEqual(['Colors', 'Spacings']);
  });
});

describe('groupTitleForTag', () => {
  it('met une capitale initiale au tag qui sert de titre de groupe', () => {
    expect(groupTitleForTag('core')).toBe('Core');
  });

  it('garde ses deux capitales à un sigle, que la règle générale abîmerait', () => {
    expect(groupTitleForTag('ui')).toBe('UI');
  });
});

const fiche = (meta: Partial<StorybookModule['default']> & { title: string }): StorybookModule => ({
  default: { tags: ['ui'], experimental: false, description: '', styleFn: () => '', ...meta },
});

const titres = (stories: StorybookModule[]) => stories.map(story => story.default.title);

describe('normalizeText', () => {
  // La recherche se fait au clavier, sans accent ni majuscule : « Ecran » doit trouver « Écran ».
  it('retire les accents et les capitales', () => {
    expect(normalizeText('Étiquette')).toBe('etiquette');
  });
});

describe('getAllStoryTags', () => {
  it('rassemble les tags de toutes les fiches, sans doublon et ranges', () => {
    const tags = getAllStoryTags([fiche({ title: 'A', tags: ['ui', 'core'] }), fiche({ title: 'B', tags: ['ui'] })]);

    expect(tags).toEqual(['core', 'ui']);
  });
});

describe('filterStories', () => {
  const toutes = [
    fiche({ title: 'Étiquette', description: 'Un badge.', tags: ['ui'], figmaURL: 'https://figma' }),
    fiche({ title: 'Carte', description: 'Une surface.', tags: ['core'], experimental: true }),
  ];
  const sansFiltre = { stories: toutes, query: '', selectedTag: null, selectedFlag: null };

  it('rend toutes les fiches quand rien n est demande', () => {
    expect(titres(filterStories(sansFiltre))).toEqual(['Étiquette', 'Carte']);
  });

  // Saisir un mot doit trouver la fiche meme mal orthographiee en casse et en accents.
  it('cherche le titre sans tenir compte des accents ni de la casse', () => {
    expect(titres(filterStories({ ...sansFiltre, query: 'etiq' }))).toEqual(['Étiquette']);
  });

  it('cherche aussi dans la description', () => {
    expect(titres(filterStories({ ...sansFiltre, query: 'surface' }))).toEqual(['Carte']);
  });

  // Les espaces autour d'une saisie viennent du collage, pas de l'intention.
  it('ignore les espaces autour de la recherche', () => {
    expect(titres(filterStories({ ...sansFiltre, query: '  carte  ' }))).toEqual(['Carte']);
  });

  it('ne garde que les fiches portant le tag choisi', () => {
    expect(titres(filterStories({ ...sansFiltre, selectedTag: 'core' }))).toEqual(['Carte']);
  });

  it('ne garde que les fiches portant l indicateur choisi', () => {
    expect(titres(filterStories({ ...sansFiltre, selectedFlag: 'figma' }))).toEqual(['Étiquette']);
  });

  it('croise la recherche et le tag', () => {
    expect(titres(filterStories({ ...sansFiltre, query: 'e', selectedTag: 'core' }))).toEqual(['Carte']);
  });
});

describe('groupStoriesByTag', () => {
  it('range les fiches sous chaque tag et saute les tags sans fiche', () => {
    const groupes = groupStoriesByTag([fiche({ title: 'A', tags: ['ui'] })], ['core', 'ui']);

    expect(groupes.map(([tag, stories]) => [tag, titres(stories)])).toEqual([['ui', ['A']]]);
  });

  // Une fiche portant deux tags parait dans les deux groupes : le classement est une lecture,
  // pas un rangement exclusif.
  it('montre une fiche sous chacun de ses tags', () => {
    const groupes = groupStoriesByTag([fiche({ title: 'A', tags: ['ui', 'core'] })], ['core', 'ui']);

    expect(groupes.map(([tag]) => tag)).toEqual(['core', 'ui']);
  });
});

describe('findStoryByTitle', () => {
  it('retrouve la fiche par son titre', () => {
    expect(findStoryByTitle([fiche({ title: 'Carte' })], 'Carte')?.default.title).toBe('Carte');
  });

  // L'URL peut nommer une fiche disparue : l'ecran doit pouvoir dire qu'il ne l'a pas trouvee.
  it('rend null plutot que undefined quand le titre est inconnu', () => {
    expect(findStoryByTitle([fiche({ title: 'Carte' })], 'Absente')).toBeNull();
  });
});

describe('getStoryFlags', () => {
  it('ne liste que les indicateurs actifs de la fiche', () => {
    const flags = getStoryFlags(fiche({ title: 'A', figmaURL: 'https://figma', webOnly: true }).default);

    expect(flags.map(flag => flag.key)).toEqual(['figma', 'webOnly']);
  });
});
