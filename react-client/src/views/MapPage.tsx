import { styled } from "@mui/material";
import ControlPanel from "@/components/mapView/ControlPanel";
import OlMap from "@/components/mapView/OlMap";

const PageSection = styled("div")(() => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
}));

const ViewContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  height: "100%",
  flex: 1,
}));

const MapPage = () => {
  return (
    <ViewContainer>
      <PageSection>
        <ControlPanel />
      </PageSection>
      <PageSection>
        <OlMap />
      </PageSection>
    </ViewContainer>
  );
};

export default MapPage;
