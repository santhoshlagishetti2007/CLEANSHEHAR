'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Map, Pin } from 'lucide-react';
import { AppHeader } from '@/components/app-header';
import { IssueCard } from '@/components/issue-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/hooks/use-language';
import { issues as initialIssues, Issue } from '@/lib/data';
import { ReportIssueDialog } from '@/components/report-issue-dialog';
import placeholderImages from '@/lib/placeholder-images.json';
import Link from 'next/link';

export default function IssuesPage() {
  const { t } = useLanguage();
  const [issues, setIssues] = useState<Issue[]>(initialIssues);
  const [isReportDialogOpen, setReportDialogOpen] = useState(false);

  const handleIssueReported = (newIssue: Issue) => {
    setIssues(prevIssues => [newIssue, ...prevIssues]);
  };

  const mapImage = placeholderImages.placeholderImages.find(p => p.id === "map-background");

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader />
      <main className="flex-1 bg-background px-4 py-8 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold font-headline tracking-tight">
                {t('dashboard_title')}
              </h1>
              <p className="text-muted-foreground">{t('dashboard_subtitle')}</p>
            </div>
            <ReportIssueDialog
              open={isReportDialogOpen}
              onOpenChange={setReportDialogOpen}
              onIssueReported={handleIssueReported}
            >
              <Button onClick={() => setReportDialogOpen(true)} size="lg">
                {t('report_new_issue')}
              </Button>
            </ReportIssueDialog>
          </div>

          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
              <TabsTrigger value="list">
                <Pin className="mr-2 h-4 w-4" />
                {t('list_view')}
              </TabsTrigger>
              <TabsTrigger value="map">
                <Map className="mr-2 h-4 w-4" />
                {t('map_view')}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {issues.map(issue => (
                  <Link key={issue.id} href={`/issues/${issue.id}`} passHref>
                    <IssueCard issue={issue} />
                  </Link>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="map" className="mt-6">
              <Card>
                <CardContent className="p-0">
                  <div className="relative aspect-[16/9] w-full">
                    {mapImage && (
                       <Image
                        src={mapImage.imageUrl}
                        alt="Map of the city"
                        fill
                        className="object-cover rounded-lg"
                        data-ai-hint={mapImage.imageHint}
                      />
                    )}
                    {issues.map(issue => (
                      <div
                        key={`map-${issue.id}`}
                        className="absolute"
                        style={{
                          left: `${issue.location.mapCoordinates.x}%`,
                          top: `${issue.location.mapCoordinates.y}%`,
                        }}
                      >
                        <div className="group">
                          <Pin className="h-8 w-8 text-primary drop-shadow-lg transition-transform group-hover:scale-110" fill="hsl(var(--primary))" />
                          <div className="absolute bottom-full mb-2 hidden w-48 rounded-md bg-popover p-2 text-sm text-popover-foreground shadow-md group-hover:block">
                            <p className="font-bold">{issue.title}</p>
                            <p className="text-xs text-muted-foreground">{issue.department}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
