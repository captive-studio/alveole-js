#!/usr/bin/env node
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

// Box n'accepte, pour l'espacement, la couleur et le rayon, que des tokens du theme (ALV-145).
// Ce releve traque les valeurs brutes encore ecrites en dur dans les usages de Box : un nombre
// ou une ancienne cle numerique d'espacement, une couleur litterale, un rayon chiffre.
const PROPS_ESPACEMENT = new Set(['p', 'pl', 'pr', 'pt', 'pb', 'm', 'ml', 'mr', 'mt', 'mb', 'gap']);
const PROPS_COULEUR = new Set(['backgroundColor', 'borderColor']);
const STYLE_ESPACEMENT = /^(padding|margin)(Top|Bottom|Left|Right|Horizontal|Vertical)?$|^(gap|rowGap|columnGap)$/;
const STYLE_COULEUR = /Color$/;
const STYLE_RAYON = /Radius$/;
const CLE_LEGACY = /^\d+$/;
const COULEUR_BRUTE = /#[0-9a-f]{3,8}\b|\b(rgba?|hsla?)\(|^(white|black|red)$/i;
const DOSSIERS_IGNORES = new Set(['node_modules', 'dist', 'build', '.expo', 'coverage']);

const fichiersSource = dossier =>
  readdirSync(dossier, { withFileTypes: true }).flatMap(entree => {
    const chemin = join(dossier, entree.name);
    if (entree.isDirectory()) return DOSSIERS_IGNORES.has(entree.name) ? [] : fichiersSource(chemin);
    return /\.tsx$/.test(entree.name) && !/\.test(\.\w+)?\.tsx$/.test(entree.name) ? [chemin] : [];
  });

// Les branches d'un ternaire ou d'un repli (`??`, `||`, `&&`) et les arguments d'un appel
// (`spacingValue('050')`) sont autant de valeurs possibles ; un calcul (`gap / 2`) n'en est pas une.
const REPLIS = new Set([
  ts.SyntaxKind.QuestionQuestionToken,
  ts.SyntaxKind.BarBarToken,
  ts.SyntaxKind.AmpersandAmpersandToken,
]);
const feuilles = noeud => {
  if (ts.isParenthesizedExpression(noeud)) return feuilles(noeud.expression);
  if (ts.isConditionalExpression(noeud)) return [...feuilles(noeud.whenTrue), ...feuilles(noeud.whenFalse)];
  if (ts.isBinaryExpression(noeud) && REPLIS.has(noeud.operatorToken.kind))
    return [...feuilles(noeud.left), ...feuilles(noeud.right)];
  if (ts.isCallExpression(noeud)) return noeud.arguments.flatMap(feuilles);
  if (ts.isObjectLiteralExpression(noeud))
    return noeud.properties.flatMap(p => (ts.isPropertyAssignment(p) ? feuilles(p.initializer) : []));
  return [noeud];
};

const estNombre = noeud =>
  ts.isNumericLiteral(noeud) ||
  (ts.isPrefixUnaryExpression(noeud) &&
    noeud.operator === ts.SyntaxKind.MinusToken &&
    ts.isNumericLiteral(noeud.operand));
const estTexte = noeud => ts.isStringLiteral(noeud) || ts.isNoSubstitutionTemplateLiteral(noeud);

const espacementBrut = noeud => estNombre(noeud) || (estTexte(noeud) && CLE_LEGACY.test(noeud.text));
const couleurBrute = noeud => estTexte(noeud) && COULEUR_BRUTE.test(noeud.text);
const rayonBrut = noeud => estNombre(noeud) && noeud.getText() !== '0';

const brutePourProp = nom => {
  if (PROPS_ESPACEMENT.has(nom)) return espacementBrut;
  if (PROPS_COULEUR.has(nom)) return couleurBrute;
  if (nom === 'borderRadius') return rayonBrut;
  return undefined;
};

const brutePourStyle = nom => {
  if (STYLE_ESPACEMENT.test(nom)) return espacementBrut;
  if (STYLE_COULEUR.test(nom)) return couleurBrute;
  if (STYLE_RAYON.test(nom)) return rayonBrut;
  return undefined;
};

const proprietesDeStyle = noeud => {
  if (ts.isParenthesizedExpression(noeud)) return proprietesDeStyle(noeud.expression);
  if (ts.isArrayLiteralExpression(noeud)) return noeud.elements.flatMap(proprietesDeStyle);
  if (ts.isObjectLiteralExpression(noeud)) return noeud.properties.filter(ts.isPropertyAssignment);
  return [];
};

const valeurDe = attribut => {
  const init = attribut.initializer;
  if (!init) return undefined;
  return ts.isJsxExpression(init) ? init.expression : init;
};

export const releverDansSource = (code, fichier) => {
  const source = ts.createSourceFile(fichier, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const releve = [];
  const consigner = (noeud, nom) => {
    const ligne = source.getLineAndCharacterOfPosition(noeud.getStart()).line + 1;
    releve.push(`${fichier}:${ligne} ${nom}=${noeud.getText()}`);
  };

  const inspecterAttribut = attribut => {
    const valeur = valeurDe(attribut);
    if (!valeur || !ts.isIdentifier(attribut.name)) return;
    const nom = attribut.name.text;
    if (nom === 'style') {
      proprietesDeStyle(valeur).forEach(p => {
        const brute = brutePourStyle(p.name.getText());
        feuilles(p.initializer)
          .filter(f => brute?.(f))
          .forEach(f => consigner(f, `style.${p.name.getText()}`));
      });
      return;
    }
    const brute = brutePourProp(nom);
    if (brute)
      feuilles(valeur)
        .filter(brute)
        .forEach(f => consigner(f, nom));
  };

  const visiter = noeud => {
    if ((ts.isJsxOpeningElement(noeud) || ts.isJsxSelfClosingElement(noeud)) && noeud.tagName.getText() === 'Box')
      noeud.attributes.properties.filter(ts.isJsxAttribute).forEach(inspecterAttribut);
    ts.forEachChild(noeud, visiter);
  };
  visiter(source);
  return releve;
};

export const releverValeursBrutes = racine =>
  ['packages', 'apps'].flatMap(dossier =>
    fichiersSource(join(racine, dossier)).flatMap(chemin =>
      releverDansSource(readFileSync(chemin, 'utf8'), relative(racine, chemin)),
    ),
  );

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const releve = releverValeursBrutes(process.cwd());
  releve.forEach(ligne => console.log(ligne));
  console.log(`${releve.length} valeur(s) brute(s) passee(s) a Box`);
}
