'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, MapPin, MessageCircle, Users } from 'lucide-react';

const features = [
    {
        icon: <FileText className="h-8 w-8 text-primary" />,
        title: 'Report Issues',
        description: 'Upload photos/videos of civic problems, with AI-powered department distinction.'
    },
    {
        icon: <MapPin className="h-8 w-8 text-primary" />,
        title: 'Location Tracking',
        description: 'Pin exact locations on a map with route markings for travelers.'
    },
    {
        icon: <MessageCircle className="h-8 w-8 text-primary" />,
        title: 'Community Chat',
        description: 'Connect with neighbors in real-time with automatic translation.'
    },
    {
        icon: <Users className="h-8 w-8 text-primary" />,
        title: 'Direct to Officials',
        description: 'Issues are routed directly to relevant government departments.'
    }
]

export function HowItWorks() {
  return (
    <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
            <div className="text-center">
                <h2 className="font-headline text-4xl font-bold">How <span className="text-primary">Clear</span><span className="text-accent">शहर</span> Works</h2>
                <p className="mt-2 text-muted-foreground">A complete platform for civic engagement with multilingual support</p>
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
                            <CardTitle className="mb-2 font-headline text-xl">{feature.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </section>
  );
}
