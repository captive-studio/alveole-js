import { useTheme } from '@alveole/theme';
import { format, formatDistanceToNowStrict } from 'date-fns';
import { fr } from 'date-fns/locale';
import React from 'react';
import { Box, Typography } from '../../core';
import { Story } from '../../type';
import { ActionMenu } from '../ActionMenu';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { EmptyState } from '../EmptyState';
import { LucideIcon } from '../LucideIcon';
import { Popover } from '../Popover';
import { Tag } from '../Tag';
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
          <Typography style={{ marginLeft: 8 }}>{repo.name}</Typography>
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

type Deployment = {
  id: string;
  message: string;
  status: 'error' | 'ready';
  duration: string;
  environment: 'preview' | 'production';
  promoted?: boolean;
  commit: string;
  source: string;
  date: Date;
  author: string;
};

const deployments: Deployment[] = [
  {
    id: 'd1',
    message: 'Bump follow-redirects from 1.15.9 to 1.16.0',
    status: 'error',
    duration: '1m 51s',
    environment: 'preview',
    commit: 'f3c020f',
    source: 'dependabot/npm_and_yarn/follow-redirects…',
    date: new Date('2026-07-15T14:32:00Z'),
    author: 'dependabot',
  },
  {
    id: 'd2',
    message: 'Bump axios from 1.8.4 to 1.15.0',
    status: 'error',
    duration: '1m 51s',
    environment: 'preview',
    commit: 'f0e960b',
    source: 'dependabot/npm_and_yarn/axios-1.15.0',
    date: new Date('2026-07-11T09:12:00Z'),
    author: 'dependabot',
  },
  {
    id: 'd3',
    message: 'Bump serialize-javascript et terser-webpack-plugin',
    status: 'error',
    duration: '1m 43s',
    environment: 'preview',
    commit: '638473a',
    source: 'dependabot/npm_and_yarn/multi-0d13b2d87f',
    date: new Date('2026-06-29T18:47:00Z'),
    author: 'dependabot',
  },
  {
    id: 'd4',
    message: 'Bump yaml',
    status: 'error',
    duration: '1m 55s',
    environment: 'preview',
    commit: 'd59cb81',
    source: 'dependabot/npm_and_yarn/multi-c136cad177',
    date: new Date('2026-06-26T07:58:00Z'),
    author: 'dependabot',
  },
  {
    id: 'd5',
    message: '✨ Merge pull request #9 — mdast-util-to-hast 13.2.1',
    status: 'ready',
    duration: '2m 1s',
    environment: 'production',
    promoted: true,
    commit: '9d71b6c',
    source: 'main',
    date: new Date('2025-12-02T14:04:32Z'),
    author: 'cprodhomme',
  },
  {
    id: 'd6',
    message: 'Bump mdast-util-to-hast from 13.2.0 à 13.2.1',
    status: 'ready',
    duration: '1m 58s',
    environment: 'preview',
    commit: '9bdc055',
    source: 'dependabot/npm_and_yarn/mdast-util-to-ha…',
    date: new Date('2025-12-02T13:58:00Z'),
    author: 'dependabot',
  },
  {
    id: 'd7',
    message: '🎨 Ajoute un style sur le blog',
    status: 'ready',
    duration: '51s',
    environment: 'production',
    commit: '7c70351',
    source: 'main',
    date: new Date('2026-04-18T10:21:00Z'),
    author: 'cprodhomme',
  },
  {
    id: 'd8',
    message: '✨ feat(posts): add metaDescription field',
    status: 'ready',
    duration: '49s',
    environment: 'production',
    commit: 'ff3f424',
    source: 'main',
    date: new Date('2026-04-18T09:47:00Z'),
    author: 'cprodhomme',
  },
];

const localTimeZoneLabel = (() => {
  const offsetMinutes = -new Date().getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? '+' : '-';
  return `GMT${sign}${Math.abs(offsetMinutes) / 60}`;
})();

const formatTimestamp = (date: Date, timeZone?: string) =>
  new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeStyle: 'medium', timeZone }).format(date);

const DeploymentDateCell = ({ deployment }: { deployment: Deployment }) => {
  const [open, setOpen] = React.useState(false);
  const { text, color } = useTheme();

  return (
    <Popover
      placement="left"
      open={open}
      setOpen={setOpen}
      renderTrigger={() => (
        <Box onHoverIn={() => setOpen(true)} onHoverOut={() => setOpen(false)}>
          <Typography style={{ ...text['Corps de texte'].XS.Regular, color: color.light.text['mention-grey'] }}>
            {format(deployment.date, 'd MMM', { locale: fr })}
          </Typography>
        </Box>
      )}
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={'1W'}
        style={{ minWidth: 260 }}
        onHoverIn={() => setOpen(true)}
        onHoverOut={() => setOpen(false)}
      >
        <Typography style={text['Corps de texte'].SM.Regular}>
          {formatDistanceToNowStrict(deployment.date, { locale: fr, addSuffix: true })}
        </Typography>
        <Box display="flex" flexDirection="row" gap={'1W'} justify="space-between" style={{ alignItems: 'center' }}>
          <Tag color="default" size="sm">
            UTC
          </Tag>
          <Typography style={text['Corps de texte'].SM.Regular}>{formatTimestamp(deployment.date, 'UTC')}</Typography>
        </Box>
        <Box display="flex" flexDirection="row" gap={'1W'} justify="space-between" style={{ alignItems: 'center' }}>
          <Tag color="default" size="sm">
            {localTimeZoneLabel}
          </Tag>
          <Typography style={text['Corps de texte'].SM.Regular}>{formatTimestamp(deployment.date)}</Typography>
        </Box>
      </Box>
    </Popover>
  );
};

const DeploymentActionsCell = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Box p={'1V'}>
      <ActionMenu
        placement="bottom-end"
        open={open}
        setOpen={setOpen}
        renderTrigger={() => (
          <Button variant="tertiary" size="sm" startIcon="MoreHorizontal" accessibilityLabel="Actions du déploiement" />
        )}
      >
        <ActionMenu.Item title="Voir les détails" icon="Eye" />
        <ActionMenu.Item title="Redéployer" icon="RefreshCw" />
        <ActionMenu.Item title="Copier l'URL" icon="Link" />
        <ActionMenu.Item title="Supprimer" icon="Trash" />
      </ActionMenu>
    </Box>
  );
};

/**
 * Reproduction de la vue "Deployments" de Vercel avec nos composants : `Tag` pour les pastilles
 * d'environnement, `Badge` pour le statut, `Avatar` pour l'auteur, `ActionMenu` pour le menu contextuel
 * "..." de chaque ligne, et `Popover` sur la date pour afficher le détail (temps relatif + horodatage
 * UTC et fuseau local), comme chez Vercel. Le pied de page est ici un simple slot `footer` (pas
 * `DataTableFooter`, qui sert au duo compteur+pagination) : un bouton pleine largeur, puis une note de
 * rétention accompagnée d'une action.
 */
export const AsDeploymentList = () => {
  const { text, color } = useTheme();

  const deploymentColumns: DataTableColumn<Deployment>[] = [
    {
      id: 'message',
      header: 'Déploiement',
      width: 400,
      renderCell: deployment => <Typography style={text['Corps de texte'].SM.Regular}>{deployment.message}</Typography>,
    },
    {
      id: 'status',
      header: 'Statut',
      width: 140,
      renderCell: deployment => (
        <Box display="flex" flexDirection="row" gap={'1W'} style={{ alignItems: 'center' }}>
          <Badge variant={deployment.status === 'error' ? 'error' : 'success'} size="sm">
            {deployment.status === 'error' ? 'Error' : 'Ready'}
          </Badge>
          <Typography style={{ ...text['Corps de texte'].SM.Regular, color: color.light.text['mention-grey'] }}>
            {deployment.duration}
          </Typography>
        </Box>
      ),
    },
    {
      id: 'environment',
      header: 'Environnement',
      width: 100,
      renderCell: deployment => (
        <Tag color={deployment.promoted ? 'action' : 'default'} size="sm">
          {deployment.environment === 'production' ? 'Production' : 'Preview'}
        </Tag>
      ),
    },
    {
      id: 'commit',
      header: 'Commit',
      width: 110,
      renderCell: deployment => (
        <Box display="flex" flexDirection="row" gap={'1V'} style={{ alignItems: 'center' }}>
          <LucideIcon name="GitCommitHorizontal" size="sm" />
          <Typography style={{ ...text['Corps de texte'].SM.Regular, fontFamily: 'monospace' }}>
            {deployment.commit}
          </Typography>
        </Box>
      ),
    },
    {
      id: 'source',
      header: 'Source',
      width: 353,
      renderCell: deployment => (
        <Box display="flex" flexDirection="row" gap={'1V'} style={{ alignItems: 'center', minWidth: 0 }}>
          <LucideIcon name="GitBranch" size="sm" />
          <Typography
            style={{
              ...text['Corps de texte'].SM.Regular,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {deployment.source}
          </Typography>
        </Box>
      ),
    },
    {
      id: 'date',
      header: 'Date',
      width: 70,
      renderCell: deployment => <DeploymentDateCell deployment={deployment} />,
    },
    {
      id: 'author',
      header: '',
      width: 56,
      renderCell: deployment => <Avatar size="sm" fallbackText={deployment.author} />,
    },
    {
      id: 'actions',
      header: '',
      width: 40,
      align: 'end',
      renderCell: () => <DeploymentActionsCell />,
    },
  ];

  return (
    <Box display="flex" flexDirection="column" gap={'3V'}>
      <Typography style={{ fontSize: 20, fontWeight: 700 }}>Deployments</Typography>

      <DataTable
        size="md"
        data={deployments}
        columns={deploymentColumns}
        keyExtractor={deployment => deployment.id}
        hideHeader
      />

      <Box display="flex" flexDirection="column" gap="1W">
        <Box>
          <Button title="Charger plus" variant="secondary" size="md" fullWidth />
        </Box>
        <Box display="flex" flexDirection="row" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography style={{ ...text['Corps de texte'].XS.Regular, color: color.light.text['mention-grey'] }}>
            La rétention des déploiements est activée — certains seront supprimés après un délai.
          </Typography>
          <Button title="Voir les supprimés" variant="secondary" size="sm" />
        </Box>
      </Box>
    </Box>
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
