import { ActivityIndicator } from 'react-native';
import WebView from 'react-native-webview';
import { Box } from '../Box';

import type { PdfViewerProps } from './PdfViewer.props';

export const PdfViewer = (props: PdfViewerProps) => {
  const { source, headers } = props;

  return (
    <Box flex={1}>
      <WebView
        source={{ uri: source, headers }}
        startInLoadingState
        renderLoading={() => (
          <Box flex={1} align-items="center" justify-content="center">
            <ActivityIndicator size="large" />
          </Box>
        )}
        style={{ flex: 1 }}
      />
    </Box>
  );
};
