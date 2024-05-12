import Snackbar from "@mui/material/Snackbar";
import { Slide, SlideProps } from "@mui/material";
import { clearSnackbar, getSnackbarState } from "@/store/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHooks";

// Info: Extract on own component if more use cases than Snackbar
const SlideTransition = (props: SlideProps) => (
  <Slide {...props} direction="up" />
);

const CommonSnackBar = () => {
  const dispatch = useAppDispatch();
  const { snackbarMessage, snackbarOpen } = useAppSelector(getSnackbarState);

  const handleClose = () => dispatch(clearSnackbar());

  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={4000}
      onClose={handleClose}
      message={snackbarMessage}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      TransitionComponent={SlideTransition}
    />
  );
};

export default CommonSnackBar;
