import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/hooks/useStoreHooks";
import { toLonLat } from "ol/proj";
import { styled } from "@mui/material/styles";
import { setSnackbarText } from "@/store/slices/generalUiSlice";
import StreetInfoPopup, { StreetInfoPopupHandle } from "./StreetInfoPopup";
import { clearLocation, setLocation } from "@/store/slices/uiMapSlice";
import { MapBrowserEvent } from "ol";
import GeocodingService from "@/services/GeocodingService";
import useOverlay from "@/hooks/mapHooks/useOverlay";
import useInitializeMap from "@/hooks/mapHooks/useInitializeMap";

const MapContainer = styled("div")({
  flex: 1,
  width: "100%",
  height: "100%",
  position: "relative",
});

const OlMap = () => {
  const dispatch = useAppDispatch();
  const mapRef = useRef<HTMLDivElement>(null);
  const popupElementRef = useRef<HTMLDivElement>(null);
  const popupHandleRef = useRef<StreetInfoPopupHandle>(null);

  const mapInstanceRef = useInitializeMap(mapRef);
  const overlayRef = useOverlay(mapInstanceRef, popupElementRef);

  useEffect(() => {
    const map = mapInstanceRef.current;

    if (!map) return;

    map.on("click", async (event: MapBrowserEvent<UIEvent>) => {
      const coordinates = event.coordinate;
      const lonLat = toLonLat(coordinates);

      const geoRes = await GeocodingService.getReverseGeocodingInfoFromPoint(
        lonLat[0],
        lonLat[1]
      );

      if (geoRes === null) {
        const notFoundText = `Couldn't get location information from click. Try to click building.`;
        dispatch(setSnackbarText(notFoundText));
        return;
      }

      dispatch(geoRes ? setLocation(geoRes) : clearLocation());

      if (overlayRef.current) {
        overlayRef.current.setPosition(coordinates);
      }

      if (popupHandleRef.current) {
        popupHandleRef.current.show();
      }
    });
  }, [dispatch, mapInstanceRef, overlayRef]);

  return (
    <MapContainer ref={mapRef}>
      <div ref={popupElementRef}>
        <StreetInfoPopup ref={popupHandleRef} />
      </div>
    </MapContainer>
  );
};

export default OlMap;
