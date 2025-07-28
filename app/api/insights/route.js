import { NextResponse } from 'next/server';

export async function GET() {
  const mockData = {
    revenue: { value: '$45,231.89', change: '+20.1% from last month' },
    users: { value: '+2350', change: '+180.1% from last month' },
    conversions: { value: '+12,234', change: '+19% from last month' },
    sales: { value: '239', change: '+12.5% from last month' },
    revenueOverTime: [
      { name: 'Jan', total: Math.floor(Math.random() * 5000) + 1000 },
      { name: 'Feb', total: Math.floor(Math.random() * 5000) + 1000 },
      { name: 'Mar', total: Math.floor(Math.random() * 5000) + 1000 },
      { name: 'Apr', total: Math.floor(Math.random() * 5000) + 1000 },
      { name: 'May', total: Math.floor(Math.random() * 5000) + 1000 },
      { name: 'Jun', total: Math.floor(Math.random() * 5000) + 1000 },
      { name: 'Jul', total: 4523 },
    ],
    trafficBySource: [
      { name: 'Google', value: 12450 },
      { name: 'Facebook', value: 8765 },
      { name: 'Direct', value: 6543 },
      { name: 'LinkedIn', value: 4321 },
      { name: 'Other', value: 2109 },
    ],
    userByDevice: [
      { name: 'Desktop', value: 58, fill: '#8884d8' },
      { name: 'Mobile', value: 32, fill: '#82ca9d' },
      { name: 'Tablet', value: 10, fill: '#ffc658' },
    ],
    // Ensure this campaigns array is present and not empty
    campaigns: [
      { id: 'cam1', campaignName: 'Summer Sale 2024', status: 'Active', spend: 4500, revenue: 7800, cpa: 5.76 },
      { id: 'cam2', campaignName: 'Winter Promo', status: 'Paused', spend: 2300, revenue: 3200, cpa: 7.18 },
      { id: 'cam3', campaignName: 'New User Onboarding', status: 'Active', spend: 6800, revenue: 12500, cpa: 4.32 },
      { id: 'cam4', campaignName: 'Q3 Brand Awareness', status: 'Finished', spend: 10500, revenue: 9500, cpa: 11.05 },
      { id: 'cam5', campaignName: 'Holiday Special', status: 'Active', spend: 7200, revenue: 15600, cpa: 4.61 },
      { id: 'cam6', campaignName: 'App Install Campaign', status: 'Paused', spend: 1500, revenue: 2500, cpa: 6.00 },
      { id: 'cam7', campaignName: 'Back to School', status: 'Active', spend: 3100, revenue: 5200, cpa: 5.96 },
      { id: 'cam8', campaignName: 'Lead Gen - Ebooks', status: 'Active', spend: 2200, revenue: 4800, cpa: 4.58 },
    ],
  };
  return NextResponse.json(mockData);
}