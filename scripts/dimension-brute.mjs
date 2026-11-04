import { readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
import { estNombre, estTexte, feuilles } from './box-valeur-brute.mjs';
import { fichiersSource } from './fichiers-source.mjs';

// `borderWidth` et ses variantes attendent leur token (ALV-189) : hors de ce releve pour l'instant.
const CLES_DIMENSION =
  /^((min|max)(Width|Height)|width|height|fontSize|lineHeight|letterSpacing|flexBasis|top|left|right|bottom|inset|outline(Width|Offset))$/;

// `vh` et `vw` viennent de l'appareil, pas du theme : l'ADR 0033 les reserve a `style`.
const PIXELS = /^-?\d*\.?\d+(px)?$/;
const enNombre = noeud => {
  if (estNombre(noeud)) return noeud.getText();
  if (estTexte(noeud) && PIXELS.test(noeud.text)) return noeud.text;
  return undefined;
};
const nombreBrut = noeud => {
  const valeur = enNombre(noeud);
  return valeur !== undefined && parseFloat(valeur) !== 0;
};
// L'opacite pleine, comme le zero, est un neutre : elle annule un effet, elle n'en choisit pas un.
const opaciteBrute = noeud => nombreBrut(noeud) && parseFloat(enNombre(noeud)) !== 1;
const policeBrute = estTexte;

const brutePour = cle => {
  if (CLES_DIMENSION.test(cle)) return nombreBrut;
  if (cle === 'opacity') return opaciteBrute;
  if (cle === 'fontFamily') return policeBrute;
  return undefined;
};

export const releverDansSource = (code, fichier) => {
  const source = ts.createSourceFile(fichier, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const releve = [];

  const consigner = (noeud, nom) => {
    const ligne = source.getLineAndCharacterOfPosition(noeud.getStart()).line + 1;
    releve.push(`${fichier}:${ligne} ${nom}=${noeud.getText()}`);
  };

  const visiter = noeud => {
    const brute = ts.isPropertyAssignment(noeud) && brutePour(noeud.name.getText());
    if (brute)
      feuilles(noeud.initializer)
        .filter(brute)
        .forEach(f => consigner(f, noeud.name.getText()));
    ts.forEachChild(noeud, visiter);
  };
  visiter(source);
  return releve;
};

const compterParFichier = releve =>
  releve.reduce((comptes, ligne) => {
    const [fichier] = ligne.split(':');
    return { ...comptes, [fichier]: (comptes[fichier] ?? 0) + 1 };
  }, {});

// La base suit la mesure dans les deux sens : un ajout fait echouer, une correction doit l'abaisser.
export const ecartsAuCliquet = (releve, base) => {
  const mesures = compterParFichier(releve);
  return [...new Set([...Object.keys(base), ...Object.keys(mesures)])]
    .sort()
    .map(fichier => ({ fichier, base: base[fichier] ?? 0, mesure: mesures[fichier] ?? 0 }))
    .filter(({ base: gele, mesure }) => gele !== mesure);
};

export const FICHIER_DE_BASE = 'scripts/dimensions-brutes.base.json';

const accorde = n => `${n} valeur${n > 1 ? 's' : ''} brute${n > 1 ? 's' : ''}`;

const lignesDe = ({ fichier, base, mesure }, releve) =>
  mesure > base
    ? [
        `  ✗ ${fichier} : ${accorde(mesure)}, base a ${base}`,
        ...releve.filter(l => l.startsWith(`${fichier}:`)).map(l => `      ${l}`),
      ]
    : [`  ✗ ${fichier} : ${accorde(mesure)}, base a ${base} (abaissez-la a ${mesure})`];

/** Ce que la CI affiche quand la mesure s'ecarte de la base : de quoi corriger sans relire ce script. */
export const rapport = (ecarts, releve) =>
  [
    'Les valeurs brutes de dimension, de typographie ou d opacite ne suivent plus leur cliquet.',
    '',
    ...ecarts.flatMap(ecart => lignesDe(ecart, releve)),
    '',
    'Une valeur ajoutee : remplacez-la par un token du theme (Spacings, typographie, opacite).',
    `Une valeur corrigee : abaissez sa base dans ${FICHIER_DE_BASE}. La base ne remonte jamais.`,
  ].join('\n');

// Les tests, stories et demos mettent en scene les composants ; l'e2e mesure le rendu. Aucun
// n'est livre : seul le code de production doit passer par les tokens.
const HORS_PRODUCTION = /\.(test|spec|stories|demo)\.|\.d\.ts$|(^|\/)(__tests__|e2e)\//;

export const estSurveille = chemin => /\.tsx?$/.test(chemin) && !HORS_PRODUCTION.test(chemin);

// Le theme definit les tokens : ses valeurs brutes sont la source, pas un ecart.
const DOSSIERS_SURVEILLES = ['packages/components', 'packages/storybook', 'apps'];

export const releverDepot = racine =>
  DOSSIERS_SURVEILLES.flatMap(dossier =>
    fichiersSource(join(racine, dossier), () => true)
      .map(chemin => relative(racine, chemin))
      .filter(estSurveille)
      .flatMap(chemin => releverDansSource(readFileSync(join(racine, chemin), 'utf8'), chemin)),
  );

// `node scripts/dimension-brute.mjs` depuis la racine : le releve complet, fichier par fichier.
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const releve = releverDepot(process.cwd());
  releve.forEach(ligne => console.log(ligne));
  console.log(`${releve.length} valeur(s) brute(s) de dimension, de typographie ou d opacite`);
}
