import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getUnreadMessages, markMessageAsRead } from '@/lib/db';
import { 
  Mail, 
  Check, 
  Trash2 
} from 'lucide-react';

export default async function MessagesPage() {
  const messages = await getUnreadMessages();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Contact Messages</h1>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>From</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell className="font-medium">
                  <div>{message.name}</div>
                  <div className="text-sm text-muted-foreground">{message.email}</div>
                </TableCell>
                <TableCell>{message.subject}</TableCell>
                <TableCell className="max-w-md truncate">{message.message}</TableCell>
                <TableCell>
                  {new Date(message.submitted_at || '').toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <form action={async () => {
                      'use server'
                      await markMessageAsRead(message.id)
                    }}>
                      <Button variant="outline" size="icon" type="submit">
                        <Check className="h-4 w-4" />
                      </Button>
                    </form>
                    <Button variant="outline" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {messages.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <div className="flex flex-col items-center gap-2">
                    <Mail className="h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground">No unread messages</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 