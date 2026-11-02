import { getPageMetadata } from "@/lib/metadata";
import { LegalDocument } from "@/components/shared/legal-document";

export async function generateMetadata() {
  return getPageMetadata("privacy", "privacy");
}

export default function PrivacyPage() {
  return <LegalDocument variant="privacy" />;
}
