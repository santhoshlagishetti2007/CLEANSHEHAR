
'use client';

import { Bot, Contact, HelpCircle } from 'lucide-react';
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
import { Avatar, AvatarFallback } from './ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { useLanguage } from '@/hooks/use-language';
import { TranslatedText } from './translated-text';

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
  const { t } = useLanguage();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline">{t('support_center_title')}</DialogTitle>
          <DialogDescription>
            {t('support_center_desc')}
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="ai-assistant" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faq">
              <HelpCircle className="mr-2 h-4 w-4" />
              {t('faq_tab')}
            </TabsTrigger>
            <TabsTrigger value="ai-assistant">
              <Bot className="mr-2 h-4 w-4" />
              {t('ai_assistant_tab')}
            </TabsTrigger>
            <TabsTrigger value="contact">
              <Contact className="mr-2 h-4 w-4" />
              {t('contact_tab')}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="faq" className="mt-4">
             <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger><TranslatedText text={faq.question} /></AccordionTrigger>
                        <AccordionContent>
                        <TranslatedText text={faq.answer} />
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
                    <CardTitle className="text-lg font-headline">{t('department_contacts')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {officials.map(official => (
                        <div key={official.id} className="flex items-center gap-4">
                             <Avatar>
                                <AvatarFallback><TranslatedText text={official.name.charAt(0)} /></AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold"><TranslatedText text={official.name} /></p>
                                <p className="text-sm text-muted-foreground"><TranslatedText text={official.department} /></p>
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
