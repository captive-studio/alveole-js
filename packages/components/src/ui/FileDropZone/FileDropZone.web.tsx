import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { FileDropZoneProps } from './FileDropZone';
import { useStyles } from './FileDropZone.styles';
import { useDepotFichier } from './useDepotFichier';

export type { FileDropZoneProps } from './FileDropZone';

export const FileDropZone = (props: FileDropZoneProps) => {
  const { children, message = 'Déposez vos fichiers ici' } = props;
  const styles = useStyles();
  const depot = useDepotFichier(props);

  return (
    <div
      data-testid="file-drop-zone"
      style={styles.conteneur}
      onDragEnter={depot.onDragEnter}
      onDragOver={depot.onDragOver}
      onDragLeave={depot.onDragLeave}
      onDrop={depot.onDrop}
    >
      {children}
      {depot.actif && (
        <Box tag="file-drop-zone-overlay" style={styles.surcouche}>
          <Box tag="file-drop-zone-message" style={styles.pastille}>
            <Typography style={styles.message}>{message}</Typography>
          </Box>
        </Box>
      )}
    </div>
  );
};
