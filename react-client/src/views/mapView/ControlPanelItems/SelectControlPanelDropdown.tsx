import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHooks";
import { ControlPanelComponents } from "@/views/mapView/ControlPanelItems/components/componentsConstants";
import {
  ControlViewComponent,
  setControlViewComponent,
} from "@/store/slices/generalUiSlice";

const SelectControlPanelDropdown = () => {
  const selectedComponent = useAppSelector(
    (s) => s.ui.selectedControlViewComponent
  );
  const dispatch = useAppDispatch();

  const controlPanelComponentKeys = Object.values(ControlPanelComponents);

  const isComponentString = (input: string): input is ControlViewComponent =>
    controlPanelComponentKeys.includes(input as ControlViewComponent);

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
      <Select onChange={handleChange} value={selectedComponent}>
        {controlPanelComponentKeys.map((component) => (
          <MenuItem key={component} value={component}>
            {component}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectControlPanelDropdown;
