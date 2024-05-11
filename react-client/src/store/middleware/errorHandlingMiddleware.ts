import { Middleware, UnknownAction } from "@reduxjs/toolkit";
import { setSnackbarText } from "@/store/slices/uiSlice";
import { store } from "../store";

interface ActionWithStringPayload extends UnknownAction {
  payload?: string;
}

const isActionWithPayload = (
  action: unknown
): action is ActionWithStringPayload =>
  (action as UnknownAction).type !== undefined &&
  (typeof action as unknown as ActionWithStringPayload).payload !== "string";

const errorHandlingMiddleware: Middleware =
  (_store) => (next) => (action: unknown) => {
    const isCorrectAction = isActionWithPayload(action);

    if (isCorrectAction && action.type.endsWith("/rejected")) {
      store.dispatch(
        setSnackbarText(action.payload ?? "Error on request to server")
      );
    }

    return next(action);
  };

export default errorHandlingMiddleware;
