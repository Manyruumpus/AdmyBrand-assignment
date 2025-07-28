import { TrafficBarChart } from '@/components/dashboard/TrafficBarChart';
import { DevicePieChart } from '@/components/dashboard/DevicePieChart';
import { RealtimeMetrics } from '@/components/dashboard/RealtimeMetrics';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { DataTable, columns } from '@/components/dashboard/DataTable';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DateRangePicker } from '@/components/dashboard/DateRangePicker';

export default async function DashboardPage({ searchParams }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/insights`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch data');
  const data = await res.json();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground">A quick look at your key metrics.</p>
        </div>
        <DateRangePicker />
      </div>
      <RealtimeMetrics initialData={data} />

      <div className="grid gap-6 mt-6 md:grid-cols-1 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>Your revenue trend for the last 7 months.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] pl-2">
            <RevenueChart data={data.revenueOverTime} />
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Traffic by Source</CardTitle>
                <CardDescription>An overview of your website traffic sources.</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
                <TrafficBarChart data={data.trafficBySource} />
            </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 mt-6 md:grid-cols-1 lg:grid-cols-5">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Users by Device</CardTitle>
                <CardDescription>A breakdown of user devices.</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
                <DevicePieChart data={data.userByDevice} />
            </CardContent>
        </Card>

        {/* This section is corrected to ensure DataTable is inside the Card */}
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>An overview of your recent marketing campaigns.</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={data.campaigns} />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}