import { User } from '@src/entities/user';

export const generateColorHash = (country: string) => {
  let hash = 0;
  for (let i = 0; i < country.length; i++) {
    hash = country.charCodeAt(i) + ((hash << 5) - hash);
  }

  const r = (hash & 0xff) | 0x50; // Ensure a minimum value for red
  const g = ((hash >> 8) & 0xff) | 0x50; // Ensure a minimum value for green
  const b = ((hash >> 16) & 0xff) | 0x50; // Ensure a minimum value for blue

  return `rgb(${r},${g},${b})`;
};

export const generateColorsForCountries = (uniqueCountries: string[]) => {
  const opaqueColors = uniqueCountries.map((country) => generateColorHash(country));
  const transparentColors = opaqueColors.map((color) => color.replace('1.0', '0.2'));

  return [opaqueColors, transparentColors];
};

export const countUsersByCountry = (users: User[]): [string[], number[]] => {
  const uniqueCountries: string[] = [];
  const countryCounts: number[] = [];

  users.forEach((user) => {
    const country = user.country;
    const index = uniqueCountries.indexOf(country);

    if (index === -1) {
      uniqueCountries.push(country);
      countryCounts.push(1);
    } else {
      countryCounts[index]++;
    }
  });

  return [uniqueCountries, countryCounts];
};
