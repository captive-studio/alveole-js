import React from 'react';
import { Box, Typography } from '../../core';
import { Story } from '../../type';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { EmptyState } from '../EmptyState';
import { DataTable } from './DataTable';
import { useStyles } from './DataTable.styles';
import { DataTableColumn, DataTableSort } from './DataTable.types';
import { DataTableFooter } from './DataTableFooter';
import { DataTablePagination } from './DataTablePagination';

export default {
  title: 'DataTable',
  tags: ['ui'],
  experimental: false,
  figmaURL: 'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Alveole---Composants?node-id=1037-750',
  description: `Tableau de données inspiré du [DataTable de Primer](https://primer.style/product/components/data-table/).

Comme chez Primer, l'API est déclarative : on décrit les \`columns\` (\`id\`, \`header\`, \`renderCell\`, \`align\`, \`sortable\`, \`width\`) et on fournit les \`data\`, le composant se charge de la mise en page (bordures, alternance des cellules, alignement).

- **Tri** : cliquer sur l'en-tête d'une colonne \`sortable\` fait cycler asc → desc → aucun tri. Le tri peut être piloté par le parent via \`sort\`/\`onSortChange\` (comme Primer, le tri des données reste à la charge du parent), ou laissé en gestion interne pour un simple affichage.
- **Sélection** : \`selectable\` ajoute une colonne de case à cocher avec sélection multiple et case "tout sélectionner" (à 3 états). Contrôlable via \`selectedKeys\`/\`onSelectionChange\`, sinon gérée en interne.
- **Pagination** : contrairement à Primer, le Figma Alveole intègre un pied de tableau avec compteur + pagination. On le fournit via le slot \`footer\`, avec les composants \`DataTableFooter\` et \`DataTablePagination\` exportés séparément — le tableau reste agnostique de la pagination (page côté serveur ou client).
- **Densité** : \`size\` (\`sm\` par défaut, \`md\`, \`lg\`) fait varier les paddings des cellules (en-tête, corps, colonne de sélection) sans changer la mise en page.
- **Beaucoup de colonnes** : l'en-tête et les lignes défilent horizontalement ensemble (via un \`ScrollView\` commun) dès que la somme des largeurs de colonnes dépasse l'espace disponible. Les colonnes sans \`width\` restent flexibles (elles se partagent l'espace restant) : pour garantir le défilement horizontal, donner une \`width\` fixe à chaque colonne, comme dans l'exemple \`ManyColumns\`.`,
  shortDescription: 'Tableau de données avec tri, sélection multiple et pagination, inspiré de Primer.',
  component: DataTable,
  styleFn: useStyles,
} satisfies Story;

type Repository = {
  id: string;
  name: string;
  description: string;
  visibility: 'Public' | 'Internal';
  updatedAt: string;
  owner: string;
};

const repositories: Repository[] = [
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

const baseColumns: DataTableColumn<Repository>[] = [
  {
    id: 'name',
    header: 'Repository',
    sortable: true,
    renderCell: repo => <Typography style={{ fontWeight: 600 }}>{repo.name}</Typography>,
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

export const Default = () => <DataTable data={repositories} columns={baseColumns} keyExtractor={repo => repo.id} />;

export const WithSelection = () => (
  <DataTable data={repositories} columns={baseColumns} keyExtractor={repo => repo.id} selectable />
);

export const Sizes = () => (
  <Box display="flex" flexDirection="column" gap={'4W'}>
    <Box display="flex" flexDirection="column" gap={'1V'}>
      <Typography style={{ fontWeight: 600 }}>sm (défaut)</Typography>
      <DataTable data={repositories} columns={baseColumns} keyExtractor={repo => repo.id} selectable size="sm" />
    </Box>
    <Box display="flex" flexDirection="column" gap={'1V'}>
      <Typography style={{ fontWeight: 600 }}>md</Typography>
      <DataTable data={repositories} columns={baseColumns} keyExtractor={repo => repo.id} selectable size="md" />
    </Box>
    <Box display="flex" flexDirection="column" gap={'1V'}>
      <Typography style={{ fontWeight: 600 }}>lg</Typography>
      <DataTable data={repositories} columns={baseColumns} keyExtractor={repo => repo.id} selectable size="lg" />
    </Box>
  </Box>
);

type RepositoryDetailed = Repository & {
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

const repositoriesDetailed: RepositoryDetailed[] = [
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

const manyColumns: DataTableColumn<RepositoryDetailed>[] = [
  {
    id: 'name',
    header: 'Repository',
    width: 200,
    renderCell: repo => <Typography style={{ fontWeight: 600 }}>{repo.name}</Typography>,
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
    renderCell: repo => <Typography>{repo.lastCommit}</Typography>,
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

export const ManyColumns = () => (
  <DataTable data={repositoriesDetailed} columns={manyColumns} keyExtractor={repo => repo.id} selectable />
);

export const WithSorting = () => {
  const [sort, setSort] = React.useState<DataTableSort | null>({ columnId: 'updatedAt', direction: 'desc' });

  const sortedData = React.useMemo(() => {
    if (!sort) return repositories;
    const sorted = [...repositories].sort((a, b) => {
      const left = a[sort.columnId as keyof Repository];
      const right = b[sort.columnId as keyof Repository];
      return String(left).localeCompare(String(right));
    });
    return sort.direction === 'asc' ? sorted : sorted.reverse();
  }, [sort]);

  return (
    <DataTable
      data={sortedData}
      columns={baseColumns}
      keyExtractor={repo => repo.id}
      sort={sort}
      onSortChange={setSort}
    />
  );
};

export const WithCustomCells = () => {
  const columns: DataTableColumn<Repository>[] = [
    {
      id: 'name',
      header: 'Repository',
      renderCell: repo => (
        <>
          <Avatar size="xs" fallbackText={repo.owner} />
          <Typography style={{ marginLeft: 8, fontWeight: 600 }}>{repo.name}</Typography>
        </>
      ),
    },
    {
      id: 'owner',
      header: 'Propriétaire',
      renderCell: repo => <Typography>{repo.owner}</Typography>,
    },
    {
      id: 'description',
      header: 'Description',
      renderCell: repo => <Typography>{repo.description}</Typography>,
    },
    {
      id: 'visibility',
      header: 'Visibilité',
      align: 'end',
      renderCell: repo => (
        <Badge variant={repo.visibility === 'Public' ? 'info' : 'default'} size="sm">
          {repo.visibility}
        </Badge>
      ),
    },
  ];

  return <DataTable data={repositories} columns={columns} keyExtractor={repo => repo.id} />;
};

export const WithoutHeader = () => (
  <DataTable data={repositories} columns={baseColumns} keyExtractor={repo => repo.id} hideHeader />
);

export const WithPagination = () => {
  const [page, setPage] = React.useState(1);

  return (
    <DataTable
      data={repositories}
      columns={baseColumns}
      keyExtractor={repo => repo.id}
      footer={
        <DataTableFooter counter="1-5 sur 48">
          <DataTablePagination page={page} pageCount={10} onPageChange={setPage} />
        </DataTableFooter>
      }
    />
  );
};

export const Empty = () => (
  <DataTable
    data={[]}
    columns={baseColumns}
    keyExtractor={repo => repo.id}
    renderNoContent={() => (
      <EmptyState
        title="Aucun repository"
        description="Créez votre premier repository pour le voir apparaître ici."
        iconName="FolderGit2"
      />
    )}
  />
);

export * as Sources from './DataTable.stories.sources';
