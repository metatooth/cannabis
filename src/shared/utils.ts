/**
 * Convert Celius to Fahrenheit.
 * @param {number} T temperature in Kelvin
 * @return {number} temperature in Celsius
 */
export function celsius2kelvin(T: number) {
  return T + 271.15;
}

/**
 * Convert Celius to Fahrenheit.
 * @param {number} T temperature in Celsius
 * @return {number} temperature in Fahrenheit
 */
export function celsius2fahrenheit(T: number) {
  return (T * 9) / 5 + 32;
}

/**
 * Convert Fahrenheit to Celius.
 * @param {number} T temperature in Fahrenheit
 * @return {number} temperature in Celsius
 */
export function fahrenheit2celsius(T: number) {
  return ((T - 32) * 5) / 9;
}

/**
 * Convert Kelvin to Celius.
 * @param {number} T temperature in Kelvin
 * @return {number} temperature in Celsius
 */
export function kelvin2celsius(T: number) {
  return T - 271.15;
}

/**
 * Calculates saturated vapor pressure
 * @param {number} T temperature in Celsius
 * @return {number} vapor pressure in pascals
 */
export function saturatedVaporPressure(T: number): number {
  return 610.7 * Math.pow(10, (7.5 * T) / (T + 237.3));
}

/**
 * Calculates relative humidity for given vapor pressure deficit and temperature
 * @param {number} VP vapor pressure in pascals
 * @param {number} T temperature in Celsius
 * @return {number} relative humidity as a ratio
 */
export function relativeHumidity(VP: number, T: number): number {
  return VP / saturatedVaporPressure(T);
}

/**
 * Calculates vapor pressure air for temp & RH
 * @param {number} T temperature in Celsius
 * @param {number} RH relative humidity
 * @return {number} vapor pressure in pascals
 */
export function vaporPressureAir(T: number, RH: number): number {
  return RH * saturatedVaporPressure(T);
}

/**
 * Calculates vapor pressure deficit for leaf temp, air temp, and
 * relative humidity
 * @param {number} A air temperature in Celsius
 * @param {number} D on leaf temperature difference in Celsius
 * @param {number} RH relative humidity
 * @return {number} vapor pressure deficit in pascals
 */
export function vaporPressureDeficit(A: number, D: number, RH: number): number {
  return saturatedVaporPressure(A - D) - vaporPressureAir(A, RH);
}
