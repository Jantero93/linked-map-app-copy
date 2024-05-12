import React, { useState } from "react";
import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAppDispatch } from "@/store/store";
import { registerUser } from "@/store/actions/authActions";
import { validateInput } from "@/utilities/validators";

import { Nullable } from "@/utilities/commonTypes";

const StyledTextField = styled(({ ...otherProps }: TextFieldProps) => (
  <TextField {...otherProps} fullWidth variant="outlined" required />
))(({ theme }) => ({
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

const FormButton = styled(({ ...otherProps }: ButtonProps) => (
  <Button {...otherProps} variant="contained" fullWidth />
))(({ theme: _theme }) => ({}));

const PaddedForm = styled("form")(({ theme }) => ({
  padding: theme.spacing(1),
}));

interface Props {
  isOpen: boolean;
  handleModalOpen: (open: boolean) => void;
}

const initializedValidationErrors = {
  username: "",
  password: "",
  confirmPassword: "",
};

type FormErrors = Nullable<typeof initializedValidationErrors>;

const RegisterModal = ({ isOpen, handleModalOpen }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>(initializedValidationErrors);

  const dispatch = useAppDispatch();

  const isFormValid = () => {
    const newErrors: FormErrors = {
      username: validateInput(
        username.length >= 3,
        "Username must be at least 3 characters."
      ),
      password: validateInput(
        password.length >= 6,
        "Password must be at least 6 characters."
      ),
      confirmPassword: validateInput(
        password === confirmPassword && confirmPassword.length >= 6,
        "Passwords do not match."
      ),
    };

    setErrors({ ...newErrors });

    return Object.values(newErrors).every((e) => e === null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) return;

    dispatch(registerUser({ username, password }));
  };

  const resetInputs = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setErrors({ ...initializedValidationErrors });
  };

  const closeDialog = () => {
    resetInputs();
    handleModalOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={closeDialog}>
      <PaddedForm onSubmit={handleSubmit}>
        <DialogTitle>Register new user</DialogTitle>
        <DialogContent>
          <StyledTextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!errors.username}
            helperText={errors.username}
          />
          <StyledTextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />
          <StyledTextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
        </DialogContent>
        <DialogActions>
          <FormButton type="submit">Register</FormButton>
          <FormButton color="error" onClick={closeDialog}>
            Cancel
          </FormButton>
        </DialogActions>
      </PaddedForm>
    </Dialog>
  );
};

export default RegisterModal;
