import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface CardSkeletonProps {
  hasHeader?: boolean
  hasFooter?: boolean
  lines?: number
}

export function CardSkeleton({ hasHeader = true, hasFooter = true, lines = 3 }: CardSkeletonProps) {
  return (
    <Card>
      {hasHeader && (
        <CardHeader className="space-y-2">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
      )}
      <CardContent className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </CardContent>
      {hasFooter && (
        <CardFooter>
          <Skeleton className="h-4 w-1/3" />
        </CardFooter>
      )}
    </Card>
  )
}
