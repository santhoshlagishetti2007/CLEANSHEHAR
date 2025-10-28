
"use client";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useState } from "react";
import type { Issue } from "@/lib/types";
import { useLanguage } from "@/hooks/use-language";
import Link from 'next/link';
import { Button } from "./ui/button";
import { TranslatedText } from "./translated-text";

const statusColors = {
  Reported: {
    background: "hsl(var(--primary))", // Blue
    glyphColor: "hsl(var(--primary-foreground))",
  },
  "In Progress": {
    background: "hsl(var(--accent))", // Yellow
    glyphColor: "hsl(var(--accent-foreground))",
  },
  Resolved: {
    background: "hsl(var(--muted-foreground))", // Gray
    glyphColor: "hsl(var(--muted))",
  },
};


export function MapView({ issues }: { issues: Issue[] }) {
  const { t } = useLanguage();
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);

  const position = { lat: 28.6139, lng: 77.2090 }; // Centered on Delhi for example

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="flex h-[calc(100vh_-_4rem)] items-center justify-center rounded-lg border bg-muted">
        <p className="text-muted-foreground">
          {t('maps_api_key_not_configured')}
        </p>
      </div>
    );
  }

  const selectedIssue = issues.find(issue => issue.id === selectedIssueId);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div className="h-[calc(100vh_-_4rem)] w-full">
        <Map
          defaultCenter={position}
          defaultZoom={12}
          mapId="clear-shahr-map"
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          {issues.map((issue, index) => {
            const issuePosition = { lat: issue.location.mapCoordinates.y, lng: issue.location.mapCoordinates.x };
            const colors = statusColors[issue.status];
            return (
              <AdvancedMarker
                key={issue.id}
                position={issuePosition}
                onClick={() => setSelectedIssueId(issue.id)}
              >
                <Pin
                  background={colors.background}
                  borderColor={colors.background}
                  glyphColor={colors.glyphColor}
                />
              </AdvancedMarker>
            );
          })}

          {selectedIssue && (
             <InfoWindow
                position={{ lat: selectedIssue.location.mapCoordinates.y, lng: selectedIssue.location.mapCoordinates.x }}
                onCloseClick={() => setSelectedIssueId(null)}
                pixelOffset={[0, -30]}
            >
                <div className="p-2 w-48">
                    <h3 className="font-bold font-headline"><TranslatedText text={selectedIssue.title} /></h3>
                    <p className="text-sm text-muted-foreground"><TranslatedText text={selectedIssue.department} /></p>
                    <Link href={`/issues/${selectedIssue.id}`} passHref>
                        <Button variant="link" className="p-0 h-auto mt-2">{t('view_details')}</Button>
                    </Link>
                </div>
             </InfoWindow>
          )}

        </Map>
      </div>
    </APIProvider>
  );
}
