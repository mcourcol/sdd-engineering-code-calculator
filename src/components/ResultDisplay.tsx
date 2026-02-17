import type { SddEngineerCodeResult } from "@/types";

interface ResultDisplayProps {
  result: SddEngineerCodeResult | null;
  error: string | null;
}

export function ResultDisplay({ result, error }: ResultDisplayProps) {
  if (error) {
    return (
      <div role="alert" className="alert alert-error">
        <span className="text-base">{error}</span>
      </div>
    );
  }

  if (result) {
    return (
      <div role="alert" className="alert alert-success">
        <div className="space-y-1">
          <p className="font-bold text-lg">
            Mot de passe : <span className="font-mono">{result.password}</span>
          </p>
          <p className="text-base opacity-90 leading-relaxed">
            Marque : {result.brand} · VIN seed : {result.seedVin} · Heure seed :{" "}
            {result.seedTime}
          </p>
        </div>
      </div>
    );
  }

  return null;
}
