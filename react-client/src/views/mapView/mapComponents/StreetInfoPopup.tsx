import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Button, Card, IconButton, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHooks";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { setControlViewComponent } from "@/store/slices/generalUiSlice";

const PopupContainer = styled(Card)(({ theme }) => ({
  position: "absolute",
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  whiteSpace: "nowrap",
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(1), // Add margin to the left
}));

export interface StreetInfoPopupHandle {
  show: () => void;
  hide: () => void;
}

const StreetInfoPopup = forwardRef<StreetInfoPopupHandle>((_props, ref) => {
  const { streetAddress, streetNumber, city, postalCode } = useAppSelector(
    (s) => s.uiMap
  );

  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);

  const setAddCompanyToControlPanel = () =>
    dispatch(setControlViewComponent("AddCompany"));

  useImperativeHandle(ref, () => ({
    show: () => setVisible(true),
    hide: () => setVisible(false),
  }));

  if (!visible) return null;

  return (
    <PopupContainer ref={innerRef} variant="elevation" elevation={2}>
      <Stack direction="row" alignItems="center">
        <Typography variant="body1" sx={{ flex: 1 }}>
          {streetAddress} {streetNumber}
        </Typography>
        <CloseButton onClick={() => setVisible(false)}>
          <CloseIcon />
        </CloseButton>
      </Stack>
      <Typography variant="body1">{postalCode}</Typography>
      <Typography variant="body1">{city}</Typography>
      <Button
        size="small"
        color="success"
        startIcon={<AddIcon />}
        onClick={setAddCompanyToControlPanel}
        sx={{ marginTop: "1rem" }}
      >
        Add Company
      </Button>
    </PopupContainer>
  );
});

export default StreetInfoPopup;
