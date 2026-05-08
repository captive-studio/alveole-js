import { AxiosResponse } from 'axios';
import { extractTokenFromHeader, setToken } from '../auth';

export async function onResponseSuccess(response: AxiosResponse) {
  const token = extractTokenFromHeader(response.headers);
  if (token) await setToken({ token });
  return response;
}
