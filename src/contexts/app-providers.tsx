"use client";

import { AuthProvider } from "./auth-context";
import { LanguageProvider } from "./language-context";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </AuthProvider>
  );
}
