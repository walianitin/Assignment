import { Skeleton } from "@/components/ui/skeleton"

interface SidebarSkeletonProps {
  itemCount?: number
}

export function SidebarSkeleton({ itemCount = 9 }: SidebarSkeletonProps) {
  return (
    <div className="w-64 h-screen border-r p-4 space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2 pb-4 border-b">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-3 w-48" />
      </div>
      
      {/* Filters skeleton */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="space-y-2">
          {Array.from({ length: itemCount }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-full rounded-md" />
          ))}
        </div>
      </div>
      
      {/* Info skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-20 w-full rounded-md" />
      </div>
    </div>
  )
}
