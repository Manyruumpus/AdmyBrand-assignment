import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function MetricCard({ title, value, change, icon }) {
  const changeColor = change.startsWith('+') ? 'text-green-500' : 'text-red-500';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs text-muted-foreground ${changeColor}`}>{change}</p>
      </CardContent>
    </Card>
  );
}