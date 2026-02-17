/**
 * Immutable value object representing an SDD session seed.
 *
 * A seed is a 10-character string encoding the last 6 VIN digits and a 24h clock time,
 * mapped through a substitution cipher.
 *
 * Seed character mapping:
 *   [0] vin[0]  – 100-thousand digit   [1] time[0] – tens of hours
 *   [2] vin[2]  – thousand digit        [3] time[1] – units of hours
 *   [4] vin[3]  – hundreds digit        [5] time[2] – tens of minutes
 *   [6] vin[4]  – tens digit            [7] time[3] – units of minutes
 *   [8] vin[5]  – units digit           [9] vin[1]  – 10-thousand digit
 */
export class Seed {
  public readonly value: string;
  public readonly decodedVin: string;
  public readonly decodedTime: string;

  private constructor(value: string, decodedVin: string, decodedTime: string) {
    this.value = value;
    this.decodedVin = decodedVin;
    this.decodedTime = decodedTime;
  }

  /**
   * Decode and validate a seed against a 6-character VIN suffix.
   *
   * @param raw            The 10-character seed string.
   * @param seedCipherMap  Map to reverse seed characters to their original values.
   * @param vinSuffix      The last 6 characters of the VIN to validate against.
   * @throws Error if the seed length is wrong, VIN doesn't match, or time is invalid.
   */
  static create(
    raw: string,
    seedCipherMap: ReadonlyMap<string, string>,
    vinSuffix: string,
  ): Seed {
    const normalised = raw.toUpperCase().trim();

    if (normalised.length !== 10) {
      throw new Error("Le seed doit contenir 10 caractères.");
    }
    if (vinSuffix.length !== 6) {
      throw new Error("Le suffixe VIN doit contenir 6 caractères.");
    }

    const chars = normalised.split("");

    const decodedVin = [
      seedCipherMap.get(chars[0]),
      seedCipherMap.get(chars[9]),
      seedCipherMap.get(chars[2]),
      seedCipherMap.get(chars[4]),
      seedCipherMap.get(chars[6]),
      seedCipherMap.get(chars[8]),
    ].join("");

    const decodedTime = [
      seedCipherMap.get(chars[1]),
      seedCipherMap.get(chars[3]),
      seedCipherMap.get(chars[5]),
      seedCipherMap.get(chars[7]),
    ].join("");

    if (decodedVin !== vinSuffix) {
      throw new Error(
        `Le seed ne correspond pas au VIN fourni. Le seed est destiné à un VIN se terminant par : ${decodedVin}`,
      );
    }

    if (!Seed.isValid24HourTime(decodedTime)) {
      throw new Error(
        `Le seed contient une valeur de temps invalide : ${decodedTime}`,
      );
    }

    return new Seed(normalised, decodedVin, decodedTime);
  }

  /** Validate a 4-digit 24-hour time string (HHMM). */
  private static isValid24HourTime(time: string): boolean {
    if (!/^[0-2][0-9][0-5][0-9]$/.test(time)) return false;
    const hour = parseInt(time.slice(0, 2), 10);
    return hour >= 0 && hour <= 23;
  }

  equals(other: Seed): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
