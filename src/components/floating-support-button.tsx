
'use client';

import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';
import { SupportDialog } from '@/components/support-dialog';

export function FloatingSupportButton() {
  const { t } = useLanguage();
  const [isChatOpen, setChatOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setChatOpen(true)}
        size="lg"
        className="fixed bottom-4 right-4 rounded-full shadow-lg h-16 w-16"
        aria-label={t('support')}
      >
        <MessageSquare className="h-8 w-8" />
      </Button>
      <SupportDialog open={isChatOpen} onOpenChange={setChatOpen} />
    </>
  );
}
