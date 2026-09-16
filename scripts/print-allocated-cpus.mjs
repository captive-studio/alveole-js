// Jest ne lit son dimensionnement que depuis la ligne de commande, et sa configuration
// CommonJS ne peut pas importer le module ESM voisin. Cette entrée imprime le compte pour
// que les scripts npm l'y injectent. Elle reste séparée du module : Playwright transpile
// ce qu'il importe en CommonJS, où `import.meta` ne survit pas.
import { currentAllocatedCpus } from './allocated-cpus.mjs';

process.stdout.write(`${currentAllocatedCpus()}\n`);
