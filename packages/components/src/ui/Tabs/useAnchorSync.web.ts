import { useEffect, useRef } from 'react';

// L'Anchor Sync web ecrit et relit un fragment `#{anchorNamespace}-{anchor}`, au meme format
// que `AnchorHeading` (voir `core/AnchorHeading/slug.ts`) : un sommaire ou un lien externe qui
// pointe vers cette ancre doit tomber sur le meme onglet.
export const useAnchorSync = (anchorNamespace: string | undefined, onRestore: (anchor: string) => void) => {
  const aRestaure = useRef(false);

  useEffect(() => {
    if (!anchorNamespace || aRestaure.current || typeof window === 'undefined') return;
    aRestaure.current = true;

    const prefixe = `#${anchorNamespace}-`;
    if (!window.location.hash.startsWith(prefixe)) return;
    onRestore(window.location.hash.slice(prefixe.length));
  }, [anchorNamespace, onRestore]);

  const persist = (anchor: string) => {
    if (!anchorNamespace || typeof window === 'undefined') return;
    window.history.replaceState(null, '', `#${anchorNamespace}-${anchor}`);
  };

  return { persist };
};
