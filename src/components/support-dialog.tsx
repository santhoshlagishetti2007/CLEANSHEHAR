
'use client';

import { Bot, Contact, MessageSquare, Send, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SupportChat } from './support-chat';
import { officials } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface SupportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SupportDialog({ open, onOpenChange }: SupportDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline">Support Center</DialogTitle>
          <DialogDescription>
            Get help or contact officials.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="ai-assistant" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ai-assistant">
              <Bot className="mr-2 h-4 w-4" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="contact">
              <Contact className="mr-2 h-4 w-4" />
              Contact Officials
            </TabsTrigger>
          </TabsList>
          <TabsContent value="ai-assistant" className="mt-4">
            <SupportChat />
          </TabsContent>
          <TabsContent value="contact" className="mt-4">
             <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-headline">Department Contacts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {officials.map(official => (
                        <div key={official.id} className="flex items-center gap-4">
                             <Avatar>
                                <AvatarFallback>{official.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{official.name}</p>
                                <p className="text-sm text-muted-foreground">{official.department}</p>
                                <p className="text-sm text-primary">{official.contactInformation}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
             </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
