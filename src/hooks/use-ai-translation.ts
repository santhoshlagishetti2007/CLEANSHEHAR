
'use client';

import { useState, useEffect, use } from 'react';
import { Language } from '@/lib/translations';
import { aiTranslateText } from '@/ai/flows/ai-translate-text';

const translationCache = new Map<string, string>();

export function useAITranslation(text: string, targetLanguage: Language) {
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!text || targetLanguage === 'en') {
      setTranslatedText(text);
      return;
    }

    const cacheKey = `${targetLanguage}:${text}`;
    if (translationCache.has(cacheKey)) {
        setTranslatedText(translationCache.get(cacheKey)!);
        return;
    }

    let isMounted = true;
    const translate = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await aiTranslateText({ text, targetLanguage });
        if (isMounted) {
          setTranslatedText(result.translatedText);
          translationCache.set(cacheKey, result.translatedText);
        }
      } catch (e) {
        if (isMounted) {
          setError(e as Error);
          console.error("Translation failed:", e);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    translate();

    return () => {
      isMounted = false;
    };
  }, [text, targetLanguage]);

  return { translatedText, isLoading, error };
}
