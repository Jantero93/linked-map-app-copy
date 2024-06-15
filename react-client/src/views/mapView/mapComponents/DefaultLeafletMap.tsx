import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import DefaultMarkerIcon2x from "@/assets/map/default-marker-icon-2x.png";
import DefaultMarkerIcon from "@/assets/map/default-marker-icon.png";
import DefaultMarkerShadow from "@/assets/map/default-marker-shadow.png";
import { useAppSelector } from "@/hooks/useStoreHooks";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: DefaultMarkerIcon2x,
  iconUrl: DefaultMarkerIcon,
  shadowUrl: DefaultMarkerShadow,
});

type DefaultLeafletMapProps = {
  children: React.ReactNode;
};

const DefaultLeafletMap = ({ children }: DefaultLeafletMapProps) => {
  const shouldInvalidateMapSize = useAppSelector(
    (s) => s.uiMap.shouldInvalidateSize
  );

  const ResizeHandler = () => {
    const map = useMap();

    useEffect(() => {
      shouldInvalidateMapSize && map.invalidateSize();
    }, [map]);

    return null;
  };

  return (
    <MapContainer
      center={[61.4898, 23.7734]}
      zoom={14}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ResizeHandler />
      {children}
    </MapContainer>
  );
};

export default DefaultLeafletMap;
