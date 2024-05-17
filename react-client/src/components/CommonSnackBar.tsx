import Snackbar from "@mui/material/Snackbar";
import { Slide, SlideProps } from "@mui/material";
import { clearSnackbar } from "@/store/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHooks";
import { RootState } from "@/store/store";

// Info: Extract on own component if more use cases than Snackbar
const SlideTransition = (props: SlideProps) => (
  <Slide {...props} direction="up" />
);

const CommonSnackBar = () => {
  const dispatch = useAppDispatch();
  const { openSnackbar, snackbarText } = useAppSelector((s: RootState) => s.ui);

  const handleClose = () => dispatch(clearSnackbar());

  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={4000}
      onClose={handleClose}
      message={snackbarText}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      TransitionComponent={SlideTransition}
    />
  );
};

export default CommonSnackBar;
