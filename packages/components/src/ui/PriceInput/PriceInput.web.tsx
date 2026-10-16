import React from 'react';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { NumberInputElement, useFieldId } from '../FormControl';
import { useFieldFocus } from '../FormControl/useFieldFocus';
import { cadrePrix } from './cadrePrix';
import type { PriceInputProps } from './PriceInput';
import { useStyles } from './PriceInput.styles';
import { useSaisieMontant } from './useSaisieMontant';

export const PriceInput = React.forwardRef<NumberInputElement, PriceInputProps>(function PriceInput(props, ref) {
  const { devise, autoFocus, value, disabled, readOnly, error, success, onChange } = props;

  const styles = useStyles();
  const champ = useFieldFocus({ disabled, readOnly });

  const { affichage, saisir } = useSaisieMontant(value, onChange);
  // Avec des chiffres tabulaires, un caractère occupe au plus 1 ch.
  const largeur = `${affichage.length || 1}ch`;

  return (
    <Box tag="price-input" style={cadrePrix(styles, { focus: champ.focus, disabled, error, success })}>
      <Box tag="price-input-container" style={styles.priceInputContainer}>
        <input
          ref={ref}
          id={useFieldId()}
          autoFocus={autoFocus}
          disabled={disabled}
          readOnly={readOnly}
          className="alveole-price-input"
          style={{
            ...styles.input,
            fontVariantNumeric: 'tabular-nums',
            width: largeur,
            lineHeight: 'inherit',
            maxWidth: '100%',
          }}
          value={affichage}
          placeholder="0"
          onChange={e => saisir(e.target.value)}
          onFocus={champ.handleFocus}
          onBlur={champ.handleBlur}
          type="text"
          inputMode="decimal"
        />

        <Typography style={styles.inputDevise}>{devise || '€'}</Typography>
      </Box>
    </Box>
  );
});
