
'use client';

import { Bot, Contact, HelpCircle, MessageSquare, Send, Loader2 } from 'lucide-react';
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface SupportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const faqs = [
    {
      question: "How do I report an issue?",
      answer: "Click the 'Report New Issue' button in the header. You can then upload a photo/video, which our AI will analyze to suggest a department. Pin the location, add a title and description, and submit."
    },
    {
      question: "Can I use the app in my local language?",
      answer: "Yes! Clearशहर supports 12 Indian languages. Use the language selector in the header to choose your preferred language. All content, including user posts, will be automatically translated."
    },
    {
      question: "What happens after I report an issue?",
      answer: "Your report is sent to the relevant municipal department. You can track its status ('Reported', 'In Progress', 'Resolved') on the issue's detail page. Officials may also post updates in the comment section."
    },
    {
      question: "How do I see issues near me?",
      answer: "Visit the 'Map View' to see an interactive map of all reported issues. This can help you stay informed about problems in your area or on your commute."
    }
  ];

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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faq">
              <HelpCircle className="mr-2 h-4 w-4" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="ai-assistant">
              <Bot className="mr-2 h-4 w-4" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="contact">
              <Contact className="mr-2 h-4 w-4" />
              Contact
            </TabsTrigger>
          </TabsList>
          <TabsContent value="faq" className="mt-4">
             <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>
                        {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
          </TabsContent>
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
