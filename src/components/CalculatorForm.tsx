"use client";

import { useState } from "react";
import type { AccessOptionCode, BrandId, SddEngineerCodeResult } from "@/types";
import { Brand } from "@/value-objects/brand.vo";
import { getAccessOptionsForBrand } from "@/constants/access-options.constants";
import { createSddEngineerCode } from "@/lib/createSddEngineerCode";
import { ResultDisplay } from "@/components/ResultDisplay";

export function CalculatorForm() {
  const brands = Brand.all();

  const [selectedBrand, setSelectedBrand] = useState<BrandId | "">("");
  const [result, setResult] = useState<SddEngineerCodeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      className="card bg-white dark:bg-slate-800 shadow-xl p-8 w-full max-w-md space-y-6 border border-slate-200 dark:border-slate-700"
    >
      <h2 className="text-2xl font-bold text-center text-[#0d5c3d] dark:text-[#14855a]">
        Générer un code d&apos;accès
      </h2>

      <fieldset className="fieldset space-y-2">
        <label className="fieldset-label text-base font-semibold text-slate-700 dark:text-slate-300" htmlFor="vin">
          VIN
        </label>
        <input
          type="text"
          id="vin"
          name="vin"
          className="input input-bordered w-full text-base h-12 bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-600 focus:border-[#0d5c3d] dark:focus:border-[#14855a] focus:ring-2 focus:ring-[#0d5c3d]/20 dark:focus:ring-[#14855a]/20"
          placeholder="17 caractères du VIN ou les 6 derniers"
          required
        />
      </fieldset>

      <fieldset className="fieldset space-y-2">
        <label
          className="fieldset-label text-base font-semibold text-slate-700 dark:text-slate-300"
          htmlFor="seed"
        >
          Seed
        </label>
        <input
          type="text"
          id="seed"
          name="seed"
          className="input input-bordered w-full text-base h-12 bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-600 focus:border-[#0d5c3d] dark:focus:border-[#14855a] focus:ring-2 focus:ring-[#0d5c3d]/20 dark:focus:ring-[#14855a]/20"
          placeholder="Seed de 10 caractères"
          maxLength={10}
          required
        />
      </fieldset>

      <fieldset className="fieldset space-y-2">
        <label
          className="fieldset-label text-base font-semibold text-slate-700 dark:text-slate-300"
          htmlFor="marque"
        >
          Marque
        </label>
        <select
          id="marque"
          name="marque"
          className="select select-bordered w-full text-base h-12 bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-600 focus:border-[#0d5c3d] dark:focus:border-[#14855a] focus:ring-2 focus:ring-[#0d5c3d]/20 dark:focus:ring-[#14855a]/20"
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
          className="fieldset-label text-base font-semibold text-slate-700 dark:text-slate-300"
          htmlFor="options"
        >
          Option d&apos;accès
        </label>
        <select
          id="options"
          name="options"
          className="select select-bordered w-full text-base h-12 bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-600 focus:border-[#0d5c3d] dark:focus:border-[#14855a] focus:ring-2 focus:ring-[#0d5c3d]/20 dark:focus:ring-[#14855a]/20"
          required
          defaultValue=""
          disabled={accessOptions.length === 0}
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
        className="btn w-full text-base h-12 mt-4 bg-[#0d5c3d] hover:bg-[#10704a] active:bg-[#0a4a2e] dark:bg-[#10704a] dark:hover:bg-[#14855a] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 border-0"
      >
        Calculer
      </button>

      <ResultDisplay result={result} error={error} />
    </form>
  );
}
