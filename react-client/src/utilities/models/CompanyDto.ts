import { LocationDto } from "@/utilities/models/LocationDto";

export interface CompanyDto {
  id: string;
  name: string;
  establishmentDate: Date;
  closureDate?: Date;
  location: LocationDto;
}
