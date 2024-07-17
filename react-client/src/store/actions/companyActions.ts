import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, post } from "@/utilities/fetch/genericFetch";
import { API_URL } from "@/utilities/env";
import { RejectedActionPayload } from "@/store/store";
import { CompanyDto } from "@/utilities/models/CompanyDto";

export type AddCompanyRequest = {
  companyName: string;
  streetAddress: string;
  streetNumber: string;
  establishmentDate: Date;
  longitude: number;
  latitude: number;
  city?: string;
  postalCode?: string;
  suburb?: string;
};
export const postNewCompany = createAsyncThunk(
  "company-addCompany",
  async (req: AddCompanyRequest, { rejectWithValue }) => {
    try {
      return await post<CompanyDto>(`${API_URL}/company/addCompany`, req);
    } catch (e) {
      const rejectedPayload: RejectedActionPayload = {
        errorDescription:
          e instanceof Error ? e.message : "Request could not reach server",
      };

      return rejectWithValue(rejectedPayload);
    }
  }
);

export const getAllCompanies = createAsyncThunk(
  "company-getall",
  async (_, { rejectWithValue }) => {
    try {
      return await get<CompanyDto[]>(`${API_URL}/company/getCompanies`);
    } catch (e) {
      const rejectedPayload: RejectedActionPayload = {
        errorDescription:
          e instanceof Error ? e.message : "Couldn't get all companies",
      };

      return rejectWithValue(rejectedPayload);
    }
  }
);
