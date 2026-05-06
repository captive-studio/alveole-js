declare module 'react-native-syntax-highlighter' {
  import { ComponentType } from 'react';
  import { ViewStyle } from 'react-native';

  interface SyntaxHighlighterProps {
    children: string;
    language: string;
    style?: Record<string, unknown>;
    customStyle?: ViewStyle;
    wrapLongLines?: boolean;
    highlighter?: 'hljs' | 'prism';
    fontSize?: number;
    fontFamily?: string;
    showLineNumbers?: boolean;
    lineNumberStyle?: ViewStyle;
  }

  const SyntaxHighlighter: ComponentType<SyntaxHighlighterProps>;
  export default SyntaxHighlighter;
}
