// Jest ne lit son dimensionnement que depuis la ligne de commande, et sa configuration
// CommonJS ne peut pas importer le module ESM voisin. Cette entrée imprime le compte pour
// que les scripts npm l'y injectent. Elle reste séparée du module : Playwright transpile
// ce qu'il importe en CommonJS, où `import.meta` ne survit pas.
import { currentAllocation } from './allocated-cpus.mjs';

const { cpus, source } = currentAllocation();

// La provenance part sur la sortie d'erreur : `$(...)` ne capture que la sortie standard,
// qui doit rester un nombre nu. Sans cette ligne, un pod dont le plafond disparaît se
// redimensionne en silence, et c'est précisément ce qu'on a mis une journée à voir.
process.stderr.write(`workers : ${cpus} (${source})\n`);
process.stdout.write(`${cpus}\n`);
