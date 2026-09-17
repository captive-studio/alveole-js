import { Box } from '@alveole/components';
import React from 'react';
import { Platform, ScrollView } from 'react-native';
import { StorybookFlag } from '../types';
import { ALL_STORY_FLAGS } from '../utils';
import { FiltreDeroulant } from './FiltreDeroulant';
import { SearchField } from './SearchField';

export type BarreDeFiltresProps = {
  recherche: string;
  onRecherche: (recherche: string) => void;
  tags: string[];
  tagChoisi: string | null;
  onTag: (tag: string | null) => void;
  indicateurChoisi: StorybookFlag['key'] | null;
  onIndicateur: (indicateur: StorybookFlag['key'] | null) => void;
};

/**
 * La rangee qui reduit la liste : une recherche et deux filtres. Elle defile horizontalement
 * plutot que de passer a la ligne, pour garder la liste en vue sur un ecran etroit.
 *
 * Un seul menu se deroule a la fois, et cet etat ne sort pas d'ici : aucun autre morceau de
 * l'ecran n'a besoin de savoir quel menu est ouvert.
 */
export const BarreDeFiltres = ({
  recherche,
  onRecherche,
  tags,
  tagChoisi,
  onTag,
  indicateurChoisi,
  onIndicateur,
}: BarreDeFiltresProps) => {
  const [menuOuvert, setMenuOuvert] = React.useState<'tags' | 'indicateurs' | null>(null);

  const deroule = (menu: 'tags' | 'indicateurs') => ({
    ouvert: menuOuvert === menu,
    onOuvrir: (ouvert: boolean) => setMenuOuvert(ouvert ? menu : null),
  });

  return (
    <ScrollView
      horizontal
      nestedScrollEnabled
      directionalLockEnabled={Platform.OS === 'ios'}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}
    >
      <Box style={{ minWidth: 200 }}>
        <SearchField placeholder="Button, Tabs, Card..." value={recherche} onChangeText={onRecherche} size="sm" />
      </Box>

      <FiltreDeroulant
        libelle="Tags"
        options={tags.map(tag => ({ key: tag, label: tag }))}
        choisi={tagChoisi}
        onChoisir={tag => {
          onTag(tag);
          setMenuOuvert(null);
        }}
        {...deroule('tags')}
      />

      <FiltreDeroulant
        libelle="Indicateurs"
        options={ALL_STORY_FLAGS}
        choisi={indicateurChoisi}
        onChoisir={indicateur => {
          onIndicateur(indicateur);
          setMenuOuvert(null);
        }}
        {...deroule('indicateurs')}
      />
    </ScrollView>
  );
};
