'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CallToAction() {
  return (
    <section className="bg-primary/90 py-20 px-4">
      <div className="container mx-auto max-w-4xl text-center text-primary-foreground">
        <h2 className="font-headline text-4xl font-bold">Ready to Make a Difference?</h2>
        <p className="mt-4 text-lg">
          Join thousands of citizens working together to build cleaner, better cities.
        </p>
        <div className="mt-8">
            <Link href="/community" passHref>
                 <Button size="lg" variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Report Your First Issue
                 </Button>
            </Link>
        </div>
      </div>
    </section>
  );
}
