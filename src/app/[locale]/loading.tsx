import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container-page space-y-8 py-16" aria-busy="true" aria-live="polite">
      <div className="mx-auto max-w-2xl space-y-3 text-center">
        <Skeleton className="mx-auto h-4 w-32 rounded-full" />
        <Skeleton className="mx-auto h-10 w-full max-w-xl" />
        <Skeleton className="mx-auto h-4 w-full max-w-md" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-44 rounded-2xl" />
        <Skeleton className="h-44 rounded-2xl" />
        <Skeleton className="h-44 rounded-2xl" />
      </div>
    </div>
  );
}
