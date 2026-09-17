import React from 'react';
import type { SelectOption } from './Select.types';

/** Une option prête à être rendue, précédée de son en-tête de groupe si elle ouvre une suite. */
export type SelectRow = {
  option: SelectOption;
  groupHeader?: string;
};

export type UseSelectOptionsParams = {
  options: SelectOption[];
  /** Saisie de recherche courante. Chaîne vide quand le champ est absent. */
  query: string;
  /** Filtre les options sur le libellé. Par défaut : true. */
  localFilter?: boolean;
  creatable?: boolean;
};

export type UseSelectOptionsResult = {
  rows: SelectRow[];
  /** Vrai quand la saisie ne correspond à aucun libellé existant et mérite une entrée de création. */
  canCreate: boolean;
};

/**
 * Logique de liste partagée par les deux plateformes : filtrage, groupement et
 * entrée de création. Sans plateforme ni rendu, elle s'éprouve seule.
 *
 * Le groupement ne rassemble que les options *consécutives* de même `group` :
 * deux blocs non contigus portant le même nom produisent deux en-têtes. C'est
 * le comportement historique, et il laisse l'ordre des options à l'appelant.
 */
export const useSelectOptions = (params: UseSelectOptionsParams): UseSelectOptionsResult => {
  const { options, query, localFilter = true, creatable = false } = params;

  const trimmedQuery = query.trim();

  const filtered = React.useMemo(() => {
    if (!localFilter || trimmedQuery.length === 0) return options;
    const needle = trimmedQuery.toLowerCase();
    return options.filter(option => option.label.toLowerCase().includes(needle));
  }, [options, localFilter, trimmedQuery]);

  const rows = React.useMemo(
    () =>
      filtered.map((option, index) => ({
        option,
        groupHeader: option.group && option.group !== filtered[index - 1]?.group ? option.group : undefined,
      })),
    [filtered],
  );

  // La création se compare à *toutes* les options, pas aux seules filtrées : une
  // recherche distante peut ne rien ramener alors que le libellé existe déjà.
  const canCreate = React.useMemo(() => {
    if (!creatable || trimmedQuery.length === 0) return false;
    const needle = trimmedQuery.toLowerCase();
    return !options.some(option => option.label.toLowerCase() === needle);
  }, [creatable, options, trimmedQuery]);

  return { rows, canCreate };
};
