import Snackbar from "@mui/material/Snackbar";
import { Slide } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { clearSnackbar, getSnackbarState } from "@/store/slices/uiSlice";

// Info: Extract on own component if more use cases than Snackbar
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SlideTransition = (props: any) => <Slide {...props} direction="up" />;

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