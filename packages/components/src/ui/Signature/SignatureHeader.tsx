import { DateFormats, displayDate, isValidDate } from '@alveole/core';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Button } from '../Button';
import { useStyles } from './Signature.styles';

export type SignatureHeaderProps = {
  date: string | Date;
  dateLabel: string;
  clearButtonLabel: string;
  onClear: () => void;
};

// L'entete est identique en natif et sur le web : meme date formatee, meme bouton d'effacement.
// Ecrite dans les deux implementations, elle laissait le format de date et le libelle diverger
// d'une plateforme a l'autre sans que rien ne le signale.
export const SignatureHeader = ({ date, dateLabel, clearButtonLabel, onClear }: SignatureHeaderProps) => {
  const styles = useStyles();

  const dateFormatee = isValidDate(date) ? displayDate(date, { format: DateFormats.DateSlash }) : String(date);

  return (
    <Box style={styles.headerSignature}>
      <Typography style={styles.date}>
        {dateLabel} {dateFormatee}
      </Typography>
      <Button size="sm" title={clearButtonLabel} variant="tertiary" onPress={onClear} />
    </Box>
  );
};
