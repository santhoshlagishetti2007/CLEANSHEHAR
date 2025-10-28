'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Logo } from '@/components/icons';

export function LandingHero() {
  return (
    <section className="bg-card py-20 px-4">
      <div className="container mx-auto flex max-w-4xl flex-col items-center text-center">
        <Logo />
        <p className="mt-4 text-sm text-muted-foreground">proudly 🇮🇳</p>
        <h1 className="mt-4 font-headline text-5xl font-bold">
          <span className="text-primary">Your Voice</span>,{' '}
          <span className="text-accent">Your City</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Report civic issues, connect with your community, and engage directly
          with government officials. Building cleaner, better cities together.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link href="/issues" passHref>
            <Button size="lg">Report an Issue</Button>
          </Link>
          <Button size="lg" variant="outline">
            Join Community
          </Button>
        </div>
      </div>
    </section>
  );
}
