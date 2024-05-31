import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReverseGeocodingRes } from "@/services/GeocodingService";
import { mapObjectPropertiesUndefined } from "@/utilities/commonHelpers";

type UiSelectedMapLocation = Partial<ReverseGeocodingRes>;

const initialState: UiSelectedMapLocation = {};

export const uiMapSlice = createSlice({
  name: "ui-map",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<ReverseGeocodingRes>) => {
      const {
        latitude,
        longitude,
        city,
        postalCode,
        streetAddress,
        streetNumber,
        suburban,
      } = action.payload;

      state.city = city;
      state.postalCode = postalCode;
      state.streetAddress = streetAddress;
      state.streetNumber = streetNumber;
      state.suburban = suburban;
      state.latitude = latitude;
      state.longitude = longitude;
    },
    clearLocation: (state) => {
      const undefinedState = mapObjectPropertiesUndefined(state);
      Object.assign(state, undefinedState);
    },
  },
});

export const { setLocation, clearLocation } = uiMapSlice.actions;

export default uiMapSlice.reducer;
