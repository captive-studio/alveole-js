import { useTheme } from '@alveole/theme';
import { Platform, View } from 'react-native';
import { Typography } from '../Typography';
import { useStyles } from './Code.styles';

export type CodeProps = {
  children: React.ReactNode;
};

export const Code = ({ children }: CodeProps) => {
  const { text } = useTheme();
  const styles = useStyles();
  // Un Text imbriqué ignore le padding et l'arrondi en natif. Une vue inline
  // porte la surface et laisse le texte du code dans le flux du paragraphe.
  if (Platform.OS !== 'web') {
    return (
      <View style={styles.codeSurface}>
        <Typography style={[text['Corps de texte'].SM.Regular, styles.codeText]}>{children}</Typography>
      </View>
    );
  }

  return (
    <Typography tag="code" style={[text['Corps de texte'].SM.Regular, styles.code]}>
      {children}
    </Typography>
  );
};
