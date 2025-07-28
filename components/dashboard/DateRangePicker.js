'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function DateRangePicker({ className }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const [date, setDate] = React.useState({
    from: from ? new Date(from) : addDays(new Date(), -30),
    to: to ? new Date(to) : new Date(),
  });

  const handleDateChange = (newDate) => {
    setDate(newDate);
    if (newDate?.from && newDate?.to) {
      const fromISO = format(newDate.from, 'yyyy-MM-dd');
      const toISO = format(newDate.to, 'yyyy-MM-dd');
      router.push(`/dashboard?from=${fromISO}&to=${toISO}`);
    }
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}