import { Box, IconButton, List, ListItem, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { setControlViewComponent } from "@/store/slices/generalUiSlice";
import { useAppDispatch } from "@/hooks/useStoreHooks";
import { ControlPanelComponentName } from "@/utilities/commonHelpers";
import { normalizeControlPanelComponentName } from "@/utilities/stringUtils";
import { ControlPanelComponents } from "@/views/mapView/componentMapping";
import { getAllCompanies } from "@/store/actions/companyActions";

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

const InitialViewComponent = () => {
  const dispatch = useAppDispatch();
  dispatch(getAllCompanies);

  const renderSecondaryActionIcon = (
    componentName: ControlPanelComponentName
  ) => (
    <IconButton
      color="success"
      onClick={() => dispatch(setControlViewComponent(componentName))}
    >
      <ArrowForwardIcon fontSize="large" />
    </IconButton>
  );

  return (
    <Box>
      <StyledList>
        {Object.values(ControlPanelComponents)
          .filter((componentName) => componentName !== "InitialView")
          .map((componentName) => (
            <StyledListItem
              key={componentName}
              secondaryAction={renderSecondaryActionIcon(componentName)}
            >
              <Typography>
                {normalizeControlPanelComponentName(componentName)}
              </Typography>
            </StyledListItem>
          ))}
      </StyledList>
    </Box>
  );
};

export default InitialViewComponent;
