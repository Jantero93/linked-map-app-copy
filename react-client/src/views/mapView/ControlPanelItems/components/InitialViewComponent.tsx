import {
  Box,
  IconButton,
  IconButtonProps,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ControlPanelComponents } from "@/views/mapView/ControlPanelItems/ControlPanel";
import { setControlViewComponent } from "@/store/slices/generalUiSlice";
import { useAppDispatch } from "@/hooks/useStoreHooks";
import { normalizeControlPanelComponentNames } from "@/utilities/commonHelpers";

const StyledList = styled(List)(({ theme: _theme }) => ({
  width: "100%",
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ListActionButton = styled(({ ...otherProps }: IconButtonProps) => (
  <IconButton {...otherProps} color="success" />
))(({ theme: _theme }) => ({}));

const InitialViewComponent = () => {
  const dispatch = useAppDispatch();

  return (
    <Box>
      <StyledList>
        {Object.values(ControlPanelComponents)
          .filter((component) => component !== "InitialView")
          .map((component) => (
            <StyledListItem
              key={component}
              secondaryAction={
                <ListActionButton
                  onClick={() => dispatch(setControlViewComponent(component))}
                >
                  <ArrowForwardIcon fontSize="large" />
                </ListActionButton>
              }
            >
              <Typography>
                {normalizeControlPanelComponentNames(component)}
              </Typography>
            </StyledListItem>
          ))}
      </StyledList>
    </Box>
  );
};

export default InitialViewComponent;
