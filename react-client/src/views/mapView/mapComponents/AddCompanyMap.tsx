import { Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import DefaultMarkerIcon2x from "@/assets/map/default-marker-icon-2x.png";
import DefaultMarkerIcon from "@/assets/map/default-marker-icon.png";
import DefaultMarkerShadow from "@/assets/map/default-marker-shadow.png";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreHooks";
import { setLocation } from "@/store/slices/uiMapSlice";
import {
  selectedControllerComponent,
  setSnackbarText,
} from "@/store/slices/generalUiSlice";
import GeocodingService from "@/services/GeocodingService";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: DefaultMarkerIcon2x,
  iconUrl: DefaultMarkerIcon,
  shadowUrl: DefaultMarkerShadow,
});

const AddCompanyMap = () => {
  const dispatch = useAppDispatch();
  const controllerComponent = useAppSelector(selectedControllerComponent);

  const handleMapClick = async (lat: number, lng: number) => {
    if (controllerComponent !== "AddCompany") {
      throw new Error(
        `Map and controller panel logic failed; controller component: ${controllerComponent}`
      );
    }

    const geocodingRes =
      await GeocodingService.getReverseGeocodingInfoFromPoint(lng, lat);

    geocodingRes
      ? dispatch(setLocation(geocodingRes))
      : dispatch(
          setSnackbarText("Didn't find location, try to click building")
        );
  };

  const MapEventHandlers = () => {
    useMapEvents({
      click: async ({ latlng: { lat, lng } }) => {
        await handleMapClick(lat, lng);
      },
    });
    return null;
  };

  return (
    <>
      <MapEventHandlers />
      <Marker position={[61.4898, 23.7734]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </>
  );
};

export default AddCompanyMap;
