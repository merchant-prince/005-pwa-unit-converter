export interface Unit {
  name: string;
  from: (currentUnitValue: number) => number;
  to: (baseUnitValue: number) => number;
}

export const units: Readonly<Record<string, Unit[]>> = Object.freeze({
  length: [
    {
      name: "centimeter",
      from: (cm: number) => cm / 100, // convert FROM current unit TO base unit
      to: (m: number) => m * 100, // convert FROM base unit TO current unit
    },
    {
      // base unit for conversion
      name: "meter",
      from: (m: number) => m,
      to: (m: number) => m,
    },
    {
      name: "kilometer",
      from: (km: number) => km * 1_000,
      to: (m: number) => m / 1_000,
    },
  ],
  area: [
    {
      name: "square centimeter",
      from: (sqcm: number) => sqcm / 10_000,
      to: (sqm: number) => sqm * 10_000,
    },
    {
      // base unit for conversion
      name: "square meter",
      from: (sqm: number) => sqm,
      to: (sqm: number) => sqm,
    },
    {
      name: "square kilometer",
      from: (sqkm: number) => sqkm * 1_000_000,
      to: (sqm: number) => sqm / 1_000_000,
    },
  ],
  volume: [
    {
      name: "cubic centimeter",
      from: (cucm: number) => cucm / 1_000_000,
      to: (cum: number) => cum * 1_000_000,
    },
    {
      // base unit for conversion
      name: "cubic meter",
      from: (cum: number) => cum,
      to: (cum: number) => cum,
    },
    {
      name: "cubic kilometer",
      from: (cukm: number) => cukm * 1_000_000_000,
      to: (cum: number) => cum / 1_000_000_000,
    },
  ],
  temperature: [
    {
      // base unit for conversion
      name: "celsius",
      from: (c: number) => c,
      to: (c: number) => c,
    },
    {
      name: "fahrenheit",
      from: (f: number) => (f - 32) * (5 / 9),
      to: (c: number) => c * (9 / 5) + 32,
    },
    {
      name: "kelvin",
      from: (k: number) => k - 273.15,
      to: (c: number) => c + 273.15,
    },
  ],
  weight: [
    {
      name: "milligram",
      from: (mg: number) => mg / 1_000,
      to: (g: number) => g * 1_000,
    },
    {
      // base unit for conversion
      name: "gram",
      from: (g: number) => g,
      to: (g: number) => g,
    },
    {
      name: "kilogram",
      from: (kg: number) => kg * 1_000,
      to: (g: number) => g / 1_000,
    },
  ],
  time: [
    {
      // base unit for conversion
      name: "second",
      from: (s: number) => s,
      to: (s: number) => s,
    },
    {
      name: "minute",
      from: (m: number) => m * 60,
      to: (s: number) => s / 60,
    },
    {
      name: "hour",
      from: (h: number) => h * 3600,
      to: (s: number) => s / 3600,
    },
  ],
});
