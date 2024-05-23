import { GEOCODING_API_KEY } from "@/utilities/env";
import { get } from "@/utilities/fetch/genericFetch";
import { OpenCageReverseGeocodingRes } from "@/services/GeocodingTypes";

const LON_PLACEHOLDER = "<LONGITUDE>";
const LAT_PLACEHOLDER = "<LATITUDE>";
const API_KEY_PLACEHOLDER = "<API_KEY>";
const REVERSE_GEOCODING_URL = `https://api.opencagedata.com/geocode/v1/json?q=${LAT_PLACEHOLDER}%2C${LON_PLACEHOLDER}&key=${API_KEY_PLACEHOLDER}`;

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
const getStreetNameFromLonLat = async (
  longitude: number,
  latitude: number
): Promise<string> => {
  const reqUrl = generateGeocodingUrl(longitude, latitude);
  const reverseGeocodingRes = await get<OpenCageReverseGeocodingRes>(reqUrl);

  if (reverseGeocodingRes.status.code !== 200) {
    return "Map locating failed";
  }

  const result = reverseGeocodingRes.results[0];

  if (!result) {
    return "Map locating failed";
  }

  const { road, house_number, city, postcode, suburb } = result.components;
  const values = { road, house_number, city, postcode, suburb };

  const allValuesUndefined = Object.values(values).every(
    (value) => value === undefined
  );

  if (allValuesUndefined) {
    return "Map locating failed";
  }

  const definedValues = Object.values(values).filter(
    (value) => value !== undefined
  );

  if (definedValues.length === 1) {
    return definedValues[0] as string;
  }

  const addressParts = [
    road && house_number ? `${road} ${house_number}` : road,
    suburb,
    city,
    postcode,
  ];

  const formattedAddress = addressParts
    .filter((part) => part !== undefined)
    .join(", ");

  return formattedAddress || "Map locating failed";
};

const GeocodingService = {
  getStreetNameFromLonLat,
};

export default GeocodingService;
