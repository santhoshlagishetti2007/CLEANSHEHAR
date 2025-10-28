"use client";

import { LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SupportChatDialog } from "./support-chat-dialog";
import { useLanguage } from "@/hooks/use-language";

export function FloatingSupportButton() {
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-4 right-4 z-50">
       <SupportChatDialog>
            <Button
              isIconOnly
              size="lg"
              className="rounded-full shadow-lg"
              aria-label={t("support")}
            >
              <LifeBuoy className="h-6 w-6" />
            </Button>
       </SupportChatDialog>
    </div>
  );
}
