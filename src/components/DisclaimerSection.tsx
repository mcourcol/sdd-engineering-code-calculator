import { TriangleAlert, Info } from "lucide-react";

export function DisclaimerSection() {
  return (
    <section className="max-w-xl space-y-3 text-base">
      <div role="alert" className="alert alert-warning">
        <TriangleAlert className="h-6 w-6 shrink-0" aria-hidden="true" />
        <div className="space-y-2">
          <p className="font-semibold text-lg">Avertissement</p>
          <ul className="list-disc list-inside space-y-1 leading-relaxed">
            <li>
              Le mode ingénieur offre <strong>très peu de protections</strong>.
              Une mauvaise manipulation, une coupure de courant ou le choix
              d&apos;un fichier logiciel incorrect peut{" "}
              <strong>endommager irréversiblement un calculateur</strong>.
            </li>
            <li>
              Effectuez <strong>toujours une sauvegarde</strong> de la
              configuration (CCF) du véhicule avant toute modification.
            </li>
            <li>
              Assurez-vous d&apos;utiliser une{" "}
              <strong>alimentation électrique stable</strong> pendant toute la
              durée de l&apos;opération.
            </li>
          </ul>
        </div>
      </div>

      <div role="alert" className="alert">
        <Info className="h-5 w-5 shrink-0" aria-hidden="true" />
        <p className="text-sm leading-relaxed">
          <strong>Clause de non-responsabilité :</strong> cet outil est fourni{" "}
          <strong>à titre informatif uniquement</strong>. L&apos;auteur décline
          toute responsabilité en cas de dommage matériel, logiciel ou de toute
          autre nature résultant de son utilisation. Vous utilisez cet outil{" "}
          <strong>à vos propres risques</strong>.
        </p>
      </div>
    </section>
  );
}
