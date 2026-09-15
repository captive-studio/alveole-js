import type { StorybookModule } from './types';
import { getConstantEntries, groupTitleForTag, sortStoriesByTitle } from './utils';

const story = (title: string) =>
  ({
    default: { title, tags: ['ui'], experimental: false, description: '', styleFn: () => '' },
  }) as StorybookModule;

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
