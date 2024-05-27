import { useState, useEffect, useCallback } from "react";
import { styled } from "@mui/material/styles";
import {
  Button,
  ButtonProps,
  DialogActions,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { validateInput } from "@/utilities/validators";
import { Nullable } from "@/utilities/commonTypes";
import { loginUser } from "@/store/actions/authActions";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHooks";
import CommonDialog from "@/components/CommonDialog";

const StyledTextField = styled(({ ...otherProps }: TextFieldProps) => (
  <TextField {...otherProps} fullWidth variant="outlined" />
))(({ theme }) => ({
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

const FormButton = styled(({ ...otherProps }: ButtonProps) => (
  <Button {...otherProps} fullWidth />
))(({ theme: _theme }) => ({}));

interface Props {
  isOpen: boolean;
  handleModalOpen: (open: boolean) => void;
}

type FormErrors = Nullable<typeof initializedValidationErrors>;

const initializedValidationErrors = {
  username: "",
  password: "",
};

const LoginModal = ({ isOpen, handleModalOpen }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>(initializedValidationErrors);

  const { isLoggedIn: loggedIn } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();

  const resetInputs = useCallback(() => {
    setUsername("");
    setPassword("");
    setErrors({ ...initializedValidationErrors });
  }, []);

  const closeDialog = useCallback(() => {
    resetInputs();
    handleModalOpen(false);
  }, [handleModalOpen, resetInputs]);

  useEffect(() => {
    if (loggedIn) closeDialog();
  }, [loggedIn, closeDialog]);

  const isFormValid = () => {
    const newErrors = {
      password: validateInput(password.length > 0, "Password required"),
      username: validateInput(username.length > 0, "Username required"),
    };

    setErrors({ ...newErrors });

    return Object.values(newErrors).every((e) => e === null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) return;

    dispatch(loginUser({ username, password }));
  };

  return (
    <CommonDialog open={isOpen} onClose={closeDialog} title="Login">
      <form onSubmit={handleSubmit}>
        <StyledTextField
          label="Username"
          value={username}
          error={!!errors.username}
          helperText={errors.username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <StyledTextField
          label="Password"
          type="password"
          value={password}
          error={!!errors.password}
          helperText={errors.password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <DialogActions>
          <FormButton type="submit">Log in</FormButton>
          <FormButton color="error" onClick={closeDialog}>
            Cancel
          </FormButton>
        </DialogActions>
      </form>
    </CommonDialog>
  );
};

export default LoginModal;
