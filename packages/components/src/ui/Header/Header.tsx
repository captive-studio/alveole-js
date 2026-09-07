import { Href } from 'expo-router';
import React from 'react';
import { A, Box, Typography } from '../../core';
import { useStyles } from './Header.styles';

export type HeaderProps = {
  /** Logo carré affiché à gauche. */
  logo: React.ReactNode;
  /** Titre de l'application affiché à côté du logo (masqué en version mobile). */
  title?: string;
  /** Contenu libre affiché à droite (navigation, boutons, etc.). */
  right?: React.ReactNode;
  /** Lien vers lequel le logo et le titre redirigent. `null` pour désactiver le lien. Défaut : "/". */
  homeHref?: (Href & string) | null;
};

export const Header = ({ logo, title, right, homeHref = '/' }: HeaderProps) => {
  const styles = useStyles();

  const identity = (
    <Box style={styles.identity}>
      {logo}
      <Typography style={styles.titleText}>{title}</Typography>
    </Box>
  );

  return (
    <Box tag="header" style={styles.container}>
      <Box style={styles.inner}>
        {homeHref != null ? <A href={homeHref}>{identity}</A> : identity}
        {right != null && <Box style={styles.right}>{right}</Box>}
      </Box>
    </Box>
  );
};
