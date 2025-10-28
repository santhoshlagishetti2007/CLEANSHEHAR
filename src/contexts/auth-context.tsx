
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
import { LanguageProvider } from "./language-context";

// Sample user for testing purposes
const sampleUser: User = {
  uid: 'sample-user-id',
  email: 'test.user@example.com',
  displayName: 'Test User',
  photoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjE1NjA4MTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useFirebaseAuth();
  const { user: firebaseUser, isUserLoading: firebaseUserLoading } = useUser();
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

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

  return (
    <AuthContext.Provider value={{ user, isUserLoading, isAuthenticated, signIn, signOut, openAuthModal }}>
      {children}
      <LanguageProvider>
        <AuthModal open={isAuthModalOpen} onOpenChange={setAuthModalOpen} />
      </LanguageProvider>
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
