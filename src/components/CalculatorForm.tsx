"use client";

import { useState, useSyncExternalStore } from "react";
import type { AccessOptionCode, BrandId, SddEngineerCodeResult } from "@/types";
import { Brand } from "@/value-objects/brand.vo";
import { getAccessOptionsForBrand } from "@/lib/access-options";
import { createSddEngineerCode } from "@/lib/create-sdd-engineer-code";
import { ResultDisplay } from "@/components/ResultDisplay";
import { FormTextInput, FormSelect } from "@/components/form";

export function CalculatorForm() {
  const brands = Brand.all();

  const [vin, setVin] = useState("");
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

  const brandOptions = brands.map((b) => ({
    value: b.id,
    label: b.label,
  }));

  const accessOptionsList = accessOptions.map((opt) => ({
    value: opt.code,
    label: `${opt.code} — ${opt.label}`,
  }));

  function handleVinChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.toUpperCase().trim();
    setVin(value);

    // Auto-detect brand from full VIN (17 chars)
    if (value.length === 17) {
      const detectedBrand = Brand.fromVin(value);
      if (detectedBrand) {
        setSelectedBrand(detectedBrand.value);
      }
    }
  }

  // Check if brand is auto-detected from a full VIN
  const isBrandAutoDetected = vin.length === 17 && Brand.fromVin(vin) !== null;

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
        Obtenir le code ingénieur SDD
      </h2>

      <FormTextInput
        id="vin"
        name="vin"
        label="VIN"
        placeholder="17 caractères du VIN ou les 6 derniers"
        required
        value={vin}
        onChange={handleVinChange}
      />

      <FormTextInput
        id="seed"
        name="seed"
        label="Seed"
        placeholder="Seed de 10 caractères"
        maxLength={10}
        required
      />

      <div className="space-y-1">
        <FormSelect
          id="marque"
          name="marque"
          label="Marque"
          options={brandOptions}
          placeholder="Sélectionnez une marque"
          required
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value as BrandId)}
          disabled={mounted && isBrandAutoDetected}
        />
        {isBrandAutoDetected && (
          <p className="text-sm text-base-content/70 pl-1">
            Marque détectée automatiquement à partir du VIN
          </p>
        )}
      </div>

      <FormSelect
        id="options"
        name="options"
        label="Option d'accès"
        options={accessOptionsList}
        placeholder={
          accessOptions.length === 0
            ? "Sélectionnez d'abord une marque"
            : "Sélectionnez une option"
        }
        required
        defaultValue=""
        disabled={mounted && accessOptions.length === 0}
      />

      <button
        type="submit"
        className="btn btn-primary w-full text-base h-12 mt-4"
      >
        Calculer le code
      </button>

      <ResultDisplay result={result} error={error} />
    </form>
  );
}
