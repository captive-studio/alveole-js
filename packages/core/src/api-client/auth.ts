import { AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

export const TOKEN_TYPE = 'Bearer';
export const API_ACCESS_TOKEN_KEY = 'access_token';
export const API_REFRESH_TOKEN_KEY = 'refresh_token';
export const API_ACCESS_USER_KEY = 'user_type';

export async function setToken(params: { token: string }): Promise<void> {
  await storeByKey(API_ACCESS_TOKEN_KEY, params.token);
}

export async function setRefreshToken(params: { token: string }): Promise<void> {
  await storeByKey(API_REFRESH_TOKEN_KEY, params.token);
}

export async function getToken(): Promise<string | null> {
  return await getByKey(API_ACCESS_TOKEN_KEY);
}

export async function getRefreshToken(): Promise<string | null> {
  return await getByKey(API_REFRESH_TOKEN_KEY);
}

export async function clearToken(): Promise<void> {
  await removeByKey(API_ACCESS_TOKEN_KEY);
  await removeByKey(API_REFRESH_TOKEN_KEY);
}

export function extractTokenFromHeader(headers: AxiosResponse<any, any>['headers']) {
  const authorization = headers?.['authorization'];

  if (typeof authorization === 'string' && authorization.startsWith(TOKEN_TYPE)) {
    const token = authorization.split(' ')[1];
    if (token) return token;
  }
}

async function storeByKey(key: string, value: string) {
  if (isWeb) return localStorage.setItem(key, value);
  await SecureStore.setItemAsync(key, value);
}

async function getByKey(key: string) {
  if (isWeb) return localStorage.getItem(key);
  return await SecureStore.getItemAsync(key);
}

async function removeByKey(key: string) {
  if (isWeb) return localStorage.removeItem(key);
  await SecureStore.deleteItemAsync(key);
}
