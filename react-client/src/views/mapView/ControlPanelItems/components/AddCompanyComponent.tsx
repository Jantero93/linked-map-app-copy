import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHooks";
import {
  AddCompanyRequest,
  postNewCompany,
} from "@/store/actions/companyActions";
import { selectedControllerComponent } from "@/store/slices/generalUiSlice";
import {
  clearLocation,
  selectValidMapLocation,
} from "@/store/slices/uiMapSlice";
import {
  createJsDateFromString,
  isYearSameOrBefore,
} from "@/utilities/dateHelpers";
import {
  Box,
  Button,
  TextField,
  TextFieldProps,
  Typography,
  styled,
} from "@mui/material";
import { useEffect } from "react";
import { Field, Form } from "react-final-form";

const StyledTextField = styled(({ ...otherProps }: TextFieldProps) => (
  <TextField {...otherProps} type="text" variant="filled" />
))(({ theme }) => ({
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

const FormContainer = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(5),
}));

const AddCompany = () => {
  const dispatch = useAppDispatch();

  const mapLocation = useAppSelector(selectValidMapLocation);
  const controllerComponent = useAppSelector(selectedControllerComponent);

  // Clear location selection when component is changed
  useEffect(() => {
    if (controllerComponent !== "AddCompany") {
      dispatch(clearLocation());
    }
    return () => {
      dispatch(clearLocation());
    };
  }, [dispatch, controllerComponent]);

  if (mapLocation === null) {
    return <Typography>Select position from map</Typography>;
  }
  const initializedFormValues = {
    streetAddress: mapLocation.streetAddress,
    streetNumber: mapLocation.streetNumber,
    companyName: undefined,
    establishmentDate: undefined,
  } as const;

  const validate = (
    values: Record<keyof typeof initializedFormValues, string>
  ) => {
    const errors: Partial<Record<keyof typeof initializedFormValues, string>> =
      {};

    if (!values.companyName) {
      errors.companyName = "Company name is required";
    }
    if (!values.establishmentDate) {
      errors.establishmentDate = isYearSameOrBefore(values.establishmentDate)
        ? undefined
        : "Year can not be in the future";

      errors.establishmentDate = Number.isNaN(values.establishmentDate)
        ? "Year must be a number"
        : undefined;
    }

    return errors;
  };

  const onSubmit = (
    formValues: Record<keyof typeof initializedFormValues, string>
  ) => {
    const companyData = {
      ...formValues,
      establishmentDate: createJsDateFromString(
        formValues.establishmentDate.toString(),
        "YYYY"
      ),
    };
    const payload: AddCompanyRequest = {
      ...companyData,
      ...mapLocation,
    };

    dispatch(postNewCompany(payload));
  };

  return (
    <Box>
      <Form
        onSubmit={onSubmit}
        initialValues={initializedFormValues}
        validate={validate}
        render={({ handleSubmit, hasSubmitErrors }) => (
          <FormContainer onSubmit={handleSubmit}>
            <Field
              name="streetAddress"
              initialValue={mapLocation.streetAddress}
            >
              {({ input }) => (
                <StyledTextField {...input} label="Street Address" disabled />
              )}
            </Field>
            <Field name="streetNumber" initialValue={mapLocation.streetNumber}>
              {({ input }) => (
                <StyledTextField {...input} label="Street Number" disabled />
              )}
            </Field>
            <Field name="companyName">
              {({ input, meta }) => (
                <StyledTextField
                  {...input}
                  label="Company Name"
                  error={meta.touched && !!meta.error}
                  helperText={meta.touched && meta.error}
                />
              )}
            </Field>
            <Field name="establishmentDate">
              {({ input, meta }) => (
                <StyledTextField
                  {...input}
                  label="Establishment Year"
                  error={meta.touched && !!meta.error}
                  helperText={meta.touched && meta.error}
                />
              )}
            </Field>
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
