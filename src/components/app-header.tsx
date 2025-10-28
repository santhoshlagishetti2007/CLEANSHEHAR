
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LifeBuoy, LogOut, UserCircle, PenSquare, Map, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons";
import { LanguageSelector } from "./language-selector";
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
import { ReportIssueDialog } from "./report-issue-dialog";
import { Issue } from "@/lib/types";

export function AppHeader() {
  const { t } = useLanguage();
  const { user, isUserLoading, signOut, isAuthenticated, openAuthModal } = useAuth();
  const [isReportDialogOpen, setReportDialogOpen] = useState(false);
  
  const handleIssueReported = (newIssue: Issue) => {
    console.log("New issue reported from header:", newIssue);
  };

  const handleReportClick = () => {
    if (!isAuthenticated) {
      openAuthModal();
    } else {
      setReportDialogOpen(true);
    }
  }


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" size="sm" onClick={handleReportClick}>
                <PenSquare className="mr-2 h-4 w-4" />
                {t('report_new_issue')}
            </Button>
            <Link href="/map" passHref>
                <Button variant="ghost" size="sm">
                    <Map className="mr-2 h-4 w-4" />
                    {t('map_view')}
                </Button>
            </Link>
             <Link href="/community" passHref>
               <Button variant="ghost" size="sm">
                <Users className="mr-2 h-4 w-4" />
                {t('community_forum_title')}
              </Button>
            </Link>
          <Link href="/support" passHref>
            <Button variant="ghost" size="sm">
              <LifeBuoy className="mr-2 h-4 w-4" />
              {t("support")}
            </Button>
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSelector />
          {isUserLoading ? null : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
                    <AvatarFallback>
                      {user.displayName?.charAt(0) || user.email?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName || 'User'}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/profile" passHref>
                  <DropdownMenuItem>
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>{t('profile')}</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t("sign_out")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={openAuthModal} variant="ghost" size="sm">
              <UserCircle className="mr-2 h-4 w-4" />
              {t("sign_in")}
            </Button>
          )}
        </div>
      </div>
       <ReportIssueDialog
        open={isReportDialogOpen}
        onOpenChange={setReportDialogOpen}
        onIssueReported={handleIssueReported}
      />
    </header>
  );
}
