import { useTheme } from '@alveole/theme';
import React from 'react';
import { ScrollView } from 'react-native';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Story } from '../../type';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { EmptyState } from '../EmptyState';
import { DataTable } from './DataTable';
import { deploymentColumns, deployments } from './DataTable.demo.deployments';
import {
  baseColumns,
  manyColumns,
  manyRepositories,
  repositories,
  repositoriesDetailed,
  type Repository,
} from './DataTable.demo.repositories';
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
- **Beaucoup de colonnes** : l'en-tête et les lignes défilent horizontalement ensemble (via un \`ScrollView\` commun) dès que la somme des largeurs de colonnes dépasse l'espace disponible. Les colonnes sans \`width\` restent flexibles (elles se partagent l'espace restant) : pour garantir le défilement horizontal, donner une \`width\` fixe à chaque colonne, comme dans l'exemple \`ManyColumns\`.
- **En-tête épinglé** : \`stickyHeader\` (web uniquement) garde la ligne d'en-têtes visible en haut de son ascendant scrollable pendant le défilement vertical — le tableau ne fournissant lui-même que le scroll horizontal, c'est au parent de borner sa hauteur et de défiler, comme dans l'exemple \`StickyHeader\`.`,
  shortDescription: 'Tableau de données avec tri, sélection multiple et pagination, inspiré de Primer.',
  component: DataTable,
  styleFn: useStyles,
} satisfies Story;

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

/**
 * `stickyHeader` épingle l'en-tête en haut de son ascendant scrollable (web uniquement) : le
 * `DataTable` ne défile lui-même qu'à l'horizontale, c'est donc au parent de fournir le scroll
 * vertical — ici un `ScrollView` borné en hauteur, comme le ferait un écran de logs ou une longue
 * liste.
 */
export const StickyHeader = () => (
  <ScrollView style={{ maxHeight: 280 }}>
    <DataTable data={manyRepositories} columns={baseColumns} keyExtractor={repo => repo.id} stickyHeader />
  </ScrollView>
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
