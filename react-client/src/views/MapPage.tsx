import OlMap from "@/components/openlayers/OlMap";
import { styled } from "@mui/material";

const PageSection = styled("section")(() => ({
  height: "100vh",
  width: "50vw",
}));

const ViewContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  height: "100%",
}));

const MapPage = () => {
  return (
    <ViewContainer>
      <PageSection>
        <h1>Place holder action container</h1>
      </PageSection>
      <PageSection>
        <OlMap />
      </PageSection>
    </ViewContainer>
  );
};

export default MapPage;
