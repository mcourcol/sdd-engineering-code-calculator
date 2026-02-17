import type {
  AccessOptionCode,
  BrandId,
  Result,
  SddEngineerCodeResult,
} from "@/types";
import {
  BASE_CIPHER_KEY,
  PASSWORD_CIPHER_VALUES,
  SEED_CIPHER_VALUES,
} from "@/constants/cipher.constants";
import { buildCipherMap } from "@/lib/cipher-map";
import { generatePassword } from "@/lib/generate-password";
import { Brand } from "@/value-objects/brand.vo";
import { Seed } from "@/value-objects/seed.vo";
import { Vin } from "@/value-objects/vin.vo";

/**
 * Resolves the effective brand: if the VIN is full (17 chars) and matches
 * a known prefix the detected brand takes precedence; otherwise falls back
 * to the brand selected by the user.
 */
function resolveBrand(vin: Vin, selectedBrand: BrandId): Brand {
  if (vin.isFullVin) {
    const detected = Brand.fromVin(vin.full);
    if (detected) return detected;
  }
  return Brand.fromId(selectedBrand);
}

/**
 * Top-level entry point for SDD engineer code generation.
 *
 * Pure function — no side effects, easy to test.
 *
 * @param rawSeed          The 10-character seed displayed by SDD.
 * @param rawVin           The vehicle VIN (17 full or last 6 characters).
 * @param selectedBrand    The brand selected by the user (JAG | LR).
 * @param accessOptionCode The 2-character access option code.
 * @returns A `Result<SddEngineerCodeResult>` — either `{ success, data }` or `{ success, error }`.
 */
export function createSddEngineerCode(
  rawSeed: string,
  rawVin: string,
  selectedBrand: BrandId,
  accessOptionCode: AccessOptionCode,
): Result<SddEngineerCodeResult> {
  try {
    // 1. Validate & normalise inputs via value objects
    const vin = Vin.create(rawVin);
    const brand = resolveBrand(vin, selectedBrand);

    // 2. Build cipher maps
    const seedCipherMap = buildCipherMap(SEED_CIPHER_VALUES, BASE_CIPHER_KEY);
    const passwordCipherMap = buildCipherMap(
      SEED_CIPHER_VALUES,
      PASSWORD_CIPHER_VALUES,
    );

    // 3. Decode & validate the seed against the VIN
    const seed = Seed.create(rawSeed, seedCipherMap, vin.short);

    // 4. Generate the engineer password
    const password = generatePassword(
      seed.value,
      passwordCipherMap,
      brand.value,
      accessOptionCode,
    );

    return {
      success: true,
      data: {
        password,
        brand: brand.value,
        seedTime: seed.decodedTime,
        seedVin: seed.decodedVin,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
