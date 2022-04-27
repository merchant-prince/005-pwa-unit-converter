export interface Unit {
  name: string;
  fromCurrentUnitToBaseUnit: (currentUnitValue: number) => number;
  fromBaseUnitToCurrentUnit: (baseUnitValue: number) => number;
}

export const units: Readonly<Record<string, Unit[]>> = Object.freeze({
  length: [
    {
      name: "centimeter",
      fromCurrentUnitToBaseUnit: (cm: number) => cm / 100, // convert from current unit to base unit
      fromBaseUnitToCurrentUnit: (m: number) => m * 100, // convert from base unit to current unit
    },
    {
      // base unit for conversion
      name: "meter",
      fromCurrentUnitToBaseUnit: (m: number) => m,
      fromBaseUnitToCurrentUnit: (m: number) => m,
    },
    {
      name: "kilometer",
      fromCurrentUnitToBaseUnit: (km: number) => km * 1_000,
      fromBaseUnitToCurrentUnit: (m: number) => m / 1_000,
    },
  ],
  area: [
    {
      name: "square centimeter",
      fromCurrentUnitToBaseUnit: (sqcm: number) => sqcm / 10_000,
      fromBaseUnitToCurrentUnit: (sqm: number) => sqm * 10_000,
    },
    {
      // base unit for conversion
      name: "square meter",
      fromCurrentUnitToBaseUnit: (sqm: number) => sqm,
      fromBaseUnitToCurrentUnit: (sqm: number) => sqm,
    },
    {
      name: "square kilometer",
      fromCurrentUnitToBaseUnit: (sqkm: number) => sqkm * 1_000_000,
      fromBaseUnitToCurrentUnit: (sqm: number) => sqm / 1_000_000,
    },
  ],
  volume: [
    {
      name: "cubic centimeter",
      fromCurrentUnitToBaseUnit: (cucm: number) => cucm / 1_000_000,
      fromBaseUnitToCurrentUnit: (cum: number) => cum * 1_000_000,
    },
    {
      // base unit for conversion
      name: "cubic meter",
      fromCurrentUnitToBaseUnit: (cum: number) => cum,
      fromBaseUnitToCurrentUnit: (cum: number) => cum,
    },
    {
      name: "cubic kilometer",
      fromCurrentUnitToBaseUnit: (cukm: number) => cukm * 1_000_000_000,
      fromBaseUnitToCurrentUnit: (cum: number) => cum / 1_000_000_000,
    },
  ],
  temperature: [
    {
      // base unit for conversion
      name: "celsius",
      fromCurrentUnitToBaseUnit: (c: number) => c,
      fromBaseUnitToCurrentUnit: (c: number) => c,
    },
    {
      name: "fahrenheit",
      fromCurrentUnitToBaseUnit: (f: number) => (f - 32) * (5 / 9),
      fromBaseUnitToCurrentUnit: (c: number) => c * (9 / 5) + 32,
    },
    {
      name: "kelvin",
      fromCurrentUnitToBaseUnit: (k: number) => k - 273.15,
      fromBaseUnitToCurrentUnit: (c: number) => c + 273.15,
    },
  ],
  weight: [
    {
      name: "milligram",
      fromCurrentUnitToBaseUnit: (mg: number) => mg / 1_000,
      fromBaseUnitToCurrentUnit: (g: number) => g * 1_000,
    },
    {
      // base unit for conversion
      name: "gram",
      fromCurrentUnitToBaseUnit: (g: number) => g,
      fromBaseUnitToCurrentUnit: (g: number) => g,
    },
    {
      name: "kilogram",
      fromCurrentUnitToBaseUnit: (kg: number) => kg * 1_000,
      fromBaseUnitToCurrentUnit: (g: number) => g / 1_000,
    },
  ],
  time: [
    {
      // base unit for conversion
      name: "second",
      fromCurrentUnitToBaseUnit: (s: number) => s,
      fromBaseUnitToCurrentUnit: (s: number) => s,
    },
    {
      name: "minute",
      fromCurrentUnitToBaseUnit: (m: number) => m * 60,
      fromBaseUnitToCurrentUnit: (s: number) => s / 60,
    },
    {
      name: "hour",
      fromCurrentUnitToBaseUnit: (h: number) => h * 3600,
      fromBaseUnitToCurrentUnit: (s: number) => s / 3600,
    },
  ],
});
