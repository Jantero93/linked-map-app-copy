import { Middleware } from "@reduxjs/toolkit";
import { setSnackbarText } from "@/store/slices/uiSlice";
import { RejectedValue, store } from "../store";

interface ActionWithRejectedValue {
  type: string;
  payload?: RejectedValue;
}

const isActionWithRejectedValue = (
  action: unknown
): action is ActionWithRejectedValue => {
  return (
    typeof action === "object" &&
    action !== null &&
    "type" in action &&
    "payload" in action &&
    typeof (action as ActionWithRejectedValue).payload === "object" &&
    (action as ActionWithRejectedValue).payload !== null &&
    "errorDescription" in (action as ActionWithRejectedValue).payload!
  );
};

const errorHandlingMiddleware: Middleware =
  (_store) => (next) => (action: unknown) => {
    const isCorrectAction = isActionWithRejectedValue(action);

    if (isCorrectAction && action.type.endsWith("/rejected")) {
      store.dispatch(
        setSnackbarText(
          action.payload?.errorDescription ?? "Error on request to server"
        )
      );
    }

    return next(action);
  };

export default errorHandlingMiddleware;
