import { useEffect, useRef } from "react";
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
import GeocodingService from "@/services/GeocodingService";
import { useAppDispatch } from "@/hooks/useStoreHooks";
import { setSnackbarText } from "@/store/slices/uiSlice";
import { clearLocation, setLocation } from "@/store/slices/uiMapSlice";
import { styled } from "@mui/material/styles";

const MapContainer = styled("div")(() => ({
  flex: 1,
  width: "100%",
  height: "100%",
}));

const OlMap = () => {
  const dispatch = useAppDispatch();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapObj = useRef<Map>();

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

      const geoRes = await GeocodingService.getReverseGeocodingInfoFromPoint(
        lonLat[0],
        lonLat[1]
      );

      dispatch(geoRes ? setLocation(geoRes) : clearLocation());

      const iconFeature = new Feature({
        geometry: new Point(coordinates),
      });

      vectorSource.addFeature(iconFeature);
    });

    return () => mapObj.current?.setTarget(undefined);
  }, [dispatch]);

  return <MapContainer ref={mapRef} />;
};

export default OlMap;
