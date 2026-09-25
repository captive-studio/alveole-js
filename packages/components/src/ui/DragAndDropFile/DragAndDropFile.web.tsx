import { Box } from '../../core/Box';
import { FileInput, FormControlCaption, FormControlHint, FormControlLabel } from '../FormControl';
import { LucideIcon } from '../LucideIcon';
import { DragAndDropFileProps } from './DragAndDropFile';
import { useStyles } from './DragAndDropFile.styles';
import { useDepotFichier } from './useDepotFichier';

export const DragAndDropFile = (props: DragAndDropFileProps) => {
  const { label, hint, icon, type, error, success, multiple } = props;

  const styles = useStyles();
  const depot = useDepotFichier(props);

  const styleContainer = {
    ...styles.container,
    ...(depot.isMouseOver ? styles.containerMouseHover : {}),
    ...(depot.isOver ? styles.containerHover : {}),
    ...(error ? styles.containerError : {}),
  };

  return (
    <div
      tabIndex={0}
      onDrop={depot.onDrop}
      onDragOver={depot.onDragOver}
      onDragEnter={depot.onDragOver}
      onDragLeave={depot.onDragLeave}
      onMouseOver={depot.onMouseOver}
      onMouseEnter={depot.onMouseOver}
      onMouseLeave={depot.onMouseLeave}
      onClick={depot.ouvrir}
      style={styleContainer}
    >
      <Box tag="drag-and-drop-file-icon" display="flex" flexDirection="row" justify="center">
        <LucideIcon size="xl" name={icon ?? 'Upload'} style={styles.icon} />
      </Box>

      <Box tag="drag-and-drop-file-label" display="flex" flexDirection="row" justify="center">
        <FormControlLabel label={label} />
      </Box>

      <Box tag="drag-and-drop-file-hint" display="flex" flexDirection="row" justify="center">
        {hint && <FormControlHint hint={hint} />}
      </Box>

      <Box tag="drag-and-drop-file-input" display="flex" flexDirection="row" justify="center">
        <Box pt={16}>
          <FileInput
            {...props}
            canChange={false}
            reopen={depot.forceOpen}
            onPickStart={depot.fermer}
            multiple={multiple}
            type={type}
          />
        </Box>
      </Box>

      {(error || success) && (
        <Box tag="drag-and-drop-file-error" style={styles.webError}>
          <FormControlCaption {...props} />
        </Box>
      )}
    </div>
  );
};
