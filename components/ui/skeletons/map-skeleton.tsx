import { Skeleton } from "@/components/ui/skeleton"

interface MapSkeletonProps {
  height?: string
}

export function MapSkeleton({ height = "500px" }: MapSkeletonProps) {
  return (
    <div className="w-full space-y-4">
      {/* Selected countries skeleton */}
      <div className="p-3 bg-slate-100 rounded-lg">
        <div className="flex justify-between mb-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
      
      {/* Map skeleton */}
      <Skeleton className="w-full rounded-lg" style={{ height }} />
    </div>
  )
}
