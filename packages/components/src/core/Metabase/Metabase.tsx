import WebView from 'react-native-webview';
import { MetabaseProps } from './Metabase.props';
import { useStyles } from './Metabase.styles';

export const Metabase = (props: MetabaseProps) => {
  const styles = useStyles();
  const { style } = props;
  const metabaseStyle = { ...styles.metabase, style };

  if ('source' in props && props.source) {
    return <WebView source={{ uri: props.source }} style={metabaseStyle} />;
  }

  if ('token' in props && 'instanceUrl' in props) {
    const { token, instanceUrl } = props;

    const embedUrl = `${instanceUrl}embed/dashboard/${encodeURIComponent(token)}#bordered=true&titled=true`;
    return <WebView source={{ uri: embedUrl }} style={metabaseStyle} />;
  }

  return null;
};
