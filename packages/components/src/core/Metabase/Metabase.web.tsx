import React, { useEffect, useRef } from 'react';
import { MetabaseProps } from './Metabase.props';
import { useStyles } from './Metabase.styles';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'metabase-dashboard': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          token?: string;
          'with-title'?: string;
          'with-downloads'?: string;
        },
        HTMLElement
      >;
    }
  }
}

export const Metabase = (props: MetabaseProps) => {
  const styles = useStyles();
  const scriptLoadedRef = useRef(false);
  const configLoadedRef = useRef(false);

  const isSourceFormat = 'source' in props && props.source;
  const token = 'token' in props ? props.token : undefined;
  const instanceUrl = 'instanceUrl' in props ? props.instanceUrl : undefined;

  useEffect(() => {
    if (!scriptLoadedRef.current && typeof window !== 'undefined' && instanceUrl) {
      const existingScript = document.querySelector(`script[src="${instanceUrl}/app/embed.js"]`);
      if (existingScript) {
        scriptLoadedRef.current = true;
        return;
      }

      const script = document.createElement('script');
      script.src = `${instanceUrl}/app/embed.js`;
      script.defer = true;
      script.onload = () => {
        scriptLoadedRef.current = true;
      };
      document.head.appendChild(script);
    }
  }, [instanceUrl]);

  useEffect(() => {
    if (!configLoadedRef.current && typeof window !== 'undefined' && instanceUrl) {
      (window as any).defineMetabaseConfig = (config: any) => {
        (window as any).metabaseConfig = config;
      };

      (window as any).defineMetabaseConfig({
        theme: {
          preset: 'light',
        },
        isGuest: true,
        instanceUrl: instanceUrl,
      });

      configLoadedRef.current = true;
    }
  }, [instanceUrl]);

  if (isSourceFormat) {
    return <iframe src={props.source} style={styles.metabase} frameBorder="0" />;
  }

  if (!token || !instanceUrl) {
    return null;
  }

  return (
    <div style={styles.metabase}>
      {/* @ts-ignore - metabase-dashboard est un web component */}
      <metabase-dashboard
        token={token}
        with-title="true"
        with-downloads="true"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  );
};
