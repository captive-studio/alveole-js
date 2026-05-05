import { CSSProperties } from 'react';
import { SyntaxHighlighterProps } from 'react-syntax-highlighter';
export type HighlightProps = Pick<SyntaxHighlighterProps, 'children'> & {
  language: 'json' | 'typescript' | 'tsx' | 'ruby' | 'bash' | 'plaintext' | 'html';
  style?: CSSProperties;
};
export declare const Highlight: (props: HighlightProps) => import('react/jsx-runtime').JSX.Element;
//# sourceMappingURL=Highlight.d.ts.map
