'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { format, parseISO, subDays } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

const contactMessages = [
  {
    id: 'msg-1',
    name: 'Anxious Traveller',
    email: 'anxious.traveller@example.com',
    message: 'I have a question about the pet policy. Are large dogs allowed? I have a Golden Retriever who is very well-behaved.',
    receivedAt: subDays(new Date(), 1).toISOString(),
  },
  {
    id: 'msg-2',
    name: 'Future Bride',
    email: 'future.bride@example.com',
    message: 'We are considering your resort for our destination wedding next year. Could you please provide some information on your wedding packages and venue availability for May 2025?',
    receivedAt: subDays(new Date(), 2).toISOString(),
  },
  {
    id: 'msg-3',
    name: 'Corporate Planner',
    email: 'corp.planner@example.com',
    message: 'Hello, I am organizing a corporate retreat for a team of 25 people. We are interested in your corporate packages and team-building activities. Please send a brochure.',
    receivedAt: subDays(new Date(), 4).toISOString(),
  },
  {
    id: 'msg-4',
    name: 'Lost & Found',
    email: 'lostandfound@example.com',
    message: 'Hi, I think I left my sunglasses by the pool during my stay last weekend. They are a pair of black Ray-Bans. Has anyone turned them in?',
    receivedAt: subDays(new Date(), 7).toISOString(),
  },
];

export default function ContactsPage() {
    const [selectedMessage, setSelectedMessage] = useState(null);

    return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Contact Messages</h1>
      
      <Card>
          <CardHeader>
              <CardTitle>Inbox</CardTitle>
              <CardDescription>Messages received from the contact form.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>From</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead className="text-right">Received</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contactMessages.map((msg) => (
                            <TableRow key={msg.id} className="cursor-pointer" onClick={() => setSelectedMessage(msg)}>
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-9 w-9">
                                          <AvatarFallback>{msg.name.charAt(0).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium">{msg.name}</div>
                                            <div className="text-sm text-muted-foreground">{msg.email}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="max-w-[400px]">
                                    <p className="truncate">{msg.message}</p>
                                </TableCell>
                                <TableCell className="text-right">
                                    {format(parseISO(msg.receivedAt), 'MMM dd, yyyy')}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
          </CardContent>
      </Card>

      <Dialog open={!!selectedMessage} onOpenChange={(isOpen) => !isOpen && setSelectedMessage(null)}>
            <DialogContent className="sm:max-w-[625px]">
            {selectedMessage && (
                <>
                <DialogHeader>
                    <DialogTitle>Message from {selectedMessage.name}</DialogTitle>
                    <DialogDescription>
                        Email: {selectedMessage.email} | Received: {format(parseISO(selectedMessage.receivedAt), 'MMM dd, yyyy, p')}
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <div className="py-4">
                    <p className="text-sm whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setSelectedMessage(null)}>
                        Close
                    </Button>
                    <Button type="button" asChild>
                        <a href={`mailto:${selectedMessage.email}`}>Reply</a>
                    </Button>
                </DialogFooter>
                </>
            )}
            </DialogContent>
      </Dialog>
    </div>
  );
}
