import { useEffect, useRef, MutableRefObject } from "react";
import { Map, View } from "ol";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { fromLonLat } from "ol/proj";

const useInitializeMap = (
  mapRef: MutableRefObject<HTMLDivElement | null>
): MutableRefObject<Map | null> => {
  const mapInstanceRef = useRef<Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
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
      });

      const map = new Map({
        target: mapRef.current,
        layers: [...initialLayers, vectorLayer],
        view: initialView,
      });

      mapInstanceRef.current = map;
    }
  }, [mapRef]);

  return mapInstanceRef;
};

export default useInitializeMap;
