"use client";

import { Check, Languages } from "lucide-react";

import { useLanguage } from "@/hooks/use-language";
import { languages, Language } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Languages className="mr-2 h-4 w-4" />
          {t('language')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([langCode, langDetails]) => (
          <DropdownMenuItem
            key={langCode}
            onSelect={() => setLanguage(langCode as Language)}
          >
            <span className="mr-2">{langDetails.flag}</span>
            <span>{langDetails.name}</span>
            <Check
              className={cn(
                "ml-auto h-4 w-4",
                language === langCode ? "opacity-100" : "opacity-0"
              )}
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
