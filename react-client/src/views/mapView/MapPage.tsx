import { useEffect, useRef } from "react";
import Split from "split.js";
import { styled } from "@mui/material";
import { useAppDispatch } from "@/hooks/useStoreHooks";
import ControlPanel from "@/views/mapView/ControlPanelItems/ControlPanel";
import LeafletMap from "@/views/mapView/mapComponents/LeafletMap";
import "@/views/mapView/gutter.css";
import { invalidateMapSize } from "@/store/slices/uiMapSlice";

const PageSection = styled("section")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  overflow: "hidden",
});

const ViewContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  flexGrow: 1,
  height: "calc(100vh - 130px)", // Adjust this based on your footer height
});

const MapPage = () => {
  const dispatch = useAppDispatch();
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (leftRef.current && rightRef.current) {
      Split([leftRef.current, rightRef.current], {
        sizes: [50, 50],
        minSize: [200, 400],
        gutterSize: 5,
        cursor: "col-resize",
        onDrag: () => dispatch(invalidateMapSize()),
        onDragEnd: () => dispatch(invalidateMapSize()),
      });
    }
  }, [dispatch]);

  return (
    <ViewContainer>
      <PageSection id="split-col-left" ref={leftRef}>
        <ControlPanel />
      </PageSection>
      <PageSection id="split-col-right" ref={rightRef}>
        <LeafletMap />
      </PageSection>
    </ViewContainer>
  );
};

export default MapPage;
