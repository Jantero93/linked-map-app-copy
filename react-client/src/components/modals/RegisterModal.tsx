import { Form as FinalForm, Field as FinalField } from "react-final-form";
import { Button, DialogActions, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { registerUser } from "@/store/actions/authActions";
import { useAppDispatch } from "@/hooks/useStoreHooks";
import CommonDialog from "../CommonDialog";

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(2),
  width: "100%",
}));

const FormButton = styled(Button)(({ theme: _theme }) => ({
  width: "100%",
  variant: "contained",
}));

// Define the field and form values
interface FieldConfig {
  label: string;
  type: string;
  helperText?: string;
  validate: (
    value: string,
    allValues: Partial<FormValues>
  ) => string | undefined;
}

// Configuration for the fields
const fieldsConfiguration: Record<string, FieldConfig> = {
  username: {
    label: "Username",
    type: "text",
    helperText: "Minimum 3 characters",
    validate: (value) =>
      value.length >= 3 ? undefined : "Username must be at least 3 characters",
  },
  password: {
    label: "Password",
    type: "password",
    helperText: "Minimum 6 characters",
    validate: (value) =>
      value.length >= 6 ? undefined : "Password must be at least 6 characters",
  },
  confirmPassword: {
    label: "Confirm Password",
    type: "password",
    validate: (value, allValues) =>
      value === allValues.password ? undefined : "Passwords must match",
  },
};

// Infer the FormValues type from the fields configuration
type FormValues = Record<keyof typeof fieldsConfiguration, string>;

// Type for the form errors
interface Props {
  isOpen: boolean;
  handleModalOpen: (open: boolean) => void;
}

const RegisterModal = ({ isOpen, handleModalOpen }: Props) => {
  const dispatch = useAppDispatch();

  const validate = (values: Partial<FormValues>) => {
    const errors: Partial<FormValues> = {};

    for (const fieldName in fieldsConfiguration) {
      const field = fieldsConfiguration[fieldName];
      const value = values[fieldName] ?? "";
      const error = field.validate(value, values);

      if (error) {
        errors[fieldName] = error;
      }
    }

    return errors;
  };

  const closeDialog = () => handleModalOpen(false);

  const onSubmit = async ({ username, password }: FormValues) => {
    await dispatch(registerUser({ username, password }));
    handleModalOpen(false);
  };

  return (
    <CommonDialog open={isOpen} onClose={closeDialog} title="Register new user">
      <FinalForm<FormValues>
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, hasSubmitErrors }) => (
          <form onSubmit={handleSubmit}>
            {Object.keys(fieldsConfiguration).map((fieldName) => (
              <FinalField
                key={fieldName}
                name={fieldName}
                type={fieldsConfiguration[fieldName].type}
              >
                {({ input, meta }) => (
                  <StyledTextField
                    label={fieldsConfiguration[fieldName].label}
                    inputProps={input}
                    type={fieldsConfiguration[fieldName].type}
                    error={meta.touched && meta.error}
                    helperText={
                      meta.touched && meta.error
                        ? meta.error
                        : fieldsConfiguration[fieldName].helperText ?? ""
                    }
                  />
                )}
              </FinalField>
            ))}
            <DialogActions>
              <FormButton
                variant="contained"
                type="submit"
                disabled={hasSubmitErrors}
              >
                Register
              </FormButton>
              <FormButton
                variant="contained"
                color="error"
                onClick={closeDialog}
              >
                Cancel
              </FormButton>
            </DialogActions>
          </form>
        )}
      />
    </CommonDialog>
  );
};

export default RegisterModal;
