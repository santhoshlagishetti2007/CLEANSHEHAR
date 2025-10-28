
"use client";

import { AuthProvider } from "./auth-context";
import { LanguageProvider } from "./language-context";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </LanguageProvider>
  );
}
