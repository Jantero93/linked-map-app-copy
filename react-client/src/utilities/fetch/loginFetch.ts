import {
  OPENIDDICT_CLIENT_ID,
  OPENIDDICT_GRANT_TYPE,
  API_LOGIN_URL,
} from "@/utilities/env";
import { ErrorApiResponse } from "@/utilities/fetch/genericFetch";

export type LoginResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token?: string;
};

export const loginApi = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const params = new URLSearchParams({
    username,
    password,
    grant_type: OPENIDDICT_GRANT_TYPE,
    client_id: OPENIDDICT_CLIENT_ID,
  });

  try {
    const response = await fetch(API_LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    if (!response.ok) {
      const errResMsg = (await response.json()) as unknown as ErrorApiResponse;
      console.error("API call failed, reason:", errResMsg.message);
      throw new Error(errResMsg.message);
    }

    const data = (await response.json()) as LoginResponse;
    return data;
  } catch (e) {
    console.error("Exception in login fetch", e);
    throw e;
  }
};
