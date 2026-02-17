/**
 * Immutable value object representing a Vehicle Identification Number.
 *
 * Accepts either a full 17-character VIN or the last 6 characters.
 * Throws on construction if the VIN is invalid.
 */
export class Vin {
  public readonly full: string;
  public readonly short: string;
  public readonly isFullVin: boolean;

  private constructor(vin: string) {
    this.full = vin;
    this.isFullVin = vin.length === 17;
    this.short = vin.slice(-6);
  }

  /**
   * Create a Vin from a raw string. Normalises to uppercase and trims whitespace.
   * @throws Error if the VIN length is not 17 or 6 characters.
   */
  static create(raw: string): Vin {
    const normalised = raw.toUpperCase().trim();

    if (!normalised) {
      throw new Error("VIN is required.");
    }
    if (normalised.length !== 17 && normalised.length !== 6) {
      throw new Error(
        "VIN must be 17 characters (full) or 6 characters (last 6 digits).",
      );
    }

    return new Vin(normalised);
  }

  equals(other: Vin): boolean {
    return this.full === other.full;
  }

  toString(): string {
    return this.full;
  }
}
