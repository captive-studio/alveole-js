import { DateFormats, displayDate, isValidDate } from '@alveole/core';
import ReactSignature, { SignatureRef } from '@uiw/react-signature';
import * as React from 'react';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Button } from '../Button';
import { SignatureProps } from './Signature';
import { useStyles } from './Signature.styles';

export const Signature = (props: SignatureProps) => {
  const {
    height,
    style,
    date = new Date(),
    dateLabel = 'Le',
    clearButtonLabel = 'Effacer',
    onChange,
    ...boxProps
  } = props;

  const styles = useStyles();
  const signatureRef = React.useRef<SignatureRef | null>(null);
  const [signatureInstanceVersion, setSignatureInstanceVersion] = React.useState(0);

  const serializeSvgToBase64 = (svg: SVGSVGElement): Promise<string> => {
    return new Promise(resolve => {
      const svgString = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64data = reader.result as string;
        resolve(base64data);
      };

      reader.readAsDataURL(blob);
    });
  };

  React.useEffect(() => {
    const svgEl = signatureRef.current?.svg;
    if (!svgEl) return;

    const handlePointerUp = async () => {
      const svgEl = signatureRef.current?.svg;
      if (!svgEl) return;
      const base64 = await serializeSvgToBase64(svgEl);
      onChange(base64);
    };

    svgEl.addEventListener('pointerup', handlePointerUp);
    return () => {
      svgEl.removeEventListener('pointerup', handlePointerUp);
    };
  }, [signatureInstanceVersion, onChange]);

  // Rappel de `ref` stable : défini en ligne, il changeait d'identité à chaque rendu, donc
  // React le détachait et le rattachait, et chaque rattachement relançait un rendu. La
  // fiche du catalogue ne s'affichait plus du tout (« Maximum update depth exceeded »).
  const attacherSignature = React.useCallback((instance: SignatureRef | null) => {
    if (!instance) return;
    signatureRef.current = instance;
    setSignatureInstanceVersion(version => version + 1);
  }, []);

  const handleClear = () => {
    signatureRef.current?.clear();
    onChange(null);
  };

  const dateFormat = isValidDate(date) ? displayDate(date, { format: DateFormats.DateSlash }) : String(date);

  return (
    <Box tag="signature" style={[styles.container, style]} {...boxProps}>
      <Box style={styles.headerSignature}>
        <Typography style={styles.date}>
          {dateLabel} {dateFormat}
        </Typography>
        <Button title={clearButtonLabel} variant="tertiary" size="sm" onPress={handleClear} />
      </Box>
      <Box style={{ ...styles.signatureWeb, height }}>
        <ReactSignature
          ref={attacherSignature}
          style={styles.signatureWeb}
          fill={styles.pen.color}
          options={{ size: 12, smoothing: 0.15, thinning: 0.73, streamline: 0.5 }}
        />
      </Box>
    </Box>
  );
};
