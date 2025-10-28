
"use client";

import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import Link from 'next/link';

export function FloatingSupportButton() {
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-4 right-4 z-50">
       <Link href="/support" passHref>
          <Button
            isIconOnly
            size="lg"
            className="rounded-full shadow-lg"
            aria-label={t("support")}
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
       </Link>
    </div>
  );
}
