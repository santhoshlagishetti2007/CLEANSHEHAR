"use client";

import React, { createContext, useContext, ReactNode } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { useAuth as useFirebaseAuth, useUser } from "@/firebase";
import type { User } from 'firebase/auth';
import { AuthModal } from "@/components/auth-modal";

interface AuthContextType {
  user: User | null;
  isUserLoading: boolean;
  isAuthenticated: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useFirebaseAuth();
  const { user, isUserLoading } = useUser();

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      if (!auth) {
        console.error("Auth service is not available.");
        return;
      }
      await signInWithPopup(auth, provider);
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

  const isAuthenticated = !isUserLoading && !!user;

  return (
    <AuthContext.Provider value={{ user, isUserLoading, isAuthenticated, signIn, signOut }}>
      {children}
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
