export interface LocationDto {
  id: string;
  longitude: number;
  latitude: number;
  street: string;
  roadNumber: string;
  suburb?: string;
  city?: string;
  postalCode?: string;
}
