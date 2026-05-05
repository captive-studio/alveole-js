import { ActivityIndicator } from 'react-native';
import WebView from 'react-native-webview';
import { jsx as _jsx } from 'react/jsx-runtime';
import { Box } from '../Box';
export const PdfViewer = props => {
  const { source, headers } = props;
  return _jsx(Box, {
    flex: 1,
    children: _jsx(WebView, {
      source: { uri: source, headers },
      startInLoadingState: true,
      renderLoading: () =>
        _jsx(Box, {
          flex: 1,
          'align-items': 'center',
          'justify-content': 'center',
          children: _jsx(ActivityIndicator, { size: 'large' }),
        }),
      style: { flex: 1 },
    }),
  });
};
