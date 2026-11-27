// Ecrit le code source de chaque exemple de mail et de composant, que sa page affiche a cote du rendu.
// Metro ne sait pas importer un fichier en texte : la source passe donc par ce fichier genere.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const racine = resolve(import.meta.dirname, '../components/emails');
// Cle `dossier/Nom` : `demos/Invitation`, `composants/Button`.
const sources = Object.fromEntries(
  ['demos', 'composants'].flatMap(dossier =>
    readdirSync(resolve(racine, dossier))
      .filter(fichier => fichier.endsWith('.tsx'))
      .sort()
      .map(fichier => [
        `${dossier}/${fichier.replace(/\.tsx$/, '')}`,
        readFileSync(resolve(racine, dossier, fichier), 'utf8'),
      ]),
  ),
);

writeFileSync(
  resolve(racine, 'sources.generated.ts'),
  `// Genere par scripts/generer-sources-des-emails.mjs. Ne pas modifier.\nexport const sourcesDesEmails: Record<string, string> = ${JSON.stringify(sources, null, 2)};\n`,
);
