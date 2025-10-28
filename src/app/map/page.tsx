
'use client';

import { AppHeader } from "@/components/app-header";
import { MapView } from "@/components/map-view";
import { useAuth } from "@/contexts/auth-context";

export default function MapPage() {
    const { issues } = useAuth();
    return (
        <div className="flex min-h-screen w-full flex-col">
            <AppHeader />
            <main className="flex-1 bg-background">
                <MapView issues={issues} />
            </main>
        </div>
    )
}
