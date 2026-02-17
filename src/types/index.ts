/** Discriminated union for operation results */
export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

/** Supported brand identifiers */
export const BRAND_IDS = ["JAG", "LR"] as const;
export type BrandId = (typeof BRAND_IDS)[number];

/** Two-character access option codes used by SDD */
export const ACCESS_OPTION_CODES = [
  "CA",
  "CL",
  "CP",
  "CR",
  "AC",
  "LC",
  "PC",
  "RC",
] as const;
export type AccessOptionCode = (typeof ACCESS_OPTION_CODES)[number];

/** An access option with its code and human-readable label */
export interface AccessOption {
  code: AccessOptionCode;
  label: string;
}

/** Successful result of the SDD engineer code generation */
export interface SddEngineerCodeResult {
  password: string;
  brand: BrandId;
  seedTime: string;
  seedVin: string;
}
