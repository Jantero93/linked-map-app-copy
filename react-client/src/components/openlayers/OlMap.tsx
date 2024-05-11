// src/components/Map.tsx
import { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";

const OlMap = () => {
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

    mapObj.current = new Map({
      target: mapRef.current,
      layers: initialLayers,
      view: initialView,
    });

    return () => mapObj.current?.setTarget(undefined);
  }, []);

  return <div ref={mapRef} style={{ width: "400px", height: "400px" }} />;
};

export default OlMap;
