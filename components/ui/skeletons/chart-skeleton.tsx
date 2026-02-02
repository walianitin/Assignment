import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface ChartSkeletonProps {
  barCount?: number
  height?: string
}

export function ChartSkeleton({ barCount = 4, height = "150px" }: ChartSkeletonProps) {
  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-3 w-1/2" />
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-2" style={{ height }}>
          {Array.from({ length: barCount }).map((_, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <Skeleton 
                className="w-full rounded-t-md" 
                style={{ height: `${50}%` }} 
              />
              <Skeleton className="h-3 w-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
