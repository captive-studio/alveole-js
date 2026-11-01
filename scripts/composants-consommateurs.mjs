import ts from 'typescript';

/** Le texte d'un acces ecrit en clair : `.border` ou `['default-grey']`. `null` s'il est calcule. */
const cleDeLAcces = acces => {
  if (ts.isPropertyAccessExpression(acces)) return acces.name.text;
  if (ts.isElementAccessExpression(acces) && ts.isStringLiteralLike(acces.argumentExpression)) {
    return acces.argumentExpression.text;
  }
  return null;
};

/** `color.light` : `color` seul ou en fin de chaine, comme `theme.color.light`. */
const estColorLight = noeud =>
  ts.isPropertyAccessExpression(noeud) &&
  noeud.name.text === 'light' &&
  (ts.isIdentifier(noeud.expression)
    ? noeud.expression.text === 'color'
    : ts.isPropertyAccessExpression(noeud.expression) && noeud.expression.name.text === 'color');

/** Les chemins des tokens que le source cite : `light.border.default-grey`. */
const tokensCites = (chemin, texte) => {
  const chemins = [];
  const visiter = noeud => {
    if (estColorLight(noeud)) {
      const accesAuToken = noeud.parent.parent;
      const cles = [cleDeLAcces(noeud.parent), cleDeLAcces(accesAuToken)];
      if (cles.includes(null)) {
        throw new Error(`Acces a un token non reconnu dans ${chemin} : ${accesAuToken.getText()}`);
      }
      chemins.push(['light', ...cles].join('.'));
    }
    ts.forEachChild(noeud, visiter);
  };
  visiter(ts.createSourceFile(chemin, texte, ts.ScriptTarget.Latest, true));
  return chemins;
};

/** Les exemples, tests et demonstrations ne font pas d'un composant un consommateur. */
const estDuComposant = chemin => !/\.(stories|test|demo)\./.test(chemin);

/** Le composant d'un fichier est son dossier : `ui/Select` pour `ui/Select/SelectTrigger.tsx`. */
const dossierDe = chemin => chemin.split('/').slice(0, 2).join('/');

/** Les dossiers que l'index d'une racine reexporte : `ui/Select` pour `export * from './Select'`. */
const dossiersExportes = fichiers =>
  new Set(
    Object.entries(fichiers)
      .filter(([chemin]) => /^[^/]+\/index\.ts$/.test(chemin))
      .flatMap(([chemin, texte]) =>
        [...texte.matchAll(/from '\.\/([^']+)'/g)].map(([, dossier]) =>
          dossierDe(`${chemin.split('/')[0]}/${dossier}`),
        ),
      ),
  );

/** Le titre que la story du dossier donne a sa page du catalogue, `null` sans story. */
const titreDeStory = (fichiers, racine, nom) =>
  fichiers[`${racine}/${nom}/${nom}.stories.tsx`]?.match(/^ {2}title: '([^']+)'/m)?.[1] ?? null;

/**
 * Pour chaque token cite, les composants exportes qui le citent dans leur propre code, ranges par
 * nom. Un composant est son dossier : `ui/Select/SelectTrigger.tsx` compte pour Select (ADR 0035).
 */
export const extraireConsommateurs = fichiers => {
  const exportes = dossiersExportes(fichiers);
  const nomsParToken = {};
  for (const [chemin, texte] of Object.entries(fichiers)) {
    if (!exportes.has(dossierDe(chemin)) || !estDuComposant(chemin)) continue;
    const [racine, nom] = chemin.split('/');
    for (const token of tokensCites(chemin, texte)) (nomsParToken[token] ??= new Map()).set(nom, racine);
  }
  return Object.fromEntries(
    Object.entries(nomsParToken).map(([token, noms]) => [
      token,
      [...noms]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([nom, racine]) => ({ nom, story: titreDeStory(fichiers, racine, nom) })),
    ]),
  );
};
