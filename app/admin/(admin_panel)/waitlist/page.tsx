'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getAllWaitlist } from '@/lib/db';
import { Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function WaitlistPage() {
  const [waitlist, setWaitlist] = useState<Awaited<ReturnType<typeof getAllWaitlist>>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWaitlist = async () => {
    try {
      const data = await getAllWaitlist();
      setWaitlist(data);
    } catch (error) {
      console.error('Error fetching waitlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWaitlist();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Waitlist</h1>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Submitted At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {waitlist.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium">{entry.email}</TableCell>
                <TableCell>
                  {new Date(entry.submitted_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (confirm('Are you sure you want to remove this email from the waitlist?')) {
                        // TODO: Implement delete functionality
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 