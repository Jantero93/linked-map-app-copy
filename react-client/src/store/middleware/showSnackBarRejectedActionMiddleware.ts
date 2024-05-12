import { Middleware, PayloadAction, isRejected } from "@reduxjs/toolkit";
import { setSnackbarText } from "@/store/slices/uiSlice";
import { RejectedActionPayload } from "@/store/store";

const isRejectedActionWithErrorPayload = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: any
): action is PayloadAction<RejectedActionPayload> =>
  typeof action?.payload?.errorDescription === "string" &&
  action?.payload?.errorDescription?.length > 0;

const showSnackbarRejectedActionMiddleware: Middleware =
  (storeApi) => (next) => (action) => {
    if (isRejected(action) && isRejectedActionWithErrorPayload(action)) {
      storeApi.dispatch(
        setSnackbarText(
          action?.payload?.errorDescription ?? "Error on request to API"
        )
      );
    }

    return next(action);
  };

export default showSnackbarRejectedActionMiddleware;
