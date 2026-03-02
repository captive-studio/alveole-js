import * as Application from 'expo-application';
import Constants from 'expo-constants';
import React from 'react';
import { Typography } from '../Typography';
import { useStyles } from './Version.styles';

export const displayVersion = (version: string | undefined, build?: string) => {
  return `App version ${version}${build ? ` (build ${build})` : ''}`;
};
export type VersionProps = React.PropsWithoutRef<{}>;
export const Version = (_props: VersionProps) => {
  const styles = useStyles();

  const version = Constants?.expoConfig?.version; // Provient du fichier package.json pour le Web

  const sourceVersion = process.env.CONTAINER_VERSION; // https://doc.scalingo.com/platform/app/environment#build-environment-variables
  const build = Application.nativeBuildVersion ?? sourceVersion;

  return (
    <Typography tag="version" style={styles.container}>
      {displayVersion(version, build)}
    </Typography>
  );
};
