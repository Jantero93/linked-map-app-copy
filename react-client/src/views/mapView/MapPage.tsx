import { styled } from "@mui/material";
import ControlPanel from "@/views/mapView/ControlPanelItems/ControlPanel";
import LeafletMap from "@/views/mapView/mapComponents/LeafletMap";

const PageSection = styled("section")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
});

const ViewContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  height: "100%",
  flex: 1,
});

const MapPage = () => {
  return (
    <ViewContainer>
      <PageSection>
        <ControlPanel />
      </PageSection>
      <PageSection>
        <LeafletMap />
      </PageSection>
    </ViewContainer>
  );
};

export default MapPage;
