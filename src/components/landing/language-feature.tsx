
'use client';

import { useLanguage } from '@/hooks/use-language';
import { CheckCircle } from 'lucide-react';

export function LanguageFeature() {
  const { t } = useLanguage();
  return (
    <section className="bg-card py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
            <h2 className="font-headline text-4xl font-bold">{t('language_feature_title')}</h2>
            <p className="mt-4 text-lg text-muted-foreground">
            {t('language_feature_subtitle')}
            </p>
            <ul className="mt-8 inline-block max-w-md space-y-4 text-left">
                <li className="flex items-start gap-3">
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                <div>
                    <h3 className="font-semibold">{t('translation_feature_1_title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('translation_feature_1_desc')}</p>
                </div>
                </li>
                <li className="flex items-start gap-3">
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                <div>
                    <h3 className="font-semibold">{t('translation_feature_2_title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('translation_feature_2_desc')}</p>
                </div>
                </li>
                <li className="flex items-start gap-3">
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                <div>
                    <h3 className="font-semibold">{t('translation_feature_3_title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('translation_feature_3_desc')}</p>
                </div>
                </li>
            </ul>
        </div>
      </div>
    </section>
  );
}
