import type { AccessOptionCode, BrandId } from "@/types";
import { isValidAccessOption } from "@/lib/access-options";

/**
 * Order in which seed characters are picked to build the 10-char password body.
 *
 *   password[0] = seed[5]  (time tens-of-minutes)
 *   password[1] = seed[3]  (time units-of-hours)
 *   password[2] = seed[0]  (vin 100k digit)
 *   password[3] = seed[6]  (vin tens digit)
 *   password[4] = seed[9]  (vin 10k digit)
 *   password[5] = seed[1]  (time tens-of-hours)
 *   password[6] = seed[7]  (time units-of-minutes)
 *   password[7] = seed[8]  (vin units digit)
 *   password[8] = seed[2]  (vin thousands digit)
 *   password[9] = seed[4]  (vin hundreds digit)
 */
const SEED_PICK_ORDER = [5, 3, 0, 6, 9, 1, 7, 8, 2, 4] as const;

const PADDING = "CC";

/**
 * Generates the SDD engineer password from a seed, a password cipher map,
 * and the selected access option.
 *
 * The password body is produced by picking seed characters in a specific order
 * and mapping each one through the cipher, then appending the access-option
 * code with a "CC" padding (position depends on brand).
 *
 * Final format (14 characters):
 *   JAG → password_10 + accessOption + "CC"
 *   LR  → password_10 + "CC" + accessOption
 *
 * @param seed              The 10-character seed.
 * @param passwordCipherMap Cipher map (seed chars → password chars).
 * @param brand             The vehicle brand.
 * @param accessOptionCode  The selected access option code.
 * @returns The 14-character engineer password.
 * @throws Error if the access option is invalid for the brand.
 */
export function generatePassword(
  seed: string,
  passwordCipherMap: ReadonlyMap<string, string>,
  brand: BrandId,
  accessOptionCode: AccessOptionCode,
): string {
  if (!isValidAccessOption(accessOptionCode, brand)) {
    throw new Error(
      `Access option "${accessOptionCode}" is not valid for brand "${brand}".`,
    );
  }

  // Build the 10-char password body using the specific pick order
  const passwordBody = SEED_PICK_ORDER.map((idx) => {
    const mapped = passwordCipherMap.get(seed[idx]);
    if (mapped === undefined) {
      throw new Error(`Character "${seed[idx]}" not found in cipher map.`);
    }
    return mapped;
  }).join("");

  // Append access option + padding in brand-specific order
  if (brand === "JAG") {
    return `${passwordBody}${accessOptionCode}${PADDING}`;
  }
  return `${passwordBody}${PADDING}${accessOptionCode}`;
}
