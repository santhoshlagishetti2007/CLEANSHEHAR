'use client';

import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';

export function LanguageFeature() {
    const languageImage = placeholderImages.placeholderImages.find(p => p.id === 'language-feature');
  return (
    <section className="bg-card py-20 px-4">
      <div className="container mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="relative aspect-[4/3] w-full">
        {languageImage && (
            <Image
              src={languageImage.imageUrl}
              alt="People communicating in different languages"
              fill
              className="rounded-lg object-cover"
              data-ai-hint={languageImage.imageHint}
            />
          )}
        </div>
        <div>
          <h2 className="font-headline text-4xl font-bold">Speak Your Language</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Communicate seamlessly with people across India. Our platform supports 12 Indian languages with automatic real-time translation, ensuring language is never a barrier to civic engagement.
          </p>
          <ul className="mt-6 space-y-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
              <div>
                <h3 className="font-semibold">Automatic message translation</h3>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
              <div>
                <h3 className="font-semibold">12 Indian languages supported</h3>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
              <div>
                <h3 className="font-semibold">Real-time community discussions</h3>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
