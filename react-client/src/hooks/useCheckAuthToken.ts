import { useEffect } from "react";
import { RootState } from "@/store/store";
import { logoutUser, setUserLoggedIn } from "@/store/actions/authActions";
import {
  isTimeAfterCurrentUtc,
  isTimeBeforeCurrentUtc,
} from "@/utilities/dateHelpers";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHooks";
import LocalStorageService from "@/services/LocalStorageService";

/**
 * Checks every two minutes or useEffect trigger is auth token expired.
 * If it is, force log out via api and set correct state in redux, clear auth token from local storage
 */
const useCheckAuthToken = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn: loggedIn, accessTokenExpiresDate } = useAppSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const checkTokenValidity = () => {
      if (accessTokenExpiresDate === null) return;

      const isTokenExpired = isTimeBeforeCurrentUtc(accessTokenExpiresDate);

      // Force logout if token expired and user logged in
      if (isTokenExpired && loggedIn) {
        dispatch(logoutUser());
      }
    };

    checkTokenValidity();

    const twoMinutes = 120 * 1_000;
    const interval = setInterval(checkTokenValidity, twoMinutes);

    return () => clearInterval(interval);
  }, [loggedIn, accessTokenExpiresDate, dispatch]);

  // Check should log in user on app initialization
  useEffect(() => {
    const checkShouldLogInUser = () => {
      const expiresIn =
        LocalStorageService.getTokenFromLocalStorage()?.expiresIn;

      if (expiresIn === null || expiresIn === undefined) return;

      const isTokenValid = isTimeAfterCurrentUtc(expiresIn);

      if (isTokenValid && !loggedIn) {
        dispatch(setUserLoggedIn());
      }
    };

    checkShouldLogInUser();
  }, [loggedIn, accessTokenExpiresDate, dispatch]);
};

export default useCheckAuthToken;
