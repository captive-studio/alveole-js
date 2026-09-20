import { useTheme } from '@alveole/theme';
import { format } from 'date-fns/format';
import { formatDistanceToNowStrict } from 'date-fns/formatDistanceToNowStrict';
import { fr } from 'date-fns/locale/fr';
import React from 'react';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { ActionMenu } from '../ActionMenu';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { LucideIcon } from '../LucideIcon';
import { Popover } from '../Popover';
import { Tag } from '../Tag';
import { DataTableColumn } from './DataTable.types';

// La vue "Deployments" reproduite par la story du meme nom : ses donnees, ses cellules
// composees et ses colonnes. Ecrites dans la story, elles en faisaient une fonction de 111
// lignes dont la lecture ne disait plus ce que la story demontrait.

export type Deployment = {
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

export const deployments: Deployment[] = [
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

const DeploymentMessageCell = ({ deployment }: { deployment: Deployment }) => {
  const { text } = useTheme();

  return <Typography style={text['Corps de texte'].SM.Regular}>{deployment.message}</Typography>;
};

const DeploymentStatusCell = ({ deployment }: { deployment: Deployment }) => {
  const { text, color } = useTheme();

  return (
    <Box display="flex" flexDirection="row" gap={'1W'} style={{ alignItems: 'center' }}>
      <Badge variant={deployment.status === 'error' ? 'error' : 'success'} size="sm">
        {deployment.status === 'error' ? 'Error' : 'Ready'}
      </Badge>
      <Typography style={{ ...text['Corps de texte'].SM.Regular, color: color.light.text['mention-grey'] }}>
        {deployment.duration}
      </Typography>
    </Box>
  );
};

const DeploymentEnvironmentCell = ({ deployment }: { deployment: Deployment }) => (
  <Tag color={deployment.promoted ? 'action' : 'default'} size="sm">
    {deployment.environment === 'production' ? 'Production' : 'Preview'}
  </Tag>
);

const DeploymentCommitCell = ({ deployment }: { deployment: Deployment }) => {
  const { text } = useTheme();

  return (
    <Box display="flex" flexDirection="row" gap={'1V'} style={{ alignItems: 'center' }}>
      <LucideIcon name="GitCommitHorizontal" size="sm" />
      <Typography style={{ ...text['Corps de texte'].SM.Regular, fontFamily: 'monospace' }}>
        {deployment.commit}
      </Typography>
    </Box>
  );
};

const DeploymentSourceCell = ({ deployment }: { deployment: Deployment }) => {
  const { text } = useTheme();

  return (
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
  );
};

// Chaque cellule composee lit le theme pour son compte : la table de colonnes redevient de la
// donnee, qui dit la largeur et l'entete de chaque colonne et rien de plus.
export const deploymentColumns: DataTableColumn<Deployment>[] = [
  { id: 'message', header: 'Déploiement', width: 400, renderCell: d => <DeploymentMessageCell deployment={d} /> },
  { id: 'status', header: 'Statut', width: 140, renderCell: d => <DeploymentStatusCell deployment={d} /> },
  {
    id: 'environment',
    header: 'Environnement',
    width: 100,
    renderCell: d => <DeploymentEnvironmentCell deployment={d} />,
  },
  { id: 'commit', header: 'Commit', width: 110, renderCell: d => <DeploymentCommitCell deployment={d} /> },
  { id: 'source', header: 'Source', width: 353, renderCell: d => <DeploymentSourceCell deployment={d} /> },
  { id: 'date', header: 'Date', width: 70, renderCell: d => <DeploymentDateCell deployment={d} /> },
  { id: 'author', header: '', width: 56, renderCell: d => <Avatar size="sm" fallbackText={d.author} /> },
  { id: 'actions', header: '', width: 40, align: 'end', renderCell: () => <DeploymentActionsCell /> },
];
