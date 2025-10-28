
'use client';

import { useState } from 'react';
import { AppHeader } from '@/components/app-header';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, FileQuestion } from 'lucide-react';
import { SupportChatDialog } from '@/components/support-chat-dialog';
import { useLanguage } from '@/hooks/use-language';

const faqs = [
    {
        question: 'How do I report an issue?',
        answer: 'You can report an issue by clicking the "Report New Issue" button on the Dashboard. You will be asked to provide a title, description, and upload a photo or video of the issue.'
    },
    {
        question: 'How is the department for an issue decided?',
        answer: 'When you upload media, our AI automatically analyzes it to suggest the most relevant government department. You can still change it manually if needed.'
    },
    {
        question: 'Can I see issues reported by others?',
        answer: 'Yes, the Dashboard shows all reported issues. You can view them in a list or on a map to see what\'s happening in your area.'
    },
    {
        question: 'How do I change the language?',
        answer: 'You can select your preferred language from the language selector dropdown in the header. The entire app, including community discussions, will be translated for you.'
    }
]

export default function SupportPage() {
    const [isChatOpen, setChatOpen] = useState(false);
    const { t } = useLanguage();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader />
      <main className="flex-1 bg-background px-4 py-8 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="font-headline text-4xl font-bold">Help & Support</h1>
            <p className="mt-2 text-muted-foreground">
              Find answers to your questions or chat with our AI assistant.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader className='flex-row items-center gap-4 space-y-0'>
                <FileQuestion className="h-8 w-8 text-primary" />
                <CardTitle className='font-headline text-2xl'>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <Card className="flex flex-col justify-center items-center">
                <CardHeader className='text-center'>
                    <div className='mx-auto bg-primary/10 rounded-full p-4 w-fit'>
                        <Bot className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className='font-headline text-2xl pt-4'>AI Support Chat</CardTitle>
                </CardHeader>
                <CardContent className='text-center'>
                    <p className='text-muted-foreground mb-4'>
                        Have a specific question? Our AI assistant can help you find answers instantly.
                    </p>
                    <SupportChatDialog open={isChatOpen} onOpenChange={setChatOpen}>
                        <Button onClick={() => setChatOpen(true)}>
                            Start Chat
                        </Button>
                    </SupportChatDialog>
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
