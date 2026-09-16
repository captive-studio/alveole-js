import { readFileSync } from 'node:fs';
import { cpus } from 'node:os';

// cgroup v2 : "<quota> <période>" en microsecondes, ou "max" si rien n'est plafonné.
export const CPU_MAX = '/sys/fs/cgroup/cpu.max';

// cgroup v1 : les deux moitiés de la même information, dans deux fichiers, et un quota à
// -1 pour dire l'absence de plafond. Un conteneur n'expose jamais les deux versions.
export const CFS_QUOTA = '/sys/fs/cgroup/cpu/cpu.cfs_quota_us';
export const CFS_PERIOD = '/sys/fs/cgroup/cpu/cpu.cfs_period_us';

const read = (readFile, path) => {
  try {
    return readFile(path).trim();
  } catch {
    return undefined;
  }
};

const NO_QUOTA = { cores: undefined, source: 'aucun plafond déclaré' };

// Le quota déclaré par le conteneur, en cœurs, avec la version de cgroup qui l'a fourni. Un
// fichier illisible et un plafond absent sont le même cas : rien ne nous est promis.
function declared(readFile) {
  const cpuMax = read(readFile, CPU_MAX);

  if (cpuMax !== undefined) {
    const [quota, period] = cpuMax.split(' ');
    return quota === 'max' ? NO_QUOTA : { cores: Number(quota) / Number(period), source: 'cgroup v2' };
  }

  const quota = read(readFile, CFS_QUOTA);
  const period = read(readFile, CFS_PERIOD);

  if (quota === undefined || period === undefined || Number(quota) < 0) return NO_QUOTA;

  return { cores: Number(quota) / Number(period), source: 'cgroup v1' };
}

// Un quota déclaré dit « ces cœurs sont à toi » : on les prend tous, parce que les suites
// qui appellent cette fonction calculent, elles n'attendent pas le réseau. Pas de quota dit
// « tu partages le nœud » : on en prend la moitié, faute de quoi on s'affame soi-même.
// Mesuré le 2026-09-16 sur l'audit d'accessibilité, sur un pod sans plafond : passer de 8 à
// 16 workers a doublé le travail total (473,5 s à 968,1 s) pour un débit identique.
// Un quota fractionnaire n'ouvre pas un worker de plus, et un quota inférieur à un cœur en
// garde un : il faut bien quelqu'un pour travailler.
export function allocation(readFile, hostCpus) {
  const { cores, source } = declared(readFile);

  return { cpus: Math.max(1, Math.floor(cores ?? hostCpus / 2)), source };
}

export function allocatedCpus(readFile, hostCpus) {
  return allocation(readFile, hostCpus).cpus;
}

// `os.cpus()` rapporte les cœurs du nœud Kubernetes, pas ce que le pod peut consommer :
// tout outil qui dimensionne ses workers dessus se trompe dans un conteneur.
export function currentAllocation() {
  return allocation(path => readFileSync(path, 'utf8'), cpus().length);
}

export function currentAllocatedCpus() {
  return currentAllocation().cpus;
}
