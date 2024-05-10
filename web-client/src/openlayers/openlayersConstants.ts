import { Coordinate } from 'ol/coordinate';

const CityCoordinates = {
  Tampere: [23.7871, 61.4761],
  Helsinki: [24.9384, 60.1699]
} as const;

/**
 * Return latitude and longitude of the city (precision four decimals)
 * @param city City name
 * @returns Coordinates of the city on OpenLayers coordinates format
 */
export const getCityCoordinates = (
  city: keyof typeof CityCoordinates
): Coordinate => CityCoordinates[city] as unknown as Coordinate;
