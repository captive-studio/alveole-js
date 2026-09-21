import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Badge } from '../Badge';
import { LucideIcon } from '../LucideIcon';
import { DataTableColumn } from './DataTable.types';

// Jeux de donnees et colonnes des stories du tableau. Ils occupaient les deux tiers du
// fichier de stories, ou ils noyaient les stories elles-memes : ce sont des accessoires de
// demonstration, pas de la documentation.

export type Repository = {
  id: string;
  name: string;
  description: string;
  visibility: 'Public' | 'Internal';
  updatedAt: string;
  owner: string;
};

export const repositories: Repository[] = [
  {
    id: 'repo_1',
    name: 'codeql-dca-worker',
    description: 'Internal',
    visibility: 'Internal',
    updatedAt: '2 heures',
    owner: 'Ana Martins',
  },
  {
    id: 'repo_2',
    name: 'aegir',
    description: 'Outils de build',
    visibility: 'Public',
    updatedAt: '3 heures',
    owner: 'Joe Dalton',
  },
  {
    id: 'repo_3',
    name: 'strapi',
    description: 'CMS headless',
    visibility: 'Public',
    updatedAt: '8 heures',
    owner: 'Peter Parker',
  },
  {
    id: 'repo_4',
    name: 'codeql-ci-nightlies',
    description: 'Analyse de sécurité',
    visibility: 'Public',
    updatedAt: 'hier',
    owner: 'John Snow',
  },
  {
    id: 'repo_5',
    name: 'dependabot-updates',
    description: 'Mises à jour auto',
    visibility: 'Public',
    updatedAt: 'la semaine dernière',
    owner: 'Ana Martins',
  },
];

// Les 5 repositories ci-dessus ne remplissent jamais une zone de scroll : la story
// `StickyHeader` a besoin d'assez de lignes pour que l'en-tête ait quelque chose à survoler.
export const manyRepositories: Repository[] = Array.from({ length: 6 }, (_, i) =>
  repositories.map(repo => ({ ...repo, id: `${repo.id}_${i}` })),
).flat();

export const baseColumns: DataTableColumn<Repository>[] = [
  {
    id: 'name',
    header: 'Repository',
    sortable: true,
    renderCell: repo => <Typography>{repo.name}</Typography>,
  },
  {
    id: 'visibility',
    header: 'Visibilité',
    sortable: true,
    renderCell: repo => (
      <Badge variant={repo.visibility === 'Public' ? 'info' : 'default'} size="sm">
        {repo.visibility}
      </Badge>
    ),
  },
  {
    id: 'updatedAt',
    header: 'Mis à jour',
    sortable: true,
    renderCell: repo => <Typography>{repo.updatedAt}</Typography>,
  },
];

export type RepositoryDetailed = Repository & {
  language: string;
  stars: number;
  forks: number;
  openIssues: number;
  pullRequests: number;
  lastCommit: string;
  ciStatus: 'success' | 'failure' | 'pending';
  coverage: string;
  license: string;
  size: string;
};

export const repositoriesDetailed: RepositoryDetailed[] = [
  {
    id: 'repo_1',
    name: 'codeql-dca-worker',
    description: 'Internal',
    visibility: 'Internal',
    updatedAt: '2 heures',
    owner: 'Ana Martins',
    language: 'TypeScript',
    stars: 128,
    forks: 12,
    openIssues: 4,
    pullRequests: 2,
    lastCommit: 'a1b2c3d',
    ciStatus: 'success',
    coverage: '92%',
    license: 'MIT',
    size: '4.2 Mo',
  },
  {
    id: 'repo_2',
    name: 'aegir',
    description: 'Outils de build',
    visibility: 'Public',
    updatedAt: '3 heures',
    owner: 'Joe Dalton',
    language: 'JavaScript',
    stars: 1042,
    forks: 87,
    openIssues: 21,
    pullRequests: 6,
    lastCommit: 'e4f5g6h',
    ciStatus: 'success',
    coverage: '78%',
    license: 'Apache-2.0',
    size: '12.8 Mo',
  },
  {
    id: 'repo_3',
    name: 'strapi',
    description: 'CMS headless',
    visibility: 'Public',
    updatedAt: '8 heures',
    owner: 'Peter Parker',
    language: 'JavaScript',
    stars: 58210,
    forks: 7420,
    openIssues: 312,
    pullRequests: 48,
    lastCommit: 'i7j8k9l',
    ciStatus: 'failure',
    coverage: '64%',
    license: 'MIT',
    size: '86.4 Mo',
  },
  {
    id: 'repo_4',
    name: 'codeql-ci-nightlies',
    description: 'Analyse de sécurité',
    visibility: 'Public',
    updatedAt: 'hier',
    owner: 'John Snow',
    language: 'YAML',
    stars: 34,
    forks: 3,
    openIssues: 1,
    pullRequests: 0,
    lastCommit: 'm1n2o3p',
    ciStatus: 'pending',
    coverage: '—',
    license: 'MIT',
    size: '0.8 Mo',
  },
  {
    id: 'repo_5',
    name: 'dependabot-updates',
    description: 'Mises à jour auto',
    visibility: 'Public',
    updatedAt: 'la semaine dernière',
    owner: 'Ana Martins',
    language: 'Ruby',
    stars: 210,
    forks: 18,
    openIssues: 9,
    pullRequests: 3,
    lastCommit: 'q4r5s6t',
    ciStatus: 'success',
    coverage: '85%',
    license: 'BSD-3-Clause',
    size: '2.1 Mo',
  },
];

const ciStatusLabel: Record<RepositoryDetailed['ciStatus'], string> = {
  success: 'Succès',
  failure: 'Échec',
  pending: 'En cours',
};

const ciStatusVariant: Record<RepositoryDetailed['ciStatus'], 'success' | 'error' | 'warning'> = {
  success: 'success',
  failure: 'error',
  pending: 'warning',
};

export const manyColumns: DataTableColumn<RepositoryDetailed>[] = [
  {
    id: 'name',
    header: 'Repository',
    width: 200,
    renderCell: repo => <Typography>{repo.name}</Typography>,
  },
  { id: 'owner', header: 'Propriétaire', width: 140, renderCell: repo => <Typography>{repo.owner}</Typography> },
  {
    id: 'visibility',
    header: 'Visibilité',
    width: 110,
    renderCell: repo => (
      <Badge variant={repo.visibility === 'Public' ? 'info' : 'default'} size="sm">
        {repo.visibility}
      </Badge>
    ),
  },
  { id: 'language', header: 'Langage', width: 110, renderCell: repo => <Typography>{repo.language}</Typography> },
  {
    id: 'stars',
    header: 'Étoiles',
    width: 100,
    align: 'end',
    sortable: true,
    renderCell: repo => <Typography>{repo.stars.toLocaleString('fr-FR')}</Typography>,
  },
  {
    id: 'forks',
    header: 'Forks',
    width: 90,
    align: 'end',
    sortable: true,
    renderCell: repo => <Typography>{repo.forks.toLocaleString('fr-FR')}</Typography>,
  },
  {
    id: 'openIssues',
    header: 'Issues ouvertes',
    width: 130,
    align: 'end',
    renderCell: repo => <Typography>{repo.openIssues}</Typography>,
  },
  {
    id: 'pullRequests',
    header: 'Pull requests',
    width: 130,
    align: 'end',
    renderCell: repo => <Typography>{repo.pullRequests}</Typography>,
  },
  {
    id: 'ciStatus',
    header: 'CI',
    width: 110,
    renderCell: repo => (
      <Badge variant={ciStatusVariant[repo.ciStatus]} size="sm">
        {ciStatusLabel[repo.ciStatus]}
      </Badge>
    ),
  },
  {
    id: 'coverage',
    header: 'Couverture',
    width: 110,
    align: 'end',
    renderCell: repo => <Typography>{repo.coverage}</Typography>,
  },
  {
    id: 'lastCommit',
    header: 'Dernier commit',
    width: 130,
    renderCell: repo => (
      <Box display="flex" flexDirection="row" gap={'1V'} style={{ alignItems: 'center' }}>
        <LucideIcon name="GitCommitHorizontal" size="xs" />
        <Typography style={{ fontFamily: 'monospace' }}>{repo.lastCommit}</Typography>
      </Box>
    ),
  },
  {
    id: 'updatedAt',
    header: 'Mis à jour',
    width: 150,
    sortable: true,
    renderCell: repo => <Typography>{repo.updatedAt}</Typography>,
  },
  { id: 'license', header: 'Licence', width: 130, renderCell: repo => <Typography>{repo.license}</Typography> },
  { id: 'size', header: 'Taille', width: 100, align: 'end', renderCell: repo => <Typography>{repo.size}</Typography> },
];
