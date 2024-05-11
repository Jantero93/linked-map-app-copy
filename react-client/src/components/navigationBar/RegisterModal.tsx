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

const RegisterModal = ({ isOpen, handleModalOpen }: Props) => {
  const closeDialog = () => handleModalOpen(false);

  return (
    <Dialog open={isOpen} onClose={closeDialog}>
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
        <DialogContentText>Registration form goes here.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button onClick={() => console.log("register button clicked")}>
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterModal;
