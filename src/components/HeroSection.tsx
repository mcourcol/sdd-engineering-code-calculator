export function HeroSection() {
  return (
    <section className="text-center space-y-4 max-w-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
      <h1 className="text-4xl md:text-5xl font-bold text-[#0d5c3d] dark:text-[#14855a]">
        JLR SDD Engineering Mode Code Generator
      </h1>
      <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
        Cet outil génère le <strong>code ingénieur</strong> nécessaire pour
        accéder aux fonctions avancées du logiciel{" "}
        <strong>SDD (Symptom Driven Diagnostics)</strong> utilisé sur les
        véhicules <strong>Jaguar</strong> et <strong>Land Rover</strong>.
      </p>

      <div className="text-left text-base text-slate-700 dark:text-slate-300 space-y-2 pt-2">
        <p className="font-semibold text-lg text-[#0d5c3d] dark:text-[#14855a]">
          Comment faire ?
        </p>
        <ol className="list-decimal list-inside space-y-2 leading-relaxed">
          <li>
            Saisissez le <strong>VIN</strong> du véhicule (17 caractères
            complets ou les 6 derniers chiffres).
          </li>
          <li>
            Entrez le <strong>seed</strong> (10 caractères) affiché par SDD.
          </li>
          <li>
            Sélectionnez la <strong>marque</strong> puis l&apos;
            <strong>option d&apos;accès</strong> souhaitée.
          </li>
          <li>
            Cliquez sur <strong>Calculer</strong> pour obtenir le mot de passe.
          </li>
        </ol>
      </div>
    </section>
  );
}
