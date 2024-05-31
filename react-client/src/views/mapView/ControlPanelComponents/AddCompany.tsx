import { useAppSelector } from "@/hooks/useStoreHooks";
import { getCurrentDates } from "@/utilities/dateHelpers";
import { Box, Button, TextField, TextFieldProps, styled } from "@mui/material";
import { Field, Form } from "react-final-form";

const StyledTextField = styled(({ ...otherProps }: TextFieldProps) => (
  <TextField {...otherProps} variant="filled" />
))(({ theme }) => ({
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

const FormContainer = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(5),
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
};

type FormValues = Record<keyof typeof fieldsConfiguration, string | undefined>;

const AddCompany = () => {
  const { streetAddress, streetNumber } = useAppSelector((s) => s.uiMap);

  const onSubmit = (values: unknown) => {
    // eslint-disable-next-line no-console
    console.log("values", values);
  };

  const initializedFormValues = {
    streetAddress,
    streetNumber,
  };

  if (!streetAddress || !streetNumber) return null;

  return (
    <Box>
      <Form
        onSubmit={onSubmit}
        initialValues={initializedFormValues}
        render={({ handleSubmit, hasSubmitErrors }) => (
          <FormContainer onSubmit={handleSubmit}>
            {Object.keys(fieldsConfiguration).map((fieldName) => (
              <Field
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
              </Field>
            ))}
            <Button type="submit" color="primary" disabled={hasSubmitErrors}>
              Submit
            </Button>
          </FormContainer>
        )}
      />
    </Box>
  );
};

export default AddCompany;
