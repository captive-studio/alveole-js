import React from 'react';
import { Box } from '../../core/Box';
import { Image } from '../../core/Image';
import {
  FormControlCaption,
  FormControlCaptionProps,
  FormControlFileInput,
  FormControlFileInputProps,
  FormControlFileInputValue,
  FormControlHint,
  FormControlHintProps,
  FormControlLabel,
  valideLeType,
} from '../FormControl';
import { LucideIcon, LucideIconProps } from '../LucideIcon';
import { useStyles } from './DragAndDropFile.styles';

export type DragAndDropFileValue = FormControlFileInputValue;
export type DragAndDropFileProps = FormControlHintProps &
  FormControlCaptionProps &
  FormControlFileInputProps & {
    label: string;
    icon?: LucideIconProps['name'];
  };

export const DragAndDropFile = (props: DragAndDropFileProps) => {
  const { label, hint, icon, type, error, success, onChange, multiple } = props;

  const styles = useStyles();

  const [forceOpen, setForceOpen] = React.useState(false);

  const onValueChange = valideLeType({ type, onChange });

  return (
    <Box
      tag="drag-and-drop-file"
      style={styles.container}
      display="flex"
      flexDirection="row"
      justify="space-between"
      onPress={() => setForceOpen(true)}
    >
      <Box>
        <Box tag="drag-and-drop-file-icon" display="flex" flexDirection="row" justify="center" gap={'050'}>
          <LucideIcon size="md" name={icon ?? 'Upload'} />
          <Box mt={'auto'} mb={'auto'}>
            <FormControlLabel label={label} />
          </Box>
        </Box>

        <Box tag="drag-and-drop-file-hint" display="flex" flexDirection="row" justify="center">
          {hint && <FormControlHint hint={hint} />}
        </Box>

        <Box tag="drag-and-drop-file-input">
          <FormControlFileInput
            {...props}
            hideButton
            hideFilename
            canChange={false}
            onChange={onValueChange}
            reopen={forceOpen}
            onPickStart={() => setForceOpen(false)}
            type={type}
            multiple={multiple}
          />
        </Box>

        {(error || success) && (
          <Box tag="drag-and-drop-file-error" mt={'075'} display="flex" flexDirection="row" justify="center">
            <Box p={16}>
              <FormControlCaption {...props} />
            </Box>
          </Box>
        )}
      </Box>

      <Box>
        {props.previewURL && <Image source={{ uri: props.previewURL }} height={40} width={30} contentFit="cover" />}
      </Box>
    </Box>
  );
};
