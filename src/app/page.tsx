import HeroSection from "@/components/home/HeroSection";
import ValuePoints from "@/components/home/ValuePoints";
import SolutionsPreview from "@/components/home/SolutionsPreview";
import PricingPreview from "@/components/home/PricingPreview";
export default function Home() {
  return (
    <div>
      <HeroSection /> 
      <ValuePoints />
      <SolutionsPreview />
      <PricingPreview />
    </div>
  );
}
