import LocalStorageService from "@/services/LocalStorageService";

const Headers = {
  Authorization: "Authorization",
  "Content-Type": "Content-Type",
} as const;

export const get = <T>(url: string): Promise<T> => apiCall(url, "GET");

export const post = <T>(url: string, payload?: unknown): Promise<T> =>
  apiCall(url, "POST", payload);

export const put = <T>(url: string, payload: unknown): Promise<T> =>
  apiCall(url, "PUT", payload);

export const del = <T>(url: string): Promise<T> => apiCall(url, "DELETE");

const createGlobalHeaders = () => {
  const headers: HeadersInit = {};

  const token = LocalStorageService.getTokenFromLocalStorage();

  if (token?.accessToken) {
    headers[Headers.Authorization] = `Bearer ${token.accessToken}`;
  }

  return headers;
};

export type ErrorApiResponse = { message: string };

const apiCall = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: unknown
): Promise<T> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5_000);

  const config: RequestInit = {
    method,
    headers: {
      [Headers["Content-Type"]]: "application/json",
      ...createGlobalHeaders(),
    },
    signal: controller.signal,
  };

  if (["POST", "PUT"].includes(method) && data !== undefined) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errResMsg = (await response.json()) as unknown as ErrorApiResponse;
      console.warn("API call failed, reason:", errResMsg.message);
      throw new Error(errResMsg.message);
    }

    const contentType = response.headers.get(Headers["Content-Type"]);

    if (contentType?.includes("application/json")) {
      return response.json() as Promise<T>;
    }

    if (response.status === 204 || response.status === 205) {
      return {} as T;
    }

    return {} as T;
  } catch (e: unknown) {
    if (!(e instanceof Error)) {
      console.warn("API call failed, reason:", e);
    }

    if ((e as Error).name === "AbortError") {
      console.warn("API call aborted due to timeout");
    }

    console.warn("Exception in apiCall method", (e as Error).message);

    throw e;
  }
};
