import { HeroSection } from "@/components/HeroSection";
import { DisclaimerSection } from "@/components/DisclaimerSection";
import { CalculatorForm } from "@/components/CalculatorForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <HeroSection />
      <DisclaimerSection />
      <CalculatorForm />
    </main>
  );
}
