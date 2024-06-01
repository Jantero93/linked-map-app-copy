import { useEffect, useRef, MutableRefObject } from "react";
import { Overlay, Map } from "ol";

const useOverlay = (
  mapInstanceRef: MutableRefObject<Map | null>,
  popupRef: MutableRefObject<HTMLDivElement | null>
): MutableRefObject<Overlay | null> => {
  const overlayRef = useRef<Overlay | null>(null);

  useEffect(() => {
    if (popupRef.current && mapInstanceRef.current) {
      const overlay = new Overlay({
        element: popupRef.current,
        autoPan: true,
      });
      overlayRef.current = overlay;
      mapInstanceRef.current.addOverlay(overlay);
    }
  }, [mapInstanceRef, popupRef]);

  return overlayRef;
};

export default useOverlay;
