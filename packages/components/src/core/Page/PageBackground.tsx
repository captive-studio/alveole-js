import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { useStyles } from './Page.styles';
import { Colors } from '@alveole/theme';

export type PageBackgroundProps = {
  children: React.ReactNode;
};

export const PageBackground = ({ children }: PageBackgroundProps) => {
  const styles = useStyles();

  return (
    <LinearGradient
      colors={[Colors.Neutre['1000'], Colors.Neutre['975']]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradientBackground}
    >
      {children}
    </LinearGradient>
  );
};
