import {
  TokenLocalStorage,
  getFromLocalStorage
} from '@/utilities/localStorageHelpers';

export const get = <T>(url: string): Promise<T> => apiCall(url, 'GET');

export const post = <T>(url: string, payload?: unknown): Promise<T> =>
  apiCall(url, 'POST', payload);

export const put = <T>(url: string, payload: unknown): Promise<T> =>
  apiCall(url, 'PUT', payload);

export const del = <T>(url: string): Promise<T> => apiCall(url, 'DELETE');

const createGlobalHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {};

  const token = getFromLocalStorage<TokenLocalStorage>('Token');

  if (token?.accessToken) {
    headers.Authorization = `Bearer ${token.accessToken}`;
  }

  return headers;
};

const apiCall = async <T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: unknown
): Promise<T> => {
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...createGlobalHeaders()
    }
  };

  if (['POST', 'PUT'].includes(method) && data !== undefined) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`API call failed: ${JSON.stringify(response)}`);
    }
    return response.json() as Promise<T>;
  } catch (e) {
    console.error(JSON.stringify(e));
    throw e;
  }
};