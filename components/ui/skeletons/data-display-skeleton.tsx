import { Skeleton } from "@/components/ui/skeleton"

interface DataDisplaySkeletonProps {
  indicators?: number
  countriesPerIndicator?: number
}

export function DataDisplaySkeleton({ indicators = 2, countriesPerIndicator = 3 }: DataDisplaySkeletonProps) {
  return (
    <div className="p-3 bg-green-50 rounded-lg space-y-4">
      <Skeleton className="h-5 w-48" />
      
      {Array.from({ length: indicators }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <div className="space-y-1">
            {Array.from({ length: countriesPerIndicator }).map((_, j) => (
              <div key={j} className="flex justify-between items-center bg-white p-2 rounded">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-12" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
