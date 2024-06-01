import { forwardRef } from "react";
import { Button, Card, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHooks";
import AddIcon from "@mui/icons-material/Add";
import { setControlViewComponent } from "@/store/slices/generalUiSlice";

const PopupContainer = styled(Card)(({ theme }) => ({
  position: "absolute",
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  whiteSpace: "nowrap",
}));

const StreetInfoPopup = forwardRef<HTMLDivElement>((_props, ref) => {
  const { streetAddress, streetNumber, city, postalCode } = useAppSelector(
    (s) => s.uiMap
  );

  const dispatch = useAppDispatch();

  const setAddCompanyToControlPanel = () =>
    dispatch(setControlViewComponent("AddCompany"));

  // If no location found, app global snackbar will notify that

  return (
    <PopupContainer variant="elevation" elevation={2} ref={ref}>
      <Stack>
        <Typography variant="body1">
          {streetAddress} {streetNumber}
        </Typography>
        <Typography variant="body1">{postalCode}</Typography>
        <Typography variant="body1">{city}</Typography>
        <Button
          size="small"
          color="success"
          startIcon={<AddIcon />}
          onClick={setAddCompanyToControlPanel}
          sx={{ marginTop: 2 }}
        >
          Add Company
        </Button>
      </Stack>
    </PopupContainer>
  );
});

export default StreetInfoPopup;
