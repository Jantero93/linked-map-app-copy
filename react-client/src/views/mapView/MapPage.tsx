import { styled } from "@mui/material";
import { useAppSelector } from "@/hooks/useStoreHooks";
import { ControlViewComponent } from "@/store/slices/generalUiSlice";
import ControlPanel from "@/views/mapView/ControlPanelComponents/ControlPanel";
import OlMap from "@/views/mapView/mapComponents/OlMap";
import AddCompany from "@/views/mapView/ControlPanelComponents/AddCompany";

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

const ControlPanelComponents: Record<ControlViewComponent, JSX.Element> = {
  AddCompany: <AddCompany />,
  ViewCompany: <h1>This is view company component</h1>,
};

const MapPage = () => {
  const selectedControlViewComponent = useAppSelector(
    (s) => s.ui.selectedControlViewComponent
  );

  const controlPanelComponent =
    selectedControlViewComponent === null
      ? null
      : ControlPanelComponents[selectedControlViewComponent];

  return (
    <ViewContainer>
      <PageSection>
        <ControlPanel component={controlPanelComponent} />
      </PageSection>
      <PageSection>
        <OlMap />
      </PageSection>
    </ViewContainer>
  );
};

export default MapPage;
