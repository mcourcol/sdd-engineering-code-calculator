import type { AccessOptionCode, BrandId } from "@/types";

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
export const ACCESS_OPTIONS_BY_BRAND: Record<
  BrandId,
  Record<AccessOptionCode, string>
> = {
  JAG: JAGUAR_ACCESS_OPTIONS,
  LR: LANDROVER_ACCESS_OPTIONS,
};
