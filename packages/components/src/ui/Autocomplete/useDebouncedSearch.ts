import { useEffect, useRef, useState } from 'react';

/**
 * Retarde la notification de recherche jusqu'a ce que la saisie s'arrete.
 *
 * `onSearchChange` sert le plus souvent a interroger un serveur : le prevenir a chaque touche
 * lancerait une requete par caractere, dont seule la derniere compte. Le delai attend donc une
 * pause avant de parler.
 *
 * Les deux plateformes le faisaient chacune a leur maniere, l'une par minuterie gardee dans une
 * ref, l'autre par effet, avec deux delais differents - 500 ms et 300 ms - sans que rien
 * n'explique l'ecart.
 */
export const useDebouncedSearch = (onSearchChange: ((value: string) => void) | undefined, delai = 300) => {
  const [query, setQuery] = useState('');

  // Le rappel est presque toujours une fonction anonyme, donc neuve a chaque rendu. Le lire
  // dans une ref permet de ne dependre que de la saisie : en dependre directement relancerait
  // le delai sans fin, et l'omettre des dependances demanderait de museler la regle de lint.
  const rappel = useRef(onSearchChange);
  useEffect(() => {
    rappel.current = onSearchChange;
  });

  // La saisie n'a pas encore eu lieu au montage : prevenir a ce moment annoncerait une
  // recherche vide que personne n'a demandee, et lancerait une requete pour rien.
  const monte = useRef(false);

  useEffect(() => {
    if (!monte.current) {
      monte.current = true;
      return;
    }

    const minuterie = setTimeout(() => rappel.current?.(query), delai);

    return () => clearTimeout(minuterie);
  }, [query, delai]);

  return [query, setQuery] as const;
};
