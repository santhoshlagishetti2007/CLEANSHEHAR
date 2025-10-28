
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
import { Card } from "./ui/card";
import { useLanguage } from "@/hooks/use-language";
import Link from 'next/link';
import { Button } from "./ui/button";

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
      <div className="flex h-[500px] items-center justify-center rounded-lg border bg-muted">
        <p className="text-muted-foreground">
          Google Maps API Key is not configured.
        </p>
      </div>
    );
  }

  const selectedIssue = issues.find(issue => issue.id === selectedIssueId);

  // Function to calculate a slightly offset position to avoid marker overlap
  const getOffsetPosition = (lat: number, lng: number, index: number) => {
    const offset = 0.0005 * Math.floor(index / 5); // Add a small offset for every 5 markers
    return { lat: lat + offset, lng: lng + offset };
  }

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <Card className="h-[calc(100vh_-_10rem)] w-full overflow-hidden">
        <Map
          defaultCenter={position}
          defaultZoom={12}
          mapId="clear-shahr-map"
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          {issues.map((issue, index) => {
            const issuePosition = getOffsetPosition(
              position.lat + (issue.location.mapCoordinates.y - 50) / 100,
              position.lng + (issue.location.mapCoordinates.x - 50) / 100,
              index
            );
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
                position={getOffsetPosition(
                    position.lat + (selectedIssue.location.mapCoordinates.y - 50) / 100,
                    position.lng + (selectedIssue.location.mapCoordinates.x - 50) / 100,
                    issues.findIndex(i => i.id === selectedIssue.id)
                )}
                onCloseClick={() => setSelectedIssueId(null)}
                pixelOffset={[0, -30]}
            >
                <div className="p-2 w-48">
                    <h3 className="font-bold font-headline">{selectedIssue.title}</h3>
                    <p className="text-sm text-muted-foreground">{selectedIssue.department}</p>
                    <Link href={`/issues/${selectedIssue.id}`} passHref>
                        <Button variant="link" className="p-0 h-auto mt-2">View Details</Button>
                    </Link>
                </div>
             </InfoWindow>
          )}

        </Map>
      </Card>
    </APIProvider>
  );
}
