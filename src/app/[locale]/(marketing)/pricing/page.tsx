import { PricingSection } from "@/components/marketing/pricing-section";
import { CtaSection } from "@/components/marketing/cta-section";
import { getPageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return getPageMetadata("pricing", "pricing");
}

export default function PricingPage() {
  return (
    <>
      <PricingSection />
      <CtaSection />
    </>
  );
}
