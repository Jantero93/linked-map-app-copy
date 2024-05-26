// src/components/Map.tsx
import { useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat, toLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style, Icon } from "ol/style";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import "ol/ol.css";
import GeocodingService, {
  ReverseGeocodingRes,
} from "@/services/GeocodingService";
import { useAppDispatch } from "@/hooks/useStoreHooks";
import { setSnackbarText } from "@/store/slices/uiSlice";
import AddCompanyModal from "../modals/AddCompanyModal";
import { styled } from "@mui/material/styles";

const MapContainer = styled("div")(({ theme: _theme }) => ({
  width: "100%",
  height: "100%",
}));

const OlMap = () => {
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [reverseGeocodingRes, setReverseGeocodingRes] =
    useState<ReverseGeocodingRes | null>(null);

  const dispatch = useAppDispatch();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapObj = useRef<Map>();

  const handleCompanyModal = (open: boolean) => setIsCompanyModalOpen(open);

  useEffect(() => {
    if (!mapRef.current) return;

    const initialLayers = [
      new TileLayer({
        source: new OSM(),
      }),
    ];

    const initialView = new View({
      center: fromLonLat([24.950531, 60.192059]),
      zoom: 12,
    });

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: "https://openlayers.org/en/latest/examples/data/icon.png", // placeholder image
        }),
      }),
    });

    mapObj.current = new Map({
      target: mapRef.current,
      layers: [...initialLayers, vectorLayer],
      view: initialView,
    });

    mapObj.current.on("click", async (event) => {
      const coordinates = event.coordinate;
      const lonLat = toLonLat(coordinates);

      const res = await GeocodingService.getReverseGeocodingInfoFromPoint(
        lonLat[0],
        lonLat[1]
      );

      if (res === null) {
        dispatch(
          setSnackbarText("Couldn't get location information from click")
        );
        return;
      }

      setReverseGeocodingRes({ ...res });
      handleCompanyModal(true);

      const iconFeature = new Feature({
        geometry: new Point(coordinates),
      });

      vectorSource.addFeature(iconFeature);
    });

    return () => mapObj.current?.setTarget(undefined);
  }, [dispatch]);

  if (reverseGeocodingRes === null) return <MapContainer ref={mapRef} />;

  const { streetAddress, streetNumber } = reverseGeocodingRes;
  return (
    <>
      <MapContainer ref={mapRef} />
      <AddCompanyModal
        isOpen={isCompanyModalOpen}
        onClose={() => handleCompanyModal(false)}
        streetAddress={streetAddress}
        streetNumber={streetNumber}
      />
    </>
  );
};

export default OlMap;
