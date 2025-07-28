'use client';

import React, { useState, useEffect } from 'react';
import { DollarSign, Users, CreditCard, Activity } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';

export function RealtimeMetrics({ initialData }) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/insights', { cache: 'no-store' });
        if (!res.ok) return;
        const newData = await res.json();
        setData(newData);
        console.log('Metrics updated!');
      } catch (error) {
        console.error('Failed to fetch real-time data:', error);
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
      <MetricCard 
        title="Total Revenue" 
        value={data.revenue.value}
        change={data.revenue.change}
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard 
        title="New Users" 
        value={data.users.value}
        change={data.users.change}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard 
        title="Conversions" 
        value={data.conversions.value}
        change={data.conversions.change}
        icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard 
        title="Sales" 
        value={data.sales.value}
        change={data.sales.change}
        icon={<Activity className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
}