import { useEffect } from "react";
import { RootState } from "@/store/store";
import { logoutUser } from "@/store/actions/authActions";
import { isTimeBeforeCurrentUtc } from "@/utilities/dateHelpers";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHooks";

/**
 * Checks every two minutes or useEffect trigger is auth token expired.
 * If it is, force log out via api and set correct state in redux, clear auth token from local storage
 */
const useCheckAuthToken = () => {
  const dispatch = useAppDispatch();
  const { loggedIn, accessTokenExpiresDate } = useAppSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const checkTokenValidity = () => {
      if (accessTokenExpiresDate === null) return;

      const isTokenExpired = isTimeBeforeCurrentUtc(accessTokenExpiresDate);

      if (isTokenExpired) {
        dispatch(logoutUser());
      }
    };

    if (loggedIn) {
      checkTokenValidity();
      const twoMinutes = 120 * 1_000;
      const interval = setInterval(checkTokenValidity, twoMinutes);

      return () => clearInterval(interval);
    }
  }, [loggedIn, accessTokenExpiresDate, dispatch]);
};

export default useCheckAuthToken;
