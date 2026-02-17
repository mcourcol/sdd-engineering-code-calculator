"use client";

import { useState } from "react";
import type { AccessOptionCode, BrandId, SddEngineerCodeResult } from "@/types";
import { Brand } from "@/value-objects/brand.vo";
import { getAccessOptionsForBrand } from "@/constants/access-options.constants";
import { createSddEngineerCode } from "@/lib/createSddEngineerCode";

export default function Home() {
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
    <main className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="card bg-base-200 shadow-xl p-8 w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">
          JLR SDD Engineering Code Calculator
        </h1>

        <fieldset className="fieldset">
          <label className="fieldset-label" htmlFor="vin">
            VIN
          </label>
          <input
            type="text"
            id="vin"
            name="vin"
            className="input input-bordered w-full"
            placeholder="Full 17-char or last 6 digits"
            required
          />
        </fieldset>

        <fieldset className="fieldset">
          <label className="fieldset-label" htmlFor="seed">
            Seed
          </label>
          <input
            type="text"
            id="seed"
            name="seed"
            className="input input-bordered w-full"
            placeholder="10-character seed"
            maxLength={10}
            required
          />
        </fieldset>

        <fieldset className="fieldset">
          <label className="fieldset-label" htmlFor="marque">
            Brand
          </label>
          <select
            id="marque"
            name="marque"
            className="select select-bordered w-full"
            required
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value as BrandId)}
          >
            <option value="" disabled>
              Select a brand
            </option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.label}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset className="fieldset">
          <label className="fieldset-label" htmlFor="options">
            Access Option
          </label>
          <select
            id="options"
            name="options"
            className="select select-bordered w-full"
            required
            defaultValue=""
            disabled={accessOptions.length === 0}
          >
            <option value="" disabled>
              {accessOptions.length === 0
                ? "Select a brand first"
                : "Select an option"}
            </option>
            {accessOptions.map((opt) => (
              <option key={opt.code} value={opt.code}>
                {opt.code} — {opt.label}
              </option>
            ))}
          </select>
        </fieldset>

        <button type="submit" className="btn btn-primary w-full">
          Calculate
        </button>

        {error && (
          <div role="alert" className="alert alert-error">
            <span>{error}</span>
          </div>
        )}

        {result && (
          <div role="alert" className="alert alert-success">
            <div>
              <p className="font-bold">
                Password: <span className="font-mono">{result.password}</span>
              </p>
              <p className="text-sm opacity-70">
                Brand: {result.brand} · Seed VIN: {result.seedVin} · Seed Time:{" "}
                {result.seedTime}
              </p>
            </div>
          </div>
        )}
      </form>
    </main>
  );
}
