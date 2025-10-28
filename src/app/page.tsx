'use client';

import { AppHeader } from '@/components/app-header';
import { LandingHero } from '@/components/landing/landing-hero';
import { HowItWorks } from '@/components/landing/how-it-works';
import { LanguageFeature } from '@/components/landing/language-feature';
import { SeeWhatsHappening } from '@/components/landing/see-whats-happening';
import { CallToAction } from '@/components/landing/call-to-action';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <LandingHero />
        <HowItWorks />
        <LanguageFeature />
        <SeeWhatsHappening />
        <CallToAction />
      </main>
    </div>
  );
}
