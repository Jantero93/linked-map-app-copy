import {
  TextField,
  DialogActions,
  Button,
  TextFieldProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Form as FinalForm, Field as FinalField } from "react-final-form";
import CommonDialog from "../CommonDialog";
import { getCurrentDates } from "@/utilities/dateHelpers";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  streetAddress: string;
  streetNumber: string;
};

const StyledTextField = styled(({ ...otherProps }: TextFieldProps) => (
  <TextField {...otherProps} fullWidth variant="outlined" />
))(({ theme }) => ({
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

interface FieldConfig {
  label: string;
  type: string;
  readOnly?: boolean;
  helperText?: string;
  validate?: (
    value: string,
    allValues: Partial<FormValues>
  ) => string | undefined;
}

const fieldsConfiguration: Record<string, FieldConfig> = {
  streetAddress: {
    label: "Street Address",
    type: "text",
    readOnly: true,
  },
  streetNumber: {
    label: "Street number",
    type: "text",
    readOnly: true,
  },
  companyName: {
    label: "Company Name",
    type: "text",
    validate: (value: string) =>
      value.trim() ? undefined : "Company name is required field",
  },
  establishmentDate: {
    label: "Establishment Year",
    type: "text",
    validate: (value: string) => {
      if (!Number.isInteger(value)) return "Only numbers are allowed";
      if (Number(value) < 0) return "Year can not be negative";
      if (Number(value) <= getCurrentDates("year")) {
        return "Year can not be on future";
      }

      return undefined;
    },
  },
  closureYear: {
    label: "Closure Year",
    type: "text",
    validate: (value, allValues) =>
      Number(value) >= Number(allValues.establishmentDate)
        ? undefined
        : "Closure Year can not earlier than established year",
  },
};

type FormValues = Record<keyof typeof fieldsConfiguration, string | undefined>;

const AddCompanyModal = ({
  onClose,
  isOpen,
  streetAddress,
  streetNumber,
}: Props) => {
  const onSubmit = (values: unknown) => {
    // eslint-disable-next-line no-console
    console.log("values", values);
  };

  const initializedFormValues = {
    streetAddress,
    streetNumber,
  };

  return (
    <CommonDialog open={isOpen} onClose={onClose} title="Add new company">
      <FinalForm
        onSubmit={onSubmit}
        initialValues={initializedFormValues}
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
                    disabled={fieldsConfiguration[fieldName].readOnly}
                    helperText={
                      meta.touched && meta.error
                        ? meta.error
                        : fieldsConfiguration[fieldName].helperText ?? null
                    }
                  />
                )}
              </FinalField>
            ))}
            <DialogActions>
              <Button onClick={onClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary" disabled={hasSubmitErrors}>
                Submit
              </Button>
            </DialogActions>
          </form>
        )}
      />
    </CommonDialog>
  );
};

export default AddCompanyModal;
