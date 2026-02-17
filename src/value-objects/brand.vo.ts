import { BRAND_IDS, type BrandId } from "@/types";

/** Maps known VIN prefixes to brand identifiers */
const VIN_PREFIX_TO_BRAND: Record<string, BrandId> = {
  SAJ: "JAG",
  SAL: "LR",
};

/** Human-readable labels for each brand */
const BRAND_LABELS: Record<BrandId, string> = {
  JAG: "Jaguar",
  LR: "Land Rover",
};

/**
 * Immutable value object representing a vehicle brand.
 *
 * Can be created either from a VIN (auto-detection) or from a known BrandId.
 */
export class Brand {
  private constructor(public readonly value: BrandId) {}

  /** Create a Brand from a known BrandId string. Throws if invalid. */
  static fromId(id: string): Brand {
    if (!BRAND_IDS.includes(id as BrandId)) {
      throw new Error(`Identifiant de marque inconnu : "${id}"`);
    }
    return new Brand(id as BrandId);
  }

  /** Attempt to detect the brand from a full 17-character VIN. Returns null if unrecognised. */
  static fromVin(vin: string): Brand | null {
    const prefix = vin.slice(0, 3).toUpperCase();
    const brandId = VIN_PREFIX_TO_BRAND[prefix];
    return brandId ? new Brand(brandId) : null;
  }

  /** Returns all available brands as `{ id, label }` entries. */
  static all(): { id: BrandId; label: string }[] {
    return BRAND_IDS.map((id) => ({ id, label: BRAND_LABELS[id] }));
  }

  get label(): string {
    return BRAND_LABELS[this.value];
  }

  equals(other: Brand): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
