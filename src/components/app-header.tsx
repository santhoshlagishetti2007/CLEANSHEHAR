"use client";

import React from "react";
import Link from "next/link";
import { LayoutDashboard, LifeBuoy, LogOut, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons";
import { LanguageSelector } from "./language-selector";
import { SupportChatDialog } from "./support-chat-dialog";
import { useLanguage } from "@/hooks/use-language";
import { useAuth } from "@/contexts/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function AppHeader() {
  const { t } = useLanguage();
  const { user, isUserLoading, signIn, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>
        <div className="flex items-center gap-2">
           <Link href="/" passHref>
              <Button variant="ghost" size="sm">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                {t('dashboard_title')}
              </Button>
            </Link>
          <SupportChatDialog>
            <Button variant="ghost" size="sm">
              <LifeBuoy className="mr-2 h-4 w-4" />
              {t("support")}
            </Button>
          </SupportChatDialog>
          <LanguageSelector />
          {isUserLoading ? null : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
                    <AvatarFallback>
                      {user.displayName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/profile" passHref>
                  <DropdownMenuItem>
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t("sign_out")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => signIn()} variant="ghost" size="sm">
              <UserCircle className="mr-2 h-4 w-4" />
              {t("sign_in")}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
