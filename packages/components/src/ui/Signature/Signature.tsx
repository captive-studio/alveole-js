import { DateFormats, displayDate, isValidDate } from '@alveole/core';
import { useTheme } from '@alveole/theme';
import * as React from 'react';
import SignatureCanvas, { SignatureViewRef } from 'react-native-signature-canvas';
import { Box, BoxProps } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Button } from '../Button';
import { useStyles } from './Signature.styles';

export type SignatureProps = Omit<BoxProps, 'children'> & {
  height: number;
  date?: string | Date;
  dateLabel?: string;
  clearButtonLabel?: string;
  onChange: (value: string | null) => void;
  onBegin?: () => void;
  onEnd?: () => void;
};

export const Signature = (props: SignatureProps) => {
  const { height, date = new Date(), dateLabel = 'Le', clearButtonLabel = 'Effacer', onChange, onBegin, onEnd } = props;

  const { color, spacing } = useTheme();
  const styles = useStyles();

  const ref = React.useRef<SignatureViewRef>(null);
  const readTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOk = (signature: string | null) => {
    onChange(signature);
  };

  const handleEnd = () => {
    if (readTimeoutRef.current) clearTimeout(readTimeoutRef.current);
    readTimeoutRef.current = setTimeout(() => {
      ref.current?.readSignature();
      readTimeoutRef.current = null;
    }, 100);
  };

  const handleClear = () => {
    if (readTimeoutRef.current) {
      clearTimeout(readTimeoutRef.current);
      readTimeoutRef.current = null;
    }
    onChange(null);
  };

  React.useEffect(() => {
    return () => {
      if (readTimeoutRef.current) clearTimeout(readTimeoutRef.current);
    };
  }, []);

  const dateFormat = isValidDate(date) ? displayDate(date, { format: DateFormats.DateSlash }) : String(date);

  const webviewHeightWithBorders = height + spacing('200') + spacing('100') + 3;
  const webviewStyle = `
    .m-signature-pad {
      box-shadow: none;
      border-radius: ${spacing('075')}px;
      border-color: ${color.border['default-grey']};
      border-width: 2px;
      height: ${height}px;
    }
    .m-signature-pad--body {border: none; overflow: hidden; border-radius: ${spacing('075')}px}
    .m-signature-pad--footer {display: none; margin: 0px;}
    .button, .description {display: none;}
  `;

  return (
    <Box height={webviewHeightWithBorders} width={'100%'}>
      <Box style={styles.headerSignature}>
        <Typography style={styles.date}>
          {dateLabel} {dateFormat}
        </Typography>
        <Button size="xs" title={clearButtonLabel} variant="tertiary" onPress={() => ref.current?.clearSignature()} />
      </Box>
      <Box tag="signature" height={'100%'} onTouchEnd={onEnd} maxH={webviewHeightWithBorders} style={styles.container}>
        <SignatureCanvas
          ref={ref}
          onOK={handleOk}
          onEnd={handleEnd}
          onClear={handleClear}
          penColor={styles.pen.color}
          backgroundColor={styles.pen.backgroundColor}
          dotSize={3.5}
          minWidth={3}
          maxWidth={4}
          onBegin={onBegin}
          androidHardwareAccelerationDisabled
          webviewProps={{ cacheEnabled: false, androidLayerType: 'software' }}
          webStyle={webviewStyle}
        />
      </Box>
    </Box>
  );
};
