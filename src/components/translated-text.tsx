
'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { useAITranslation } from '@/hooks/use-ai-translation';
import { Skeleton } from './ui/skeleton';

interface TranslatedTextProps {
  text: string;
}

export function TranslatedText({ text }: TranslatedTextProps) {
  const { language } = useLanguage();
  const { translatedText, isLoading } = useAITranslation(text, language);
  const [displayedText, setDisplayedText] = useState(text);

  useEffect(() => {
    if (language === 'en') {
        setDisplayedText(text);
    } else if (!isLoading && translatedText) {
        setDisplayedText(translatedText);
    }
  }, [language, translatedText, isLoading, text]);

  if (language !== 'en' && isLoading) {
    return <Skeleton className="h-5 w-4/5" />;
  }

  return <span>{displayedText}</span>;
}
