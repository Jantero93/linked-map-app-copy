import {
  OPENIDDICT_CLIENT_ID,
  OPENIDDICT_GRANT_TYPE,
  API_LOGIN_URL,
} from "@/utilities/env";

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
      console.error(`Http error in sign in: ${await response.text()}`);
      throw new Error(`HTTP error! status: ${response.statusText}`);
    }

    const data = (await response.json()) as LoginResponse;
    return data;
  } catch (error) {
    console.error(
      "There was an error with the login request",
      JSON.stringify(error)
    );
    throw error;
  }
};
