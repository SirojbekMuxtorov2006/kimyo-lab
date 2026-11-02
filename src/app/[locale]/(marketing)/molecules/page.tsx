import { getTranslations } from "next-intl/server";
import { ShapesIcon } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { MoleculeShowcase } from "@/components/chemistry/molecule-showcase";
import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { getPageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return getPageMetadata("molecules", "molecules");
}

export default async function MoleculesPage() {
  const t = await getTranslations("Pages.molecules");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        icon={ShapesIcon}
      />
      <div className="container-page py-14">
        <div className="mb-6 flex justify-center">
          <Badge variant="demo">3D preview · WebGL</Badge>
        </div>
        <Reveal>
          <MoleculeShowcase />
        </Reveal>
      </div>
    </>
  );
}
