// src/components/Map.tsx
import { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style, Icon } from "ol/style";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import "ol/ol.css";

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
      //const lonLat = toLonLat(coordinates);

      /* await GeocodingService.getStreetNameFromLonLat(lonLat[0], lonLat[1]); */

      const iconFeature = new Feature({
        geometry: new Point(coordinates),
      });

      vectorSource.addFeature(iconFeature);
    });

    return () => mapObj.current?.setTarget(undefined);
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
};

export default OlMap;
