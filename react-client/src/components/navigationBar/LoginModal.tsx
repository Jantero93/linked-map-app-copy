import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface Props {
  isOpen: boolean;
  handleModalOpen: (open: boolean) => void;
}

const LoginModal = ({ isOpen, handleModalOpen }: Props) => {
  const closeDialog = () => handleModalOpen(false);

  return (
    <Dialog open={isOpen} onClose={closeDialog}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <DialogContentText>Login form goes here.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button onClick={() => console.log("login button clicked")}>
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
