import { LocationDto } from "@/utilities/models/LocationDto";

export interface CompanyDto {
  id: string;
  companyName: string;
  establishmentDate: Date;
  closureDate?: Date;
  location: LocationDto;
}
