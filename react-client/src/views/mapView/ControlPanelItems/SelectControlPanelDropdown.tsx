import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHooks";
import { ControlPanelComponents } from "@/views/mapView/ControlPanelItems/ControlPanel";
import {
  ControlViewComponent,
  setControlViewComponent,
} from "@/store/slices/generalUiSlice";
import { normalizeControlPanelComponentNames } from "@/utilities/commonHelpers";

const StyledHeader = styled(Typography)(({ theme }) => ({
  paddingBottom: theme.spacing(2),
}));

const SelectControlPanelDropdown = () => {
  const selectedComponent = useAppSelector(
    (s) => s.ui.selectedControlViewComponent
  );
  const dispatch = useAppDispatch();

  const controlPanelComponentValues = Object.values(ControlPanelComponents);

  const isComponentString = (input: string): input is ControlViewComponent =>
    controlPanelComponentValues.includes(input as ControlViewComponent);

  const handleChange = ({ target: { value } }: SelectChangeEvent) => {
    if (!isComponentString(value)) {
      throw new Error(
        `Component mapping fails in ControlPanel, unknown value ${value}`
      );
    }

    dispatch(setControlViewComponent(value));
  };

  return (
    <FormControl>
      <StyledHeader variant="h6">Map interactions</StyledHeader>
      <Select onChange={handleChange} value={selectedComponent}>
        {controlPanelComponentValues.map((component) => (
          <MenuItem key={component} value={component}>
            {normalizeControlPanelComponentNames(component)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectControlPanelDropdown;
