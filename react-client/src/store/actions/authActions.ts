import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "@/utilities/fetch/genericFetch";
import { API_URL } from "@/utilities/env";
import { loginApi } from "@/utilities/fetch/loginFetch";
import { RejectedActionPayload } from "@/store/store";
import { setSnackbarText } from "@/store/slices/uiSlice";

export type UserCredentials = {
  username: string;
  password: string;
};

export const registerUser = createAsyncThunk(
  "user-register",
  async (req: UserCredentials, { rejectWithValue }) => {
    try {
      return await post<{ message: string }>(
        `${API_URL}/authentication/register`,
        req
      );
    } catch (e) {
      const rejectedPayload: RejectedActionPayload = {
        errorDescription:
          e instanceof Error ? e.message : "Request could not reach server",
      };

      return rejectWithValue(rejectedPayload);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user-login",
  async (req: UserCredentials, { rejectWithValue }) => {
    try {
      const { username, password } = req;
      return await loginApi(username, password);
    } catch (e) {
      const rejectedValue: RejectedActionPayload = {
        errorDescription:
          e instanceof Error ? e.message : "Request could not reach server",
      };

      return rejectWithValue(rejectedValue);
    }
  }
);

export const setUserLoggedIn = createAction("user-set-logged-in");

// Logouts

//Helper
const performLogout = async () => {
  try {
    const response = await post(API_URL + "/authentication/logout");
    setSnackbarText("Logged out successfully");
    return response;
  } catch (e) {
    const rejectedValue: RejectedActionPayload = {
      errorDescription:
        e instanceof Error ? e.message : "Request could not reach server",
    };
    throw rejectedValue;
  }
};

// Logout actions
export const logoutUser = createAsyncThunk(
  "user-logout",
  async (_, { rejectWithValue }) => {
    try {
      return await performLogout();
    } catch (rejectedValue) {
      return rejectWithValue(rejectedValue);
    }
  }
);

export const forceLogoutUser = createAsyncThunk(
  "user-force-logout",
  async (_, { rejectWithValue }) => {
    try {
      return await performLogout();
    } catch (rejectedValue) {
      return rejectWithValue(
        "Session expired. Please log in again to continue"
      );
    }
  }
);
