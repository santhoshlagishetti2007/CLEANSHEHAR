
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import placeholderImages from '@/lib/placeholder-images.json';
import Link from 'next/link';
import { useLanguage } from '@/hooks/use-language';

export function SeeWhatsHappening() {
    const { t } = useLanguage();
    const mapImage = placeholderImages.placeholderImages.find(p => p.id === 'see-whats-happening-doodle');
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-headline text-4xl font-bold">{t('map_feature_title')}</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t('map_feature_subtitle')}
          </p>
          <div className="mt-8">
            <Link href="/map" passHref>
                <Button size="lg">{t('map_feature_button')}</Button>
            </Link>
          </div>
        </div>
        <div className="relative aspect-square w-full md:aspect-[4/3]">
        {mapImage && (
            <Image
              src={mapImage.imageUrl}
              alt={mapImage.description}
              fill
              className="rounded-lg object-contain"
              data-ai-hint={mapImage.imageHint}
            />
          )}
        </div>
      </div>
    </section>
  );
}
