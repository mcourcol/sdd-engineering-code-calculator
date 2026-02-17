import type { SddEngineerCodeResult } from "@/types";

interface ResultDisplayProps {
  result: SddEngineerCodeResult | null;
  error: string | null;
}

export function ResultDisplay({ result, error }: ResultDisplayProps) {
  if (error) {
    return (
      <div role="alert" className="alert bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-900 dark:text-red-200">
        <span className="text-base">{error}</span>
      </div>
    );
  }

  if (result) {
    return (
      <div role="alert" className="alert bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
        <div className="space-y-1">
          <p className="font-bold text-lg">
            Mot de passe : <span className="font-mono bg-emerald-100 dark:bg-emerald-950 px-2 py-1 rounded">{result.password}</span>
          </p>
          <p className="text-base leading-relaxed">
            Marque : {result.brand} · VIN seed : {result.seedVin} · Heure seed :{" "}
            {result.seedTime}
          </p>
        </div>
      </div>
    );
  }

  return null;
}
