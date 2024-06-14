import { Stack, Typography, styled } from "@mui/material";
import { useAppSelector } from "@/hooks/useStoreHooks";
import SelectControlPanelDropdown from "@/views/mapView/ControlPanelItems/SelectControlPanelDropdown";
import { selectedControllerComponent } from "@/store/slices/generalUiSlice";
import AddCompanyComponent from "@/views/mapView/ControlPanelItems/components/AddCompanyComponent";
import InitialViewComponent from "@/views/mapView/ControlPanelItems/components/InitialViewComponent";

const PaddedStack = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
}));
export const ControlPanelComponents = {
  InitialView: "InitialView",
  AddCompany: "AddCompany",
  GetCompanies: "GetCompanies",
} as const;

const { AddCompany, GetCompanies, InitialView } = ControlPanelComponents;

const ComponentMapping: Record<string, JSX.Element> = {
  [AddCompany]: <AddCompanyComponent />,
  [InitialView]: <InitialViewComponent />,
  [GetCompanies]: <Typography>Get companies</Typography>,
};
const ControlPanel = () => {
  const selectedControlViewComponent = useAppSelector(
    selectedControllerComponent
  );

  return (
    <PaddedStack spacing={2}>
      <SelectControlPanelDropdown />
      {ComponentMapping[selectedControlViewComponent]}
    </PaddedStack>
  );
};

export default ControlPanel;
