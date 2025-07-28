'use client';

import * as React from 'react';
import Papa from 'papaparse';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, Sparkles, Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const columns = [
    { accessorKey: 'campaignName', header: 'Campaign' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'spend', header: ({ column }) => (<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>Spend<ArrowUpDown className="ml-2 h-4 w-4" /></Button>), cell: ({ row }) => (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseFloat(row.getValue('spend')))) },
    { accessorKey: 'revenue', header: 'Revenue', cell: ({ row }) => (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseFloat(row.getValue('revenue')))) },
    { accessorKey: 'cpa', header: 'CPA', cell: ({ row }) => (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseFloat(row.getValue('cpa')))) },
];

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [insights, setInsights] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    initialState: { pagination: { pageSize: 5 } },
    state: { sorting, columnFilters },
  });

  const handleGenerateInsights = async () => {
    setIsLoading(true);
    setInsights('');
    try {
      const response = await fetch('/api/generate-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaigns: data }),
      });
      const result = await response.json();
      if(result.error) throw new Error(result.error);
      setInsights(result.insights);
    } catch (error) {
      setInsights('Failed to generate insights. Please check your API key and try again.');
      console.error(error);
    }
    setIsLoading(false);
  };
  
  const handleExportCSV = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'campaign_performance.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter campaigns..."
          value={(table.getColumn('campaignName')?.getFilterValue()) ?? ''}
          onChange={(event) =>
            table.getColumn('campaignName')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
            <Button onClick={handleGenerateInsights} disabled={isLoading}>
                <Sparkles className="mr-2 h-4 w-4" />
                {isLoading ? 'Generating...' : 'Generate Insights'}
            </Button>
            <Button onClick={handleExportCSV} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
            </Button>
        </div>
      </div>

      {(isLoading || insights) && (
        <div className="p-4 mb-4 border rounded-md bg-muted/50">
          <h4 className="font-semibold mb-2">AI Insights:</h4>
          {isLoading ? <p className="text-sm text-muted-foreground">Please wait while the AI analyzes your data...</p> : 
          <div className="text-sm whitespace-pre-line">{insights}</div>}
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">No results.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
      </div>
    </div>
  );
}