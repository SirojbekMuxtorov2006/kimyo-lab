import { getPageMetadata } from "@/lib/metadata";
import { LegalDocument } from "@/components/shared/legal-document";

export async function generateMetadata() {
  return getPageMetadata("terms", "terms");
}

export default function TermsPage() {
  return <LegalDocument variant="terms" />;
}
