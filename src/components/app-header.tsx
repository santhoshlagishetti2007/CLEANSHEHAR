"use client";

import React from "react";
import Link from "next/link";
import { LifeBuoy, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons";
import { LanguageSelector } from "./language-selector";
import { SupportChatDialog } from "./support-chat-dialog";
import { useLanguage } from "@/hooks/use-language";
import { useAuth } from "@/contexts/auth-context";

export function AppHeader() {
  const { t } = useLanguage();
  const { isAuthenticated, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
          <SupportChatDialog>
            <Button variant="ghost" size="sm">
              <LifeBuoy className="mr-2 h-4 w-4" />
              {t("support")}
            </Button>
          </SupportChatDialog>
          <LanguageSelector />
          {isAuthenticated && (
            <Button onClick={signOut} variant="ghost" size="sm">
              <UserCircle className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
