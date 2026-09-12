import { naturalEarthCountries, type NaturalEarthCountry } from "../data/naturalEarth50m";

const geometryByCode = new Map<string, NaturalEarthCountry>();
for (const country of naturalEarthCountries) {
  if (!geometryByCode.has(country.code)) geometryByCode.set(country.code, country);
}

export const getCountryGeometry = (code: string): NaturalEarthCountry | undefined =>
  geometryByCode.get(code.toUpperCase());

export const getCountryGeometries = (): NaturalEarthCountry[] => naturalEarthCountries;
