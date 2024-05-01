type Coordinates = {
  longitude: number;
  latitude: number;
};

const CityCoordinates = {
  tampere: { longitude: 23.7871, latitude: 61.4761 },
  helsinki: { longitude: 24.9384, latitude: 60.1699 }
} as const;

/**
 * Return latitude and longitude of the city (precision four decimals)
 * @param city City name
 * @returns {Coordinates} Coordinates of the city
 */
export const getCityCoordinates = (
  city: keyof typeof CityCoordinates
): Coordinates => CityCoordinates[city];
