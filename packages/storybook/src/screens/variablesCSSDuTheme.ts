/**
 * Le catalogue des variables CSS que le theme publie, groupe par famille. Construire ce catalogue
 * est une responsabilite a part : l'ecran qui le montre n'a pas a savoir d'ou sort chaque famille.
 */
import {
  Colors,
  CustomPalette,
  CustomTypography,
  Elevations,
  FontWeightMap,
  RadiusList,
  Spacings,
  sanitizeCSSKey,
} from '@alveole/theme';
import { variablesDeTypographie } from './variablesDeTypographie';

export type PreviewKind = 'color' | 'spacing' | 'elevation' | 'radius' | 'none';

export type CSSVarEntry = {
  name: string;
  rawValue: string;
  preview: PreviewKind;
};

export type CSSVarGroup = {
  title: string;
  vars: CSSVarEntry[];
};

/** Les nuances brutes de la palette, une variable par cran. */
function groupeDesCouleurs(): CSSVarGroup {
  const vars = Object.entries(Colors).flatMap(([name, shades]) =>
    Object.entries(shades as Record<string, string>).map(([variant, value]) => ({
      name: `--color-${name}-${variant}`,
      rawValue: value,
      preview: 'color' as PreviewKind,
    })),
  );

  return { title: 'Couleurs palette', vars };
}

/**
 * Les jetons semantiques du theme clair, une categorie par groupe. Une categorie vide ne
 * donne pas de groupe : un accordeon sans contenu n'apprend rien.
 */
const CATEGORIES_SEMANTIQUES = ['background', 'text', 'border', 'artwork', 'system'] as const;

function groupesSemantiques(): CSSVarGroup[] {
  return CATEGORIES_SEMANTIQUES.map(category => {
    const tokens: Record<string, unknown> = CustomPalette.light[category] ?? {};
    const vars: CSSVarEntry[] = Object.entries(tokens)
      .filter(([, value]) => typeof value === 'string')
      .map(([token, value]) => ({ name: `--${category}-${token}`, rawValue: value as string, preview: 'color' }));

    return { title: `Tokens — ${category}`, vars };
  }).filter(groupe => groupe.vars.length > 0);
}

/** Les echelles chiffrees du theme : chacune se rend en pixels sous son propre apercu. */
type EchelleChiffree = {
  title: string;
  valeurs: Record<string, number>;
  prefixe: string;
  preview: PreviewKind;
  /** Certaines cles ne sont pas des identifiants CSS valides et doivent etre assainies. */
  nomDeCle?: (key: string) => string;
};

function groupeChiffre({ title, valeurs, prefixe, preview, nomDeCle = key => key }: EchelleChiffree): CSSVarGroup {
  return {
    title,
    vars: Object.entries(valeurs).map(([key, value]) => ({
      name: `--${prefixe}-${nomDeCle(key)}`,
      rawValue: `${value}px`,
      preview,
    })),
  };
}

function groupeDesElevations(): CSSVarGroup {
  return {
    title: 'Elevations',
    vars: Object.entries(Elevations).map(([key, value]) => ({
      name: `--elevation-${key}`,
      rawValue: value.web,
      preview: 'elevation',
    })),
  };
}

/** Chaque graisse publie sa famille et son poids : deux variables pour une entree. */
function groupeDesFontes(): CSSVarGroup {
  return {
    title: 'Fonts',
    vars: Object.entries(FontWeightMap).flatMap(([key, { familyWithFallback, weight }]) => [
      { name: `--font-${key}-family`, rawValue: familyWithFallback, preview: 'none' as PreviewKind },
      { name: `--font-${key}-weight`, rawValue: weight as string, preview: 'none' as PreviewKind },
    ]),
  };
}

function groupeDesTypographies(): CSSVarGroup {
  return { title: 'Typographies', vars: variablesDeTypographie(CustomTypography, sanitizeCSSKey) };
}

export function buildGroups(): CSSVarGroup[] {
  return [
    groupeDesCouleurs(),
    ...groupesSemantiques(),
    groupeChiffre({
      title: 'Spacing',
      valeurs: Spacings,
      prefixe: 'spacing',
      preview: 'spacing',
      nomDeCle: sanitizeCSSKey,
    }),
    groupeChiffre({ title: 'Radius', valeurs: RadiusList, prefixe: 'radius', preview: 'radius' }),
    groupeDesElevations(),
    groupeDesFontes(),
    groupeDesTypographies(),
  ];
}
