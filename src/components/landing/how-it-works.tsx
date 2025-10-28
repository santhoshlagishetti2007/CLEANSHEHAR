
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';
import { FileText, MapPin, MessageCircle, Users } from 'lucide-react';
import { Logo } from '../icons';
import { TranslatedText } from '../translated-text';

export function HowItWorks() {
  const { t } = useLanguage();
  
  const features = [
      {
          icon: <FileText className="h-8 w-8 text-primary" />,
          title: t('feature_report_title'),
          description: t('feature_report_desc')
      },
      {
          icon: <MapPin className="h-8 w-8 text-primary" />,
          title: t('feature_location_title'),
          description: t('feature_location_desc')
      },
      {
          icon: <MessageCircle className="h-8 w-8 text-primary" />,
          title: t('feature_chat_title'),
          description: t('feature_chat_desc')
      },
      {
          icon: <Users className="h-8 w-8 text-primary" />,
          title: t('feature_officials_title'),
          description: t('feature_officials_desc')
      }
  ]
  return (
    <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
            <div className="text-center">
                <h2 className="font-headline text-4xl font-bold flex items-center justify-center gap-2">
                  How <span className="scale-110"><Logo /></span> Works
                </h2>
                <p className="mt-2 text-muted-foreground">{t('how_it_works_subtitle')}</p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => (
                    <Card key={index} className="text-center">
                        <CardHeader>
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                {feature.icon}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardTitle className="mb-2 font-headline text-xl"><TranslatedText text={feature.title} /></CardTitle>
                            <p className="text-sm text-muted-foreground"><TranslatedText text={feature.description} /></p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </section>
  );
}
