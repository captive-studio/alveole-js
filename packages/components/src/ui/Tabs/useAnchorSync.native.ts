import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';

// Equivalent natif de l'Anchor Sync web (ADR 0022) : expo-router n'a pas de fragment `#`, donc
// l'ancre voyage comme parametre de route, sous la cle `anchorNamespace`.
//
// `useLocalSearchParams` renvoie `{}` hors d'un arbre expo-router (contexte React sans
// Provider), donc la restauration y est deja silencieuse. `router.setParams`, lui, leve si
// aucun Root Layout n'est monte : le clic doit donc l'avaler.
export const useAnchorSync = (anchorNamespace: string | undefined, onRestore: (anchor: string) => void) => {
  const params = useLocalSearchParams();
  const aRestaure = useRef(false);

  useEffect(() => {
    if (!anchorNamespace || aRestaure.current) return;
    aRestaure.current = true;

    const anchor = params[anchorNamespace];
    if (typeof anchor === 'string') onRestore(anchor);
  }, [anchorNamespace, params, onRestore]);

  const persist = (anchor: string) => {
    if (!anchorNamespace) return;
    try {
      router.setParams({ [anchorNamespace]: anchor });
    } catch {
      // Tabs hors d'un arbre expo-router (ex: harnais de preview isole) : sync inactive.
    }
  };

  return { persist };
};
