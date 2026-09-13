import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { ButtonIcon } from '../Button';
import { useStyles } from './Autocomplete.styles';

export type AutocompleteChipProps = {
  label: string;
  isMulti?: boolean;
  onToggle?: () => void;
  maxWidth?: number;
};

export const AutocompleteChip = (props: AutocompleteChipProps) => {
  const { label, isMulti = true, onToggle, maxWidth } = props;
  const styles = useStyles();

  return (
    <Box
      style={{
        ...styles.multiValue,
        backgroundColor: isMulti ? styles.multiValue.backgroundColor : '#FFFFFF',
        ...(maxWidth != null ? { maxWidth } : {}),
      }}
    >
      <Box display="flex" flexDirection="row" width={isMulti ? undefined : '100%'}>
        <Box pt={isMulti ? '025' : '000'} style={maxWidth != null ? { flexShrink: 1 } : {}}>
          <Typography style={styles.nativeValue} numberOfLines={maxWidth != null ? 1 : undefined}>
            {label}
          </Typography>
        </Box>
        {isMulti && <ButtonIcon size="sm" icon={'X'} variant="tertiary" onPress={onToggle} />}
      </Box>
    </Box>
  );
};
