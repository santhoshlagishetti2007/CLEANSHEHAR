'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import placeholderImages from '@/lib/placeholder-images.json';

export function LandingHero() {
  const heroImage = placeholderImages.placeholderImages.find(p => p.id === 'landing-hero');

  return (
    <section className="bg-card py-20 px-4">
      <div className="container mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div>
          <h1 className="font-headline text-5xl font-bold">
            <span className="text-primary">Your Voice</span>, <span className="text-accent">Your City</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Report civic issues, connect with your community, and engage directly with government officials. Building cleaner, better cities together.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="/issues" passHref>
                <Button size="lg">Report an Issue</Button>
            </Link>
            <Button size="lg" variant="outline">
              Join Community
            </Button>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt="Community engaging with their city"
                fill
                className="rounded-lg object-cover"
                data-ai-hint={heroImage.imageHint}
              />
            )}
        </div>
      </div>
    </section>
  );
}
