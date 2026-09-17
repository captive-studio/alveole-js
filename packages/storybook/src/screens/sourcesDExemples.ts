import { StorybookMeta, StorybookModule } from '../types';
import { stripMarkdown } from '../utils';

type ValeurDeSource = string | (() => string);

type ExportDeSources = {
  storySources?: Record<string, ValeurDeSource>;
  storyDescriptions?: Record<string, string>;
} & Record<string, unknown>;

/**
 * Le bloc `Sources` que le generateur ajoute a une fiche. Il n'est pas declare dans le type
 * d'un module de fiche : il est ecrit a la compilation, et une fiche ecrite a la main n'en a pas.
 */
const sourcesDe = (story: StorybookModule): ExportDeSources | undefined =>
  (story as unknown as { Sources?: ExportDeSources }).Sources;

/**
 * Le code d'un exemple, ou `null` quand la fiche ne le publie pas : la demonstration se montre
 * alors sans son code. Les premieres fiches posaient leurs sources a la racine du bloc, les
 * suivantes les rangent sous `storySources` ; les deux se lisent. Une source publiee en
 * fonction n'est construite qu'ici, a la demande.
 */
export const sourceDeLExemple = (story: StorybookModule, nomDeLExemple: string): string | null => {
  const sources = sourcesDe(story);
  const source = sources?.storySources?.[nomDeLExemple] ?? sources?.[nomDeLExemple];

  if (typeof source === 'string') return source;
  if (typeof source === 'function') {
    const valeur = source();

    return typeof valeur === 'string' ? valeur : null;
  }

  return null;
};

/** Le texte qui accompagne un exemple, ou `null` quand la fiche n'en donne pas. */
export const descriptionDeLExemple = (story: StorybookModule, nomDeLExemple: string): string | null => {
  const description = sourcesDe(story)?.storyDescriptions?.[nomDeLExemple];

  return typeof description === 'string' ? description : null;
};

/**
 * Ce que la fiche annonce hors de l'ecran : la balise `description` de la page, lue par les
 * moteurs et les apercus de lien. Le resume court prime quand la fiche en donne un ; sinon la
 * description longue sert, debarrassee de son balisage, qu'une balise `meta` afficherait tel quel.
 */
export const resumeDeLaFiche = (meta: StorybookMeta): string =>
  meta.shortDescription ?? stripMarkdown(meta.description);
