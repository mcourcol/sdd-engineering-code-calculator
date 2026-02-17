export function HeroSection() {
  return (
    <section className="text-center space-y-4 max-w-2xl">
      <h1 className="text-4xl md:text-5xl font-bold">
        JLR SDD Engineering Mode Code Generator
      </h1>
      <p className="text-lg text-base-content/90 leading-relaxed">
        Cet outil génère le <strong>code ingénieur</strong> nécessaire pour
        accéder aux fonctions avancées du logiciel{" "}
        <strong>SDD (Symptom Driven Diagnostics)</strong> utilisé sur les
        véhicules <strong>Jaguar</strong> et <strong>Land Rover</strong>.
      </p>

      <div className="text-left text-base text-base-content/80 space-y-2 pt-2">
        <p className="font-semibold text-lg text-base-content">
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
