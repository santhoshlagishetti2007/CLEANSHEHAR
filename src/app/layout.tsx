import type { Metadata } from 'next';
import { Playfair_Display, PT_Sans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { AppProviders } from '@/contexts/app-providers';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { FloatingSupportButton } from '@/components/floating-support-button';

const fontPlayfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-headline',
});

const fontPTSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Clearशहर',
  description: 'Crowdsourced civic issue reporting and resolution platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏠</text></svg>" />
      </head>
      <body
        className={cn(
          'font-body antialiased',
          fontPlayfair.variable,
          fontPTSans.variable
        )}
      >
        <FirebaseClientProvider>
          <AppProviders>
            {children}
            <Toaster />
            <FloatingSupportButton />
          </AppProviders>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
