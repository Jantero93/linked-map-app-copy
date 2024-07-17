import { Stack, styled } from "@mui/material";
import SelectControlPanelDropdown from "@/views/mapView/ControlPanelItems/SelectControlPanelDropdown";

const PaddedStack = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
}));

type ControlPanelProps = { component: JSX.Element };

const ControlPanel = ({ component }: ControlPanelProps) => (
  <PaddedStack spacing={2}>
    <SelectControlPanelDropdown />
    {component}
  </PaddedStack>
);

export default ControlPanel;
