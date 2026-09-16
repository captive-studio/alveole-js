import { readFileSync } from 'node:fs';
import { cpus } from 'node:os';

const CPU_MAX = '/sys/fs/cgroup/cpu.max';

// Hors cgroup v2 - macOS en local, cgroup v1 - le fichier n'existe pas et la lecture
// échoue. C'est la même situation qu'un conteneur sans plafond : aucun quota connu.
/** @param {() => string} readCpuMax */
function cpuMax(readCpuMax) {
  try {
    return readCpuMax().trim();
  } catch {
    return 'max';
  }
}

// cgroup v2 expose le quota CPU du conteneur sous la forme "<quota> <période>", en
// microsecondes. Un conteneur sans plafond y écrit "max" : il dispose alors de l'hôte
// entier, et c'est le compte de cœurs de l'hôte qui fait foi. Un quota fractionnaire
// n'ouvre pas un worker de plus : un worker de trop se paie en contention, pas en débit.
// Un quota inférieur à un cœur en garde un : il faut bien quelqu'un pour travailler.
/**
 * @param {() => string} readCpuMax
 * @param {number} hostCpus
 * @returns {number}
 */
export function allocatedCpus(readCpuMax, hostCpus) {
  const [quota, period] = cpuMax(readCpuMax).split(' ');

  return quota === 'max' ? hostCpus : Math.max(1, Math.floor(Number(quota) / Number(period)));
}

// `os.cpus()` rapporte les cœurs du nœud Kubernetes, pas le quota du pod : tout outil qui
// dimensionne ses workers dessus se trompe dans un conteneur.
/** @returns {number} */
export function currentAllocatedCpus() {
  return allocatedCpus(() => readFileSync(CPU_MAX, 'utf8'), cpus().length);
}
