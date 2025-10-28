
'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
} from '@vis.gl/react-google-maps';
import { Button } from './ui/button';
import { Loader2, LocateFixed } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';

interface LocationPickerProps {
  onLocationSet: (lat: number, lng: number) => void;
}

function InnerLocationPicker({ onLocationSet }: LocationPickerProps) {
  const map = useMap();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [markerPos, setMarkerPos] = useState({ lat: 28.6139, lng: 77.209 }); // Default to Delhi
  const [isLocating, setIsLocating] = useState(false);

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setMarkerPos(e.latLng.toJSON());
    }
  }, []);
  
  useEffect(() => {
    onLocationSet(markerPos.lat, markerPos.lng);
  }, [markerPos, onLocationSet]);

  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMarkerPos(newPos);
          map?.panTo(newPos);
          map?.setZoom(15);
          setIsLocating(false);
          toast({ title: t('location_updated') });
        },
        (error) => {
          console.error('Geolocation error:', error);
          toast({
            variant: 'destructive',
            title: t('location_error_title'),
            description: t('location_error_desc'),
          });
          setIsLocating(false);
        }
      );
    } else {
      toast({
        variant: 'destructive',
        title: t('location_unsupported_title'),
        description: t('location_unsupported_desc'),
      });
      setIsLocating(false);
    }
  };

  return (
    <div className="space-y-4">
        <div className="h-80 w-full rounded-lg overflow-hidden border">
            <Map
              defaultCenter={markerPos}
              defaultZoom={12}
              mapId="issue-location-picker"
              gestureHandling={'greedy'}
              disableDefaultUI={true}
              onClick={handleMapClick}
            >
              <AdvancedMarker
                position={markerPos}
                draggable={true}
                onDragEnd={(e) => {
                  if (e.latLng) setMarkerPos(e.latLng.toJSON());
                }}
              />
            </Map>
        </div>
        <Button type="button" onClick={handleUseCurrentLocation} disabled={isLocating}>
            {isLocating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LocateFixed className="mr-2 h-4 w-4" />}
            {t('use_my_current_location')}
        </Button>
        <p className="text-sm text-muted-foreground">{t('location_picker_desc')}</p>
    </div>
  );
}


export function LocationPicker({ onLocationSet }: LocationPickerProps) {
    const { t } = useLanguage();
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
        return (
          <div className="flex h-[400px] items-center justify-center rounded-lg border bg-muted">
            <p className="text-center text-muted-foreground">
              {t('maps_api_key_not_configured')} <br /> {t('location')} pinning is disabled.
            </p>
          </div>
        );
      }

    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <InnerLocationPicker onLocationSet={onLocationSet} />
        </APIProvider>
    )
}
