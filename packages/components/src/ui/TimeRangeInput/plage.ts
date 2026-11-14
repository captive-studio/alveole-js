import { format } from 'date-fns/format';
import { enUS } from 'date-fns/locale/en-US';
import { fr } from 'date-fns/locale/fr';

/** Une durée qui remonte depuis maintenant : un nombre suivi de h (heures), d (jours) ou w (semaines). */
export type DureeRelative = `${number}${'h' | 'd' | 'w'}`;

export type PlageDeTemps =
  { type: 'relative'; duree: DureeRelative } | { type: 'absolue'; debut: Date; fin: Date; utc: boolean };

export type PlageEnCours = { debut?: Date; fin?: Date };

/** Les jours du mois, précédés d'une case vide par jour de semaine avant le 1er (semaine du lundi). */
export const joursDuMois = (annee: number, mois: number): (number | null)[] => {
  const decalage = (new Date(annee, mois, 1).getDay() + 6) % 7;
  const nombre = new Date(annee, mois + 1, 0).getDate();

  return [...Array<null>(decalage).fill(null), ...Array.from({ length: nombre }, (_, i) => i + 1)];
};

export const choisirJour = (plage: PlageEnCours, jour: Date): PlageEnCours => {
  if (!plage.debut || plage.fin) return { debut: jour };
  return jour < plage.debut ? { debut: jour, fin: plage.debut } : { debut: plage.debut, fin: jour };
};

const memeJour = (a?: Date, b?: Date) => !!a && !!b && a.toDateString() === b.toDateString();

/** Place d'une case du calendrier dans la plage : la pastille s'arrondit aux bornes et aux bords de semaine. */
export const formeDuJour = (jour: Date, colonne: number, plage: PlageEnCours) => {
  const fin = plage.fin ?? plage.debut;
  const dansPlage = !!plage.debut && !!fin && jour >= plage.debut && jour <= fin;
  return {
    dansPlage,
    debut: dansPlage && (memeJour(jour, plage.debut) || colonne === 0),
    fin: dansPlage && (memeJour(jour, fin) || colonne === 6),
  };
};

/** Le jour choisi au calendrier, à l'heure saisie `HH:MM`, lue en UTC ou en heure locale. */
export const composerDate = (jour: Date, heure: string, utc: boolean): Date => {
  const [h = 0, m = 0] = heure.split(':').map(Number);
  return utc
    ? new Date(Date.UTC(jour.getFullYear(), jour.getMonth(), jour.getDate(), h, m))
    : new Date(jour.getFullYear(), jour.getMonth(), jour.getDate(), h, m);
};

const estDureeRelative = (texte: string): texte is DureeRelative => /^[1-9]\d*[hdw]$/.test(texte);

export const dureeRelative = (saisie: string): DureeRelative | undefined => {
  const duree = saisie.trim().toLowerCase();
  return estDureeRelative(duree) ? duree : undefined;
};

// date-fns formate en heure locale : on recopie les champs UTC dans une date locale.
const enUTC = (date: Date) =>
  new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes());

const formatDate = (date: Date, utc: boolean, local: 'fr' | 'en') => {
  const texte =
    local === 'en'
      ? format(utc ? enUTC(date) : date, 'MMM d, h:mm a', { locale: enUS })
      : format(utc ? enUTC(date) : date, 'd MMM HH:mm', { locale: fr });
  return utc ? `${texte} UTC` : texte;
};

export const libelleDePlage = (plage: PlageDeTemps, local: 'fr' | 'en' = 'fr'): string =>
  plage.type === 'relative'
    ? plage.duree.toUpperCase()
    : `${formatDate(plage.debut, plage.utc, local)}–${formatDate(plage.fin, plage.utc, local)}`;
