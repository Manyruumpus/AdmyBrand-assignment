'use client'; 

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export function RevenueChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          contentStyle={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.8)', 
            borderColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff'
          }}
          cursor={{ fill: 'rgba(128, 128, 128, 0.1)' }}
        />
        <Line
          type="monotone"
          dataKey="total"
          // We are changing the color here to a solid value for the fix
          stroke="#8884d8" 
          strokeWidth={2}
          dot={{ r: 4, strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}