import { createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "@/utilities/fetch/genericFetch";
import { API_URL } from "@/utilities/env";
import { loginApi } from "@/utilities/fetch/loginFetch";
import { RejectedValue } from "../store";

export type UserCredentials = {
  username: string;
  password: string;
};

export const registerUser = createAsyncThunk(
  "user-register",
  async (req: UserCredentials, thunkAPI) => {
    try {
      return await post<{ message: string }>(
        `${API_URL}/authentication/register`,
        req
      );
    } catch (e) {
      const rejectedValue: RejectedValue = {
        errorDescription:
          e instanceof Error ? e.message : "Request could not reach server",
      };

      return thunkAPI.rejectWithValue(rejectedValue);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user-login",
  async (req: UserCredentials, thunkAPI) => {
    try {
      const { username, password } = req;
      return await loginApi(username, password);
    } catch (e) {
      const rejectedValue: RejectedValue = {
        errorDescription:
          e instanceof Error ? e.message : "Request could not reach server",
      };

      return thunkAPI.rejectWithValue(rejectedValue);
    }
  }
);
