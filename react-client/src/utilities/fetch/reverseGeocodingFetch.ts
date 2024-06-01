import { OpenCageReverseGeocodingRes } from "@/services/GeocodingTypes";
import { ErrorApiResponse } from "./genericFetch";

export const requestReverseGeocoding = async (
  url: string
): Promise<OpenCageReverseGeocodingRes> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5_000);

  const config: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errResMsg = (await response.json()) as unknown as ErrorApiResponse;
      console.warn("API call failed, reason:", errResMsg.message);
      throw new Error(errResMsg.message);
    }

    const contentType = response.headers.get("Content-Type");

    if (contentType?.includes("application/json")) {
      return response.json() as Promise<OpenCageReverseGeocodingRes>;
    }

    if (response.status === 204 || response.status === 205) {
      return {} as OpenCageReverseGeocodingRes;
    }

    return {} as OpenCageReverseGeocodingRes;
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
