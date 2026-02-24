"use client";

import type { SddEngineerCodeResult } from "@/types";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/useToast";

interface ResultDisplayProps {
  result: SddEngineerCodeResult | null;
  error: string | null;
}

export function ResultDisplay({ result, error }: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);
  const { showSuccess, showError } = useToast();

  const handleCopy = async () => {
    if (!result?.password) return;

    try {
      await navigator.clipboard.writeText(result.password);
      setCopied(true);
      showSuccess("Code copié dans le presse-papier !");

      // Reset icon after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      showError("Erreur lors de la copie");
    }
  };

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
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm font-medium mb-2 opacity-80">
                Mot de passe
              </p>
              <p className="font-mono font-bold text-4xl tracking-wider break-all">
                {result.password}
              </p>
            </div>
            <button
              onClick={handleCopy}
              className="btn btn-circle btn-lg btn-ghost"
              title="Copier le code"
              aria-label="Copier le code dans le presse-papier"
            >
              {copied ? (
                <Check className="w-6 h-6" />
              ) : (
                <Copy className="w-6 h-6" />
              )}
            </button>
          </div>
          <div className="divider my-2"></div>
          <p className="text-sm opacity-80 leading-relaxed">
            Marque : {result.brand} · VIN seed : {result.seedVin} · Heure seed :{" "}
            {result.seedTime}
          </p>
        </div>
      </div>
    );
  }

  return null;
}
