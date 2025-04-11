'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { userService } from '@/lib/api';

interface UserProfile {
  firstname: string;
  lastname: string;
  profile_picture: string;
  bio: string;
  country: string;
  gender: string;
  date_of_birth: string;
  phone_number: string;
  daily_goal: number;
}

interface UserContextType {
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
  refreshUserProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getUserProfile();
      setUserProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user profile');
      setUserProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUserProfile();
  }, []);

  return (
    <UserContext.Provider value={{ userProfile, loading, error, refreshUserProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 