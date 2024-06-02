import { useEffect, useRef, MutableRefObject } from "react";
import { Overlay, Map } from "ol";

type OverlayRef = MutableRefObject<HTMLDivElement | null>;

const useOverlay = (
  mapInstanceRef: MutableRefObject<Map | null>,
  popupRef: OverlayRef
): MutableRefObject<Overlay | null> => {
  const overlayRef = useRef<Overlay | null>(null);

  useEffect(() => {
    if (popupRef.current && mapInstanceRef.current && !overlayRef.current) {
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
