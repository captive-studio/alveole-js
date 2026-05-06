import React from 'react';
import { ScrollView, ViewStyle } from 'react-native';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { useStyles } from './Highlight.styles';
import { atomOneLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export type HighlightProps = {
  children: string;
  language: 'json' | 'typescript' | 'tsx' | 'ruby' | 'bash' | 'plaintext' | 'html';
  style?: ViewStyle;
};

const LANGUAGE_MAP: Record<HighlightProps['language'], string> = {
  json: 'json',
  typescript: 'typescript',
  tsx: 'typescript',
  ruby: 'ruby',
  bash: 'bash',
  plaintext: 'plaintext',
  html: 'xml',
};

export const Highlight = ({ children, language, style }: HighlightProps) => {
  const styles = useStyles();
  const hljsLanguage = LANGUAGE_MAP[language];
  const isPrism = language === 'tsx';

  return (
    <ScrollView horizontal contentContainerStyle={[styles.highlight, style]}>
      <SyntaxHighlighter
        language={hljsLanguage}
        style={isPrism ? oneLight : atomOneLight}
        highlighter={isPrism ? 'prism' : 'hljs'}
        customStyle={{
          backgroundColor: 'transparent',
          borderWidth: 0,
          padding: 0,
          margin: 0,
        }}
        wrapLongLines
      >
        {children}
      </SyntaxHighlighter>
    </ScrollView>
  );
};
