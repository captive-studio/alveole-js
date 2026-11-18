// Ecrit le code source de chaque mail de demonstration, que sa page affiche a cote du rendu.
// Metro ne sait pas importer un fichier en texte : la source passe donc par ce fichier genere.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const dossier = resolve(import.meta.dirname, '../components/emails/demos');
const sources = Object.fromEntries(
  readdirSync(dossier)
    .filter(fichier => fichier.endsWith('.tsx'))
    .sort()
    .map(fichier => [fichier.replace(/\.tsx$/, ''), readFileSync(resolve(dossier, fichier), 'utf8')]),
);

writeFileSync(
  resolve(dossier, '../sources.generated.ts'),
  `// Genere par scripts/generer-sources-des-emails.mjs. Ne pas modifier.\nexport const sourcesDesEmails: Record<string, string> = ${JSON.stringify(sources, null, 2)};\n`,
);
