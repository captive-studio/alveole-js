import { DateFormats, displayDate, isValidDate } from '@alveole/core';
import { useTheme } from '@alveole/theme';
import * as React from 'react';
import SignatureCanvas from 'react-native-signature-canvas';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Button } from '../Button';
import { useStyles } from './Signature.styles';
export const Signature = props => {
  const { height, date = new Date(), dateLabel = 'Le', clearButtonLabel = 'Effacer', onChange, onBegin, onEnd } = props;
  const { color, spacing } = useTheme();
  const styles = useStyles();
  const ref = React.useRef(null);
  const readTimeoutRef = React.useRef(null);
  const handleOk = signature => {
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
  return _jsxs(Box, {
    height: webviewHeightWithBorders,
    width: '100%',
    children: [
      _jsxs(Box, {
        style: styles.headerSignature,
        children: [
          _jsxs(Typography, { style: styles.date, children: [dateLabel, ' ', dateFormat] }),
          _jsx(Button, {
            size: 'xs',
            title: clearButtonLabel,
            variant: 'tertiary',
            onPress: () => ref.current?.clearSignature(),
          }),
        ],
      }),
      _jsx(Box, {
        tag: 'signature',
        height: '100%',
        onTouchEnd: onEnd,
        maxH: webviewHeightWithBorders,
        style: styles.container,
        children: _jsx(SignatureCanvas, {
          ref: ref,
          onOK: handleOk,
          onEnd: handleEnd,
          onClear: handleClear,
          penColor: styles.pen.color,
          backgroundColor: styles.pen.backgroundColor,
          dotSize: 3.5,
          minWidth: 3,
          maxWidth: 4,
          onBegin: onBegin,
          androidHardwareAccelerationDisabled: true,
          webviewProps: { cacheEnabled: false, androidLayerType: 'software' },
          webStyle: webviewStyle,
        }),
      }),
    ],
  });
};
