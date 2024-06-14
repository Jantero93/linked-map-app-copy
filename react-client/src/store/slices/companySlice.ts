import { createSlice } from "@reduxjs/toolkit";
import { getAllCompanies } from "@/store/actions/companyActions";
import { CompanyDto } from "@/utilities/models/CompanyDto";

type CompaniesState = {
  loading: boolean;
  error: string | null;
  companies: CompanyDto[];
};

const initialState: CompaniesState = {
  loading: false,
  error: null,
  companies: [],
};

const authSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCompanies.pending, (state) => {
      state.companies = [];
      state.error = null;
      state.loading = true;
    });
    builder.addCase(getAllCompanies.rejected, (state, action) => {
      state.companies = [];
      state.error = action.error.message ?? "Could not get all companies";
      state.loading = false;
    });
    builder.addCase(getAllCompanies.fulfilled, (state, action) => {
      state.companies = action.payload;
      state.error = null;
      state.loading = false;
    });
  },
});

export default authSlice.reducer;
