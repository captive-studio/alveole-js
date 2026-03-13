import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { useStyles } from './Page.styles';

export type PageBackgroundProps = {
  children: React.ReactNode;
};

export const PageBackground = ({ children }: PageBackgroundProps) => {
  const styles = useStyles();

  return (
    <LinearGradient
      colors={['#FFFFFF', '#F5F6F8']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradientBackground}
    >
      {children}
    </LinearGradient>
  );
};
