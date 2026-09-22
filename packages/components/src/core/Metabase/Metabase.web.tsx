import React from 'react';
import { MetabaseProps } from './Metabase.props';
import { useStyles } from './Metabase.styles';
import { useMetabaseEmbed } from './useMetabaseEmbed';

// React 19 a déplacé le namespace `JSX` de la portée globale vers `React.JSX` : une
// `declare global { namespace JSX }` n'est plus lue par le compilateur, et c'est ce qui rendait
// un `@ts-ignore` nécessaire ici. L'augmentation du module `react` remet la déclaration à
// l'endroit où TypeScript la cherche, et l'élément retrouve un vrai type.
declare module 'react' {
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

  const title = props.title ?? 'Tableau de bord Metabase';
  const isSourceFormat = 'source' in props && props.source;
  const token = 'token' in props ? props.token : undefined;
  const instanceUrl = 'instanceUrl' in props ? props.instanceUrl : undefined;

  useMetabaseEmbed(instanceUrl);

  if (isSourceFormat) {
    return <iframe src={props.source} title={title} style={styles.metabase} frameBorder="0" />;
  }

  if (!token || !instanceUrl) {
    return null;
  }

  return (
    <div style={styles.metabase}>
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
