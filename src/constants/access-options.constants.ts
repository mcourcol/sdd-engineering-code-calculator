import type { AccessOption, AccessOptionCode, BrandId } from "@/types";

/** Access options available for Jaguar vehicles */
const JAGUAR_ACCESS_OPTIONS: Record<AccessOptionCode, string> = {
  CA: "X150_ODO_APP",
  CL: "VIN_BLOCK_EDITOR",
  CP: "VIN_BYPASS",
  CR: "CCF_EDITOR",
  AC: "X351_ODO_APP",
  LC: "SOFTWARE_DOWNLOAD",
  PC: "X250_ODO_APP",
  RC: "X351_RECOVER_KEYS",
};

/** Access options available for Land Rover vehicles */
const LANDROVER_ACCESS_OPTIONS: Record<AccessOptionCode, string> = {
  CA: "TAIWAN_VEHICLE_UPDATE",
  CL: "L316_ODO_APP",
  CP: "CCF_EDITOR",
  CR: "SOFTWARE_DOWNLOAD",
  AC: "L322_ERASE_KEYS",
  LC: "L322_RECOVER_KEYS",
  PC: "L322_ODO_APP",
  RC: "OPTION_8",
};

/** Map of brand-specific access options */
const ACCESS_OPTIONS_BY_BRAND: Record<
  BrandId,
  Record<AccessOptionCode, string>
> = {
  JAG: JAGUAR_ACCESS_OPTIONS,
  LR: LANDROVER_ACCESS_OPTIONS,
};

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
