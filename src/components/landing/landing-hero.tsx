
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Logo } from '@/components/icons';
import { useLanguage } from '@/hooks/use-language';
import { useAuth } from '@/contexts/auth-context';

export function LandingHero() {
  const { t } = useLanguage();
  const { openReportIssueModal } = useAuth();
  
  return (
    <section className="bg-card py-20 px-4">
      <div className="container mx-auto flex max-w-4xl flex-col items-center text-center">
        <div className="scale-150">
          <Logo />
        </div>
        <p className="mt-4 text-base text-muted-foreground">{t('proudly_indian')}</p>
        <h1 className="mt-4 font-headline text-5xl font-bold">
          <span className="text-primary">{t('hero_title_voice')}</span>,{' '}
          <span className="text-accent">{t('hero_title_city')}</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          {t('hero_subtitle')}
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button size="lg" onClick={openReportIssueModal}>{t('hero_button_report')}</Button>
          <Link href="/community" passHref>
            <Button size="lg" variant="outline">
              {t('hero_button_join')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
