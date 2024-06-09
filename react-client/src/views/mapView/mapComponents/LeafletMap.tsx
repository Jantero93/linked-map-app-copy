import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
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

const LeafletMap = () => {
  const dispatch = useAppDispatch();
  const controllerComponent = useAppSelector(selectedControllerComponent);

  const handleMapClick = async (lat: number, lng: number) => {
    if (controllerComponent === "AddCompany") {
      const geocodingRes =
        await GeocodingService.getReverseGeocodingInfoFromPoint(lng, lat);

      geocodingRes
        ? dispatch(setLocation(geocodingRes))
        : dispatch(
            setSnackbarText("Didn't find location, try to click building")
          );
    }
  };

  const MapEventHandlers = () => {
    useMapEvents({
      click: (e) => {
        handleMapClick(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapEventHandlers />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
