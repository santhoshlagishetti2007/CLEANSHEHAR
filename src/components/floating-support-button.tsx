
'use client';

import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';
import { SupportChatDialog } from '@/components/support-chat-dialog';

export function FloatingSupportButton() {
  const { t } = useLanguage();
  const [isChatOpen, setChatOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <SupportChatDialog open={isChatOpen} onOpenChange={setChatOpen}>
        <Button
          onClick={() => setChatOpen(true)}
          size="lg"
          className="rounded-full shadow-lg"
          aria-label={t('support')}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </SupportChatDialog>
    </div>
  );
}
