import { BoxProps } from '../Box';

// Le cadre n'expose aucun texte : sans nom, un lecteur d'écran annonce « cadre » sans
// dire ce qu'il contient. Le titre par défaut vaut mieux que rien, mais une page qui
// affiche plusieurs tableaux de bord doit les distinguer.
type MetabaseCommonProps = {
  style?: BoxProps['style'];
  /** Nom accessible du cadre. @default 'Tableau de bord Metabase' */
  title?: string;
};

export type MetabaseProps =
  (MetabaseCommonProps & { source: string }) | (MetabaseCommonProps & { token: string; instanceUrl: string });
