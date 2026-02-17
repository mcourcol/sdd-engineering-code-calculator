"use client";

import { useState, useSyncExternalStore } from "react";
import type { AccessOptionCode, BrandId, SddEngineerCodeResult } from "@/types";
import { Brand } from "@/value-objects/brand.vo";
import { getAccessOptionsForBrand } from "@/lib/access-options";
import { createSddEngineerCode } from "@/lib/create-sdd-engineer-code";
import { ResultDisplay } from "@/components/ResultDisplay";

export function CalculatorForm() {
  const brands = Brand.all();

  const [selectedBrand, setSelectedBrand] = useState<BrandId | "">("");
  const [result, setResult] = useState<SddEngineerCodeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // This ensures the 'mounted' variable is false during SSR and true on the client after hydration.
  // It prevents hydration mismatches for attributes like 'disabled' that depend on client-only state.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const accessOptions =
    selectedBrand !== "" ? getAccessOptionsForBrand(selectedBrand) : [];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setResult(null);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const vin = formData.get("vin") as string;
    const seed = formData.get("seed") as string;
    const brand = formData.get("marque") as BrandId;
    const accessOption = formData.get("options") as AccessOptionCode;

    const outcome = createSddEngineerCode(seed, vin, brand, accessOption);

    if (outcome.success) {
      setResult(outcome.data);
    } else {
      setError(outcome.error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card bg-base-200 shadow-xl p-8 w-full max-w-2xl space-y-6"
    >
      <h2 className="text-2xl font-bold text-center">
        Générer un code d&apos;accès
      </h2>

      <fieldset className="fieldset space-y-2">
        <label className="fieldset-label text-base font-semibold" htmlFor="vin">
          VIN
        </label>
        <input
          type="text"
          id="vin"
          name="vin"
          className="input input-bordered w-full text-base h-12"
          placeholder="17 caractères du VIN ou les 6 derniers"
          required
        />
      </fieldset>

      <fieldset className="fieldset space-y-2">
        <label
          className="fieldset-label text-base font-semibold"
          htmlFor="seed"
        >
          Seed
        </label>
        <input
          type="text"
          id="seed"
          name="seed"
          className="input input-bordered w-full text-base h-12"
          placeholder="Seed de 10 caractères"
          maxLength={10}
          required
        />
      </fieldset>

      <fieldset className="fieldset space-y-2">
        <label
          className="fieldset-label text-base font-semibold"
          htmlFor="marque"
        >
          Marque
        </label>
        <select
          id="marque"
          name="marque"
          className="select select-bordered w-full text-base h-12"
          required
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value as BrandId)}
        >
          <option value="" disabled>
            Sélectionnez une marque
          </option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>
              {b.label}
            </option>
          ))}
        </select>
      </fieldset>

      <fieldset className="fieldset space-y-2">
        <label
          className="fieldset-label text-base font-semibold"
          htmlFor="options"
        >
          Option d&apos;accès
        </label>
        <select
          id="options"
          name="options"
          className="select select-bordered w-full text-base h-12"
          required
          defaultValue=""
          disabled={mounted && accessOptions.length === 0 ? true : undefined}
        >
          <option value="" disabled>
            {accessOptions.length === 0
              ? "Sélectionnez d'abord une marque"
              : "Sélectionnez une option"}
          </option>
          {accessOptions.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.code} — {opt.label}
            </option>
          ))}
        </select>
      </fieldset>

      <button
        type="submit"
        className="btn btn-primary w-full text-base h-12 mt-4"
      >
        Calculer
      </button>

      <ResultDisplay result={result} error={error} />
    </form>
  );
}
