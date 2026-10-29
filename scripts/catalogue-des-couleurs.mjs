import ts from 'typescript';

const lire = texte => ts.createSourceFile('source.ts', texte, ts.ScriptTarget.Latest, true);

/** L'objet litteral que le source declare sous ce nom : `CustomPalette` ou `Colors`. */
const objetDeclare = (texte, nom) => {
  const declaration = lire(texte)
    .statements.filter(ts.isVariableStatement)
    .flatMap(statement => statement.declarationList.declarations)
    .find(candidate => ts.isIdentifier(candidate.name) && candidate.name.text === nom);
  if (!declaration) throw new Error(`Le source ne declare pas ${nom}`);
  let valeur = declaration.initializer;
  while (ts.isAsExpression(valeur)) valeur = valeur.expression;
  return valeur;
};

/** Le texte d'une cle d'objet ou d'un acces : `Neutre`, `'default-grey'`, `900`. */
const cle = noeud =>
  ts.isStringLiteral(noeud) || ts.isNumericLiteral(noeud) || ts.isIdentifier(noeud) ? noeud.text : null;

const lireEchelles = texte => {
  const echelles = {};
  for (const echelle of objetDeclare(texte, 'Colors').properties) {
    echelles[cle(echelle.name)] = Object.fromEntries(
      echelle.initializer.properties.map(nuance => [cle(nuance.name), nuance.initializer.text]),
    );
  }
  return echelles;
};

/**
 * `Colors['Neutre']['900']` ou `Colors.Neutre['900']` : l'echelle et le numero ecrits. Toute
 * autre ecriture rend `null`.
 */
const nuanceReferencee = valeur => {
  if (!ts.isElementAccessExpression(valeur)) return null;
  const acces = valeur.expression;
  const echelle = ts.isElementAccessExpression(acces)
    ? cle(acces.argumentExpression)
    : ts.isPropertyAccessExpression(acces)
      ? cle(acces.name)
      : null;
  if (!ts.isIdentifier(acces.expression) || acces.expression.text !== 'Colors') return null;
  const numero = cle(valeur.argumentExpression);
  return echelle && numero ? { echelle, numero } : null;
};

/** Le texte du `@deprecated` pose sur la propriete, `null` si elle n'en porte pas. */
const deprecation = propriete => {
  const tag = ts.getJSDocDeprecatedTag(propriete);
  return tag ? (ts.getTextOfJSDocComment(tag.comment) ?? '') : null;
};

/** L'echec qui nomme l'endroit de la palette que l'extraction ne sait pas lire (ADR 0035). */
const nonReconnue = (endroit, noeud) =>
  new Error(`Ecriture de la palette non reconnue pour ${endroit} : ${noeud.getText()}`);

/** La nuance et la valeur d'une feuille : ecrite en dur, ou lue dans l'echelle qu'elle cite. */
const lireValeur = (valeur, echelles, cheminComplet) => {
  if (ts.isStringLiteral(valeur)) return { nuance: null, hex: valeur.text };
  const nuance = nuanceReferencee(valeur);
  const hex = nuance && echelles[nuance.echelle]?.[nuance.numero];
  if (!hex) throw nonReconnue(cheminComplet, valeur);
  return { nuance, hex };
};

/** Chaque nuance des echelles, avec les chemins des tokens qui la citent, actifs puis deprecies. */
const nuancesCitees = (echelles, tokens) =>
  Object.entries(echelles).flatMap(([echelle, nuances]) =>
    Object.entries(nuances).map(([numero, hex]) => {
      const citants = tokens.filter(token => token.nuance?.echelle === echelle && token.nuance.numero === numero);
      const chemins = deprecie => citants.filter(token => token.deprecie === deprecie).map(token => token.chemin);
      return { echelle, numero, hex, tokens: chemins(false), tokensDeprecies: chemins(true) };
    }),
  );

export const extraireCatalogueDesCouleurs = ({ palette, echelles }) => {
  const valeursDesEchelles = lireEchelles(echelles);
  const tokens = [];

  const parcourir = (objet, chemin, deprecationHeritee) => {
    for (const propriete of objet.properties) {
      if (!ts.isPropertyAssignment(propriete) || cle(propriete.name) === null) {
        throw nonReconnue(chemin.join('.'), propriete);
      }
      const cheminDuToken = [...chemin, cle(propriete.name)];
      const valeur = propriete.initializer;
      const remplacant = deprecation(propriete) ?? deprecationHeritee;
      if (ts.isObjectLiteralExpression(valeur)) {
        parcourir(valeur, cheminDuToken, remplacant);
        continue;
      }
      const cheminComplet = cheminDuToken.join('.');
      tokens.push({
        chemin: cheminComplet,
        famille: chemin.join(' / '),
        ...lireValeur(valeur, valeursDesEchelles, cheminComplet),
        deprecie: remplacant !== null,
        remplacant,
      });
    }
  };

  parcourir(objetDeclare(palette, 'CustomPalette'), [], null);
  return { tokens, nuances: nuancesCitees(valeursDesEchelles, tokens) };
};
