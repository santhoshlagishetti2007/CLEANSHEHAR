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

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <Card className="h-[600px] w-full overflow-hidden">
        <Map
          defaultCenter={position}
          defaultZoom={12}
          mapId="clear-shahr-map"
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          {issues.map((issue) => {
            // Using mapCoordinates for relative positioning for now, should be replaced with real lat/lng
            const lat = position.lat + (issue.location.mapCoordinates.y - 50) / 100;
            const lng = position.lng + (issue.location.mapCoordinates.x - 50) / 100;
            return (
              <AdvancedMarker
                key={issue.id}
                position={{ lat, lng }}
                onClick={() => setSelectedIssueId(issue.id)}
              >
                <Pin
                  background={"hsl(var(--primary))"}
                  borderColor={"hsl(var(--primary))"}
                  glyphColor={"hsl(var(--primary-foreground))"}
                />
              </AdvancedMarker>
            );
          })}

          {selectedIssue && (
             <InfoWindow
                position={{
                    lat: position.lat + (selectedIssue.location.mapCoordinates.y - 50) / 100,
                    lng: position.lng + (selectedIssue.location.mapCoordinates.x - 50) / 100,
                }}
                onCloseClick={() => setSelectedIssueId(null)}
            >
                <div className="p-2">
                    <h3 className="font-bold font-headline">{selectedIssue.title}</h3>
                    <p className="text-sm text-muted-foreground">{selectedIssue.department}</p>
                </div>
             </InfoWindow>
          )}

        </Map>
      </Card>
    </APIProvider>
  );
}
