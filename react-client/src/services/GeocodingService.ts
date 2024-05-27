import { GEOCODING_API_KEY } from "@/utilities/env";
import { get } from "@/utilities/fetch/genericFetch";
import { OpenCageReverseGeocodingRes } from "@/services/GeocodingTypes";

const LON_PLACEHOLDER = "<LONGITUDE>";
const LAT_PLACEHOLDER = "<LATITUDE>";
const API_KEY_PLACEHOLDER = "<API_KEY>";
const REVERSE_GEOCODING_URL = `https://api.opencagedata.com/geocode/v1/json?q=${LAT_PLACEHOLDER}%2C${LON_PLACEHOLDER}&key=${API_KEY_PLACEHOLDER}`;

export type ReverseGeocodingRes = {
  streetAddress?: string;
  streetNumber?: string;
  longitude: number;
  latitude: number;
  suburban?: string;
  city?: string;
  postalCode?: string;
};

/**
 * Generates the URL for reverse geocoding
 * @param longitude
 * @param latitude
 * @returns URL with placeholders replaced
 */
const generateGeocodingUrl = (longitude: number, latitude: number): string =>
  REVERSE_GEOCODING_URL.replace(LON_PLACEHOLDER, longitude.toString())
    .replace(LAT_PLACEHOLDER, latitude.toString())
    .replace(API_KEY_PLACEHOLDER, GEOCODING_API_KEY);

/**
 * Get street name from longitude and latitude.
 *
 * Format is [roadName?, roadNumber?, suburb?, city?, postalCode]. If optional part of name is undefined, it will be not returned
 * @param longitude
 * @param latitude
 * @returns Street name with city, depends on what information can be found
 * @example "TestStreet 1, Compton, Los Angeles, 90059"
 * @example "Tutkijankatu, Tampere, 33720"
 * @example "Kaijantie"
 */
const getReverseGeocodingInfoFromPoint = async (
  longitude: number,
  latitude: number
): Promise<ReverseGeocodingRes | null> => {
  const reqUrl = generateGeocodingUrl(longitude, latitude);
  const reverseGeocodingRes = await get<OpenCageReverseGeocodingRes>(reqUrl);

  const { status, results } = reverseGeocodingRes;
  const isInvalidRes = status.code !== 200 || !!results.at(0);

  if (isInvalidRes) {
    return null;
  }

  const result = reverseGeocodingRes.results[0];
  const { road, house_number, city, postcode, suburb } = result.components;
  const { lat, lng } = result.geometry;

  return {
    latitude: lat,
    longitude: lng,
    streetAddress: road,
    streetNumber: house_number,
    city,
    suburban: suburb,
    postalCode: postcode,
  };
};

const GeocodingService = {
  getReverseGeocodingInfoFromPoint,
};

export default GeocodingService;
