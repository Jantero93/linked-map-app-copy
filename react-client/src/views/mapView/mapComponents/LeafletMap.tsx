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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: DefaultMarkerIcon2x,
  iconUrl: DefaultMarkerIcon,
  shadowUrl: DefaultMarkerShadow,
});

const LeafletMap = () => {
  const MapEventHandlers = () => {
    useMapEvents({
      // eslint-disable-next-line no-console
      click: (e) => console.log(e),
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
