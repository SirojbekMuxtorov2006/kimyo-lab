import { Suspense } from "react";
import { VirtualLab } from "@/components/lab/virtual-lab";
import { getPageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return getPageMetadata("virtualLab", "virtual-lab");
}

async function Lab({ searchParams }: { searchParams: Promise<{ exp?: string }> }) {
  const { exp } = await searchParams;
  return <VirtualLab key={exp} initialScenario={exp} />;
}

export default function VirtualLabPage({ searchParams }: { searchParams: Promise<{ exp?: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-[calc(100dvh-4.5rem)] bg-[#0b1520]" />}>
      <Lab searchParams={searchParams} />
    </Suspense>
  );
}
