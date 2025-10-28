
"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { useAuth as useFirebaseAuth, useUser } from "@/firebase";
import type { User } from 'firebase/auth';
import { AuthModal } from "@/components/auth-modal";
import { ReportIssueDialog } from "@/components/report-issue-dialog";
import { Issue } from "@/lib/types";
import { useLanguage } from "@/hooks/use-language";

// Sample user for testing purposes
const sampleUser: User = {
  uid: 'sample-user-id',
  email: 'test.user@example.com',
  displayName: 'Test User',
  photoURL: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop',
  emailVerified: true,
  isAnonymous: false,
  metadata: {},
  providerData: [],
  tenantId: null,
  delete: async () => {},
  getIdToken: async () => '',
  getIdTokenResult: async () => ({} as any),
  reload: async () => {},
  toJSON: () => ({}),
  providerId: "sample",
};


interface AuthContextType {
  user: User | null;
  isUserLoading: boolean;
  isAuthenticated: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  openAuthModal: () => void;
  openReportIssueModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useFirebaseAuth();
  const { user: firebaseUser, isUserLoading: firebaseUserLoading } = useUser();
  const { t } = useLanguage();
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isReportIssueModalOpen, setReportIssueModalOpen] = useState(false);

  // Use the real Firebase user if available, otherwise use the sample user.
  const user = firebaseUser || sampleUser;
  const isUserLoading = firebaseUserLoading;

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      if (!auth) {
        console.error("Auth service is not available.");
        return;
      }
      await signInWithPopup(auth, provider);
      setAuthModalOpen(false);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const signOut = async () => {
    try {
        if (!auth) {
            console.error("Auth service is not available.");
            return;
        }
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };
  
  const openAuthModal = () => setAuthModalOpen(true);
  const isAuthenticated = !isUserLoading && !!user;
  
  const openReportIssueModal = () => {
    if (!isAuthenticated) {
      openAuthModal();
    } else {
      setReportIssueModalOpen(true);
    }
  };

  const handleIssueReported = (newIssue: Issue) => {
    console.log("New issue reported:", newIssue);
  };


  const value = { user, isUserLoading, isAuthenticated, signIn, signOut, openAuthModal, openReportIssueModal };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthModal open={isAuthModalOpen} onOpenChange={setAuthModalOpen} />
      <ReportIssueDialog
        open={isReportIssueModalOpen}
        onOpenChange={setReportIssueModalOpen}
        onIssueReported={handleIssueReported}
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
