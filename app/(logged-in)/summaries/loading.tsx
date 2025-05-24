import { Skeleton } from "@/components/ui/skeleton";
import { FileText } from "lucide-react";
import BgGradient from "@/components/common/bg-gradient";

export default function SummaryPageLoading() {
  return (
    <div className="relative isolate min-h-screen bg-linear-to-b from-rose-50/40 to-white">
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
        {/* Header Skeleton */}
        <div className="space-y-4 mb-10 max-w-3xl mx-auto">
          <Skeleton className="h-8 w-3/4 rounded-md" />
          <Skeleton className="h-5 w-1/2 rounded-md" />
        </div>

        {/* Source Info Skeleton */}
        <div className="mb-10 space-y-3 max-w-2xl mx-auto">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        {/* Summary Viewer Skeleton */}
        <div className="relative p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100/30 max-w-4xl mx-auto">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-linear-to-br from-rose-50/50 via-orange-50/30 to-transparent opacity-50 rounded-2xl sm:rounded-3xl" />

          {/* Word Count Badge */}
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-2 text-xs sm:text-sm bg-white/90 px-3 py-1.5 rounded-full shadow-xs">
            <FileText className="h-4 w-4 text-rose-400" />
            <Skeleton className="h-4 w-10" />
          </div>

          {/* Main Summary Text Skeleton */}
          <div className="relative mt-6 sm:mt-8 space-y-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full rounded-md" />
            ))}
            <Skeleton className="h-4 w-5/6 rounded-md" />
            <Skeleton className="h-4 w-2/3 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
