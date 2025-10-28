
'use client';

import { AppHeader } from "@/components/app-header";
import { MapView } from "@/components/map-view";
import { issues } from "@/lib/data";

export default function MapPage() {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <AppHeader />
            <main className="flex-1 bg-background">
                <MapView issues={issues} />
            </main>
        </div>
    )
}
