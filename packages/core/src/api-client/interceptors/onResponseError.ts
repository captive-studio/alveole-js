import { constantExtras } from './../../constantExtra';
import NetInfo from '@react-native-community/netinfo';
import axios, { AxiosError, AxiosRequestConfig, isAxiosError } from 'axios';
import { clearToken, getRefreshToken, getToken, setToken, TOKEN_TYPE } from '../auth';
import { queryClient } from '../queryClient';
import { emitFinalNetworkError } from './networkErrorBus';

interface RetryableRequestConfig extends AxiosRequestConfig {
  /** pour le refresh 401 */
  _retry?: boolean;
  /** pour les erreurs de réseau */
  _netRetryCount?: number;
}

async function clearAllTokens(error: AxiosError) {
  await clearToken();
  queryClient.setQueryData(['auth', 'token'], null);
  return Promise.reject(error);
}

let refreshPromise: Promise<string> | null = null;

function isRefreshRequest(url?: string) {
  return !!url && url.includes('/refresh');
}

// - Refresh token
async function doRefreshOnce(): Promise<string> {
  const [refreshToken, accessToken] = await Promise.all([getRefreshToken(), getToken()]);
  if (!refreshToken) throw new Error('Aucun refresh token');

  const refreshResponse = await axios.post(`${constantExtras.API_URL}/refresh`, {
    refresh_token: refreshToken,
    access_token: accessToken,
  });

  const newToken = refreshResponse.headers['authorization']?.split(' ')[1];
  if (!newToken) throw new Error('Aucun token JWT reçu');

  await setToken({ token: newToken });
  return newToken;
}

function getOrCreateRefreshPromise() {
  if (!refreshPromise) {
    refreshPromise = doRefreshOnce().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

// - Erreurs reseau
const IDEMPOTENT_METHODS = new Set(['get', 'head', 'options']);

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

async function waitUntilOnline(timeoutMs = 30_000) {
  const state = await NetInfo.fetch();
  if (state.isConnected && state.isInternetReachable) return;

  return new Promise<void>(resolve => {
    const timeout = setTimeout(() => {
      unsubscribe();
      resolve();
    }, timeoutMs);

    const unsubscribe = NetInfo.addEventListener(s => {
      if (s.isConnected && s.isInternetReachable) {
        clearTimeout(timeout);
        unsubscribe();
        resolve();
      }
    });
  });
}

function shouldNetworkRetry(config: RetryableRequestConfig) {
  const method = (config.method || 'get').toLowerCase();
  if (config.headers && (config.headers as any)['x-no-network-retry'] === '1') return false;
  if (isRefreshRequest(config.url)) return false;
  return IDEMPOTENT_METHODS.has(method);
}

async function retryNetworkOnceOrThrow(error: AxiosError) {
  const originalRequest = error.config as RetryableRequestConfig;
  if (!originalRequest) throw error;
  if (!shouldNetworkRetry(originalRequest)) throw error;
  originalRequest._netRetryCount = (originalRequest._netRetryCount ?? 0) + 1;
  if (originalRequest._netRetryCount > 2) throw error;

  await waitUntilOnline(5000);
  await sleep(3000);
  return axios.request(originalRequest);
}

/** Intercepteur d'erreur du client API */
export async function onResponseError(error: unknown) {
  if (!isAxiosError(error) || !error.config) throw error;

  const originalRequest: RetryableRequestConfig = error.config;
  const status = error.response?.status;

  // Les annulations explicites (AbortController / React Query) ne doivent pas
  // être traitées comme des erreurs réseau globales.
  if (axios.isCancel(error) || error.code === 'ERR_CANCELED') {
    return Promise.reject(error);
  }

  // Net
  if (!error.response) {
    try {
      return await retryNetworkOnceOrThrow(error as AxiosError);
    } catch (finalNetErr: any) {
      finalNetErr.__networkRetriesExhausted = true;
      emitFinalNetworkError(finalNetErr ?? undefined);
      throw finalNetErr;
    }
  }

  if (isRefreshRequest(originalRequest.url)) return clearAllTokens(error as AxiosError);

  // Auth
  if (status === 401) {
    if (originalRequest._retry) return clearAllTokens(error as AxiosError);

    const rt = await getRefreshToken();
    if (!rt) return clearAllTokens(error as AxiosError);

    try {
      originalRequest._retry = true;
      const newToken = await getOrCreateRefreshPromise();

      originalRequest.headers = {
        ...(originalRequest.headers ?? {}),
        Authorization: `${TOKEN_TYPE} ${newToken}`,
      };

      return axios.request(originalRequest);
    } catch (refreshError) {
      await clearToken();
      queryClient.setQueryData(['auth', 'token'], null);
      return Promise.reject(refreshError);
    }
  }

  // Autres
  throw error;
}
