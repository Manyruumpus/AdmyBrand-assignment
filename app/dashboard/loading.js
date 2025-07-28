import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function DashboardLoading() {
  return (
    <div>
      {/* Title Skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-80" />
        </div>
        <Skeleton className="h-10 w-[300px]" />
      </div>

      {/* Metric Cards Skeletons */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-4 w-2/3" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-3 w-1/2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-4 w-2/3" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-3 w-1/2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-4 w-2/3" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-3 w-1/2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-4 w-2/3" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-3 w-1/2" />
          </CardContent>
        </Card>
      </div>

      {/* Chart Skeleton */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-1/5 mb-2" />
            <Skeleton className="h-4 w-2/5" />
          </CardHeader>
          <CardContent className="h-[350px]">
            <Skeleton className="h-full w-full" />
          </CardContent>
        </Card>
      </div>

      {/* Table Skeleton */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-1/5 mb-2" />
            <Skeleton className="h-4 w-2/5" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between py-4">
              <Skeleton className="h-10 w-1/3" />
              <Skeleton className="h-10 w-48" />
            </div>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}