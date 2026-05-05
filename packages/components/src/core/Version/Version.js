import * as Application from 'expo-application';
import Constants from 'expo-constants';
import { jsx as _jsx } from 'react/jsx-runtime';
import { Typography } from '../Typography';
import { useStyles } from './Version.styles';
export const displayVersion = (version, build) => {
  return `App version ${version}${build ? ` (build ${build})` : ''}`;
};
export const Version = _props => {
  const styles = useStyles();
  const version = Constants?.expoConfig?.version; // Provient du fichier package.json pour le Web
  const sourceVersion = process.env.CONTAINER_VERSION; // https://doc.scalingo.com/platform/app/environment#build-environment-variables
  const build = Application.nativeBuildVersion ?? sourceVersion;
  return _jsx(Typography, { tag: 'version', style: styles.container, children: displayVersion(version, build) });
};
