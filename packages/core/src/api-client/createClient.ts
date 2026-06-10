import { constantExtras } from './../constantExtra';
import axios from 'axios';
import { onRequest } from './interceptors/onRequest';
import { onResponseError } from './interceptors/onResponseError';
import { onResponseSuccess } from './interceptors/onResponseSuccess';

export const createClient = () => {
  const baseURL = constantExtras.API_URL;
  const api = axios.create({ baseURL, timeout: 30_000 });

  api.interceptors.request.use(onRequest);
  api.interceptors.response.use(onResponseSuccess, onResponseError);

  return api;
};
