'use client';

import { CheckCircle } from 'lucide-react';

export function LanguageFeature() {
  return (
    <section className="bg-card py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
            <h2 className="font-headline text-4xl font-bold">Speak Your Language</h2>
            <p className="mt-4 text-lg text-muted-foreground">
            Communicate seamlessly with people across India. Our platform supports 12 Indian languages with automatic real-time translation, ensuring language is never a barrier to civic engagement.
            </p>
            <ul className="mt-8 inline-block max-w-md space-y-4 text-left">
                <li className="flex items-start gap-3">
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                <div>
                    <h3 className="font-semibold">Automatic message translation</h3>
                    <p className="text-sm text-muted-foreground">In-chat and in-post translations.</p>
                </div>
                </li>
                <li className="flex items-start gap-3">
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                <div>
                    <h3 className="font-semibold">12 Indian languages supported</h3>
                    <p className="text-sm text-muted-foreground">Widest range of local languages.</p>
                </div>
                </li>
                <li className="flex items-start gap-3">
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                <div>
                    <h3 className="font-semibold">Real-time community discussions</h3>
                    <p className="text-sm text-muted-foreground">Understand everyone in real-time.</p>
                </div>
                </li>
            </ul>
        </div>
      </div>
    </section>
  );
}
