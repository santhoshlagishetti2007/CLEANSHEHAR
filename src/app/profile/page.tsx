
'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useLanguage } from '@/hooks/use-language';
import { AppHeader } from '@/components/app-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { issues } from '@/lib/data';
import { IssueCard } from '@/components/issue-card';
import Link from 'next/link';
import { TranslatedText } from '@/components/translated-text';

export default function ProfilePage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isOfficial, setIsOfficial] = useState(false); // This would come from user data in a real app

  if (!user) {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <AppHeader />
        <main className="flex-1 bg-background px-4 py-8 md:px-6 lg:px-8">
          <div className="container mx-auto max-w-2xl text-center">
            <p>{t('profile_please_sign_in')}</p>
          </div>
        </main>
      </div>
    );
  }

  const userIssues = issues.filter(issue => issue.author.id === user.uid);


  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader />
      <main className="flex-1 bg-background px-4 py-8 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl space-y-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
                  <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="font-headline text-3xl"><TranslatedText text={user.displayName || ''} /></CardTitle>
                  <CardDescription><TranslatedText text={user.email || ''} /></CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="username"><TranslatedText text={t('username')} /></Label>
                <Input id="username" defaultValue={user.displayName || ''} />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <Label htmlFor="official-mode" className="font-semibold">
                    <TranslatedText text={t('official_account')} />
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    <TranslatedText text={t('official_account_desc')} />
                  </p>
                </div>
                <Switch
                  id="official-mode"
                  checked={isOfficial}
                  onCheckedChange={setIsOfficial}
                />
              </div>
              <Button><TranslatedText text={t('update_profile')} /></Button>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl"><TranslatedText text={t('my_reported_issues')} /></CardTitle>
              <CardDescription><TranslatedText text={t('my_reported_issues_desc')} /></CardDescription>
            </CardHeader>
            <CardContent>
              {userIssues.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {userIssues.map(issue => (
                    <Link key={issue.id} href={`/issues/${issue.id}`}>
                      <IssueCard issue={issue} />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground"><TranslatedText text={t('no_issues_reported')} /></p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
