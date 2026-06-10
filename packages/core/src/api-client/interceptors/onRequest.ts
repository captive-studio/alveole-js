import { InternalAxiosRequestConfig } from 'axios';
import Constants from 'expo-constants';
import { getToken, TOKEN_TYPE } from '../auth';

export async function onRequest(config: InternalAxiosRequestConfig) {
  const accessToken = await getToken();
  config.headers.set('accept', 'application/json');

  const version = Constants?.expoConfig?.version;
  config.headers.set('X-Frontend-version', version);

  if (accessToken != null) config.headers.set('Authorization', `${TOKEN_TYPE} ${accessToken}`);
  return config;
}
