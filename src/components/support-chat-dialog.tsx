
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLanguage } from "@/hooks/use-language";
import { SupportChat } from "./support-chat";

interface SupportChatDialogProps {
    children: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function SupportChatDialog({ children, open, onOpenChange }: SupportChatDialogProps) {
  const { t } = useLanguage();
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">{t('support_chat_title')}</DialogTitle>
          <DialogDescription>{t('support_chat_description')}</DialogDescription>
        </DialogHeader>
        <SupportChat />
      </DialogContent>
    </Dialog>
  );
}
