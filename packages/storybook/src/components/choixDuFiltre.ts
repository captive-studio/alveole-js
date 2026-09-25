import type { FiltreDeroulantProps } from './FiltreDeroulant';

/**
 * Le choix d'un filtre a choix unique apres qu'on a presse une option. Reprendre l'option deja
 * choisie l'annule, sans quoi on ne pourrait plus revenir a la liste entiere.
 */
export const choixApres = <Cle extends string>(choisi: Cle | null, option: Cle): Cle | null =>
  choisi === option ? null : option;

type Filtre<Cle extends string> = Pick<FiltreDeroulantProps<Cle>, 'libelle' | 'options' | 'choisi'>;

/**
 * Ce que le bouton du filtre annonce : l'option choisie plutot que son libelle generique, car
 * une fois le menu referme c'est la seule trace du filtre actif.
 */
export const libelleDuFiltre = <Cle extends string>({ libelle, options, choisi }: Filtre<Cle>): string =>
  options.find(option => option.key === choisi)?.label ?? libelle;
