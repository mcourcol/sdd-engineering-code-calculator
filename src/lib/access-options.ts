import type { AccessOption, AccessOptionCode, BrandId } from "@/types";
import { ACCESS_OPTIONS_BY_BRAND } from "@/constants/access-options.constants";

/**
 * Returns the list of access options for a given brand.
 */
export function getAccessOptionsForBrand(brand: BrandId): AccessOption[] {
  const options = ACCESS_OPTIONS_BY_BRAND[brand];
  return Object.entries(options).map(([code, label]) => ({
    code: code as AccessOptionCode,
    label,
  }));
}

/**
 * Checks whether the given access option code is valid for the specified brand.
 */
export function isValidAccessOption(
  code: string,
  brand: BrandId,
): code is AccessOptionCode {
  return code in ACCESS_OPTIONS_BY_BRAND[brand];
}
