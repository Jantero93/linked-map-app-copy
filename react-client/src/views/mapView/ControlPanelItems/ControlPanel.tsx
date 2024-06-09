import { Stack, styled } from "@mui/material";
import { useAppSelector } from "@/hooks/useStoreHooks";
import SelectControlPanelDropdown from "@/views/mapView/ControlPanelItems/SelectControlPanelDropdown";
import { ComponentMap } from "@/views/mapView/ControlPanelItems/components/componentsConstants";

const PaddedStack = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const ControlPanel = () => {
  const selectedControlViewComponent = useAppSelector(
    (s) => s.ui.selectedControlViewComponent
  );

  return (
    <PaddedStack>
      <SelectControlPanelDropdown />
      {ComponentMap[selectedControlViewComponent]}
    </PaddedStack>
  );
};

export default ControlPanel;
