
'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';
import { useAuth } from '@/contexts/auth-context';

export function CallToAction() {
  const { t } = useLanguage();
  const { openReportIssueModal } = useAuth();
  
  return (
    <section className="bg-primary/90 py-20 px-4">
      <div className="container mx-auto max-w-4xl text-center text-primary-foreground">
        <h2 className="font-headline text-4xl font-bold">{t('cta_title')}</h2>
        <p className="mt-4 text-lg">
          {t('cta_subtitle')}
        </p>
        <div className="mt-8">
            <Button size="lg" variant="secondary" onClick={openReportIssueModal} className="bg-accent text-accent-foreground hover:bg-accent/90">
               {t('cta_button')}
            </Button>
        </div>
      </div>
    </section>
  );
}
