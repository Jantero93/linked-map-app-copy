import { Stack, Typography, styled } from "@mui/material";
import { useAppSelector } from "@/hooks/useStoreHooks";
import SelectControlPanelDropdown from "@/views/mapView/ControlPanelItems/SelectControlPanelDropdown";
import { selectedControllerComponent } from "@/store/slices/generalUiSlice";
import AddCompanyComponent from "@/views/mapView/ControlPanelItems/components/AddCompanyComponent";

const PaddedStack = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
}));
export const ControlPanelComponents = {
  InitialView: "InitialView",
  AddCompany: "AddCompany",
  GetCompanies: "GetCompanies",
} as const;

const { AddCompany, GetCompanies, InitialView } = ControlPanelComponents;

const ComponentMap: Record<string, JSX.Element> = {
  [AddCompany]: <AddCompanyComponent />,
  [InitialView]: <Typography>Very good initial view</Typography>,
  [GetCompanies]: <Typography>Get companies</Typography>,
};
const ControlPanel = () => {
  const selectedControlViewComponent = useAppSelector(
    selectedControllerComponent
  );

  return (
    <PaddedStack spacing={2}>
      <SelectControlPanelDropdown />
      {ComponentMap[selectedControlViewComponent]}
    </PaddedStack>
  );
};

export default ControlPanel;
