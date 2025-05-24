import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import BgGradient from '@/components/common/bg-gradient';

export default function DashboardLoading() {
  return (
    <main className="min-h-screen relative">
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
      <div className="container mx-auto px-2 py-12 sm:py-24">
        {/* Top Section Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <div className="space-y-2">
            <Skeleton className="h-10 w-60 rounded-md" />
            <Skeleton className="h-5 w-72 rounded-md" />
          </div>
          <Skeleton className="h-10 w-40 rounded-md" />
        </div>

        {/* Limit Warning (placeholder) */}
        <div className="mb-6">
          <Skeleton className="h-14 w-full max-w-2xl rounded-lg" />
        </div>

        {/* Summary Cards Grid Skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="p-4 space-y-3 shadow-sm rounded-xl">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex gap-2 mt-2">
                <Skeleton className="h-8 w-20 rounded-md" />
                <Skeleton className="h-8 w-20 rounded-md" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
